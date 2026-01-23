import { NextRequest, NextResponse } from 'next/server'
import admin from 'firebase-admin'
import { getFirebaseAdminApp, getAdminDb } from '@/lib/firebase-admin'
import { BlogInputSchema } from '@/lib/admin-schemas'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-server-auth'

export const runtime = 'nodejs'

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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const adminSession = await requireAdmin(request)
  if (!adminSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await params

  try {
    getFirebaseAdminApp()
    const db = getAdminDb()
    const docSnap = await db.collection('blogs').doc(slug).get()

    if (!docSnap.exists) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    const post: any = docSnap.data()

    return NextResponse.json({
      ...post,
      slug,
      status: post.published ? 'published' : 'draft',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const adminSession = await requireAdmin(request)
  if (!adminSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await params

  try {
    const raw = await request.json()
    // Force slug to be preserved (server truth = params slug)
    const parsed = BlogInputSchema.parse({ ...raw, slug })

    getFirebaseAdminApp()
    const db = getAdminDb()
    const docRef = db.collection('blogs').doc(slug)

    const exists = await docRef.get()
    if (!exists.exists) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })

    const titleLower = parsed.title.toLowerCase()
    const tagsLower = parsed.tags.map((t) => t.toLowerCase())

    await docRef.set(
      {
        ...parsed,
        id: slug,
        seoTitle: parsed.seoTitle || parsed.title,
        seoDescription: parsed.seoDescription || parsed.excerpt,
        coverImage: parsed.coverImage || '',
        titleLower,
        tagsLower,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    )

    return NextResponse.json({ success: true, slug })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update blog' }, { status: 400 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const adminSession = await requireAdmin(request)
  if (!adminSession) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug } = await params

  try {
    getFirebaseAdminApp()
    const db = getAdminDb()
    await db.collection('blogs').doc(slug).delete()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
