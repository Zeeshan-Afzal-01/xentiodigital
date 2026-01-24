import { NextRequest, NextResponse } from 'next/server'
import admin from 'firebase-admin'
import { z } from 'zod'
import { getFirebaseAdminApp, getAdminDb } from '@/lib/firebase-admin'
import { BlogInputSchema } from '@/lib/admin-schemas'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-server-auth'

export const runtime = 'nodejs'

const ListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  cursor: z.string().optional(),
  q: z.string().optional(),
  status: z.enum(['all', 'published', 'draft']).default('all'),
})

async function requireAdmin(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  if (!cookie) return null

  getFirebaseAdminApp()

  try {
    const decoded = await admin.auth().verifySessionCookie(cookie, true)
    const db = getAdminDb()
    const isAdmin = (await db.collection('admins').doc(decoded.uid).get()).exists
    if (!isAdmin) return null
    return { uid: decoded.uid, email: decoded.email || null }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  const adminSession = await requireAdmin(request)
  if (!adminSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const raw = await request.json()
    const parsed = BlogInputSchema.parse(raw)

    getFirebaseAdminApp()
    const db = getAdminDb()

    const docRef = db.collection('blogs').doc(parsed.slug)
    const exists = await docRef.get()
    if (exists.exists) return NextResponse.json({ error: 'Slug already exists' }, { status: 409 })

    const titleLower = parsed.title.toLowerCase()
    const tagsLower = parsed.tags.map((t) => t.toLowerCase())

    await docRef.set(
      {
        ...parsed,
        id: parsed.slug,
        seoTitle: parsed.seoTitle || parsed.title,
        seoDescription: parsed.seoDescription || parsed.excerpt,
        coverImage: parsed.coverImage || '',
        titleLower,
        tagsLower,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: false }
    )

    return NextResponse.json({ success: true, slug: parsed.slug }, { status: 201 })
  } catch (error: any) {
    const msg = error?.message || 'Failed to create blog'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  const adminSession = await requireAdmin(request)
  if (!adminSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const url = new URL(request.url)
    const query = ListQuerySchema.parse({
      limit: url.searchParams.get('limit') ?? undefined,
      cursor: url.searchParams.get('cursor') ?? undefined,
      q: url.searchParams.get('q') ?? undefined,
      status: url.searchParams.get('status') ?? undefined,
    })

    getFirebaseAdminApp()
    const db = getAdminDb()

    // No orderBy to avoid any composite index; fetch, sort in memory, then filter.
    const snap = await db.collection('blogs').limit(300).get()

    let items = snap.docs.map((d) => {
      const v: any = d.data()
      const updatedAt = v?.updatedAt?.toDate ? v.updatedAt.toDate().toISOString() : null
      return {
        slug: d.id,
        title: v?.title || '',
        category: v?.category || '',
        locale: v?.locale || 'en',
        updatedAt,
        status: v?.published ? 'published' : 'draft',
        tags: Array.isArray(v?.tags) ? v.tags : [],
      }
    })

    items.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''))

    if (query.status === 'published') items = items.filter((i) => i.status === 'published')
    if (query.status === 'draft') items = items.filter((i) => i.status === 'draft')

    if (query.q && query.q.trim().length > 0) {
      const qLower = query.q.trim().toLowerCase()
      items = items.filter((i) => {
        const inTitle = i.title.toLowerCase().includes(qLower)
        const inTags = (i.tags || []).some((t: string) => String(t).toLowerCase().includes(qLower))
        return inTitle || inTags
      })
    }

    // In-memory pagination: cursor = offset
    const offset = query.cursor ? parseInt(query.cursor, 10) || 0 : 0
    const page = items.slice(offset, offset + query.limit)
    const hasMore = offset + query.limit < items.length
    const nextCursor = hasMore ? String(offset + query.limit) : null

    return NextResponse.json({
      items: page.map(({ tags, ...r }) => r),
      nextCursor,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to fetch blogs' }, { status: 500 })
  }
}
