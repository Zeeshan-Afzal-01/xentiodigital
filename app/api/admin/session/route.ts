import { NextRequest, NextResponse } from 'next/server'
import admin from 'firebase-admin'
import { z } from 'zod'
import { getFirebaseAdminApp, getAdminDb } from '@/lib/firebase-admin'
import { ADMIN_SESSION_COOKIE } from '@/lib/admin-server-auth'

export const runtime = 'nodejs'

const PostSchema = z.object({
  idToken: z.string().min(1),
})

const SESSION_EXPIRES_IN_MS = 1000 * 60 * 60 * 24 * 5 // 5 days

async function isAdminUid(uid: string): Promise<boolean> {
  const db = getAdminDb()
  const snap = await db.collection('admins').doc(uid).get()
  return snap.exists
}

export async function POST(request: NextRequest) {
  try {
    const body = PostSchema.parse(await request.json())
    getFirebaseAdminApp()

    const decoded = await admin.auth().verifyIdToken(body.idToken)
    const ok = await isAdminUid(decoded.uid)
    if (!ok) {
      return NextResponse.json({ error: 'Not authorized (admin only)' }, { status: 403 })
    }

    const sessionCookie = await admin.auth().createSessionCookie(body.idToken, {
      expiresIn: SESSION_EXPIRES_IN_MS,
    })

    const res = NextResponse.json({ success: true })
    res.cookies.set(ADMIN_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: Math.floor(SESSION_EXPIRES_IN_MS / 1000),
    })
    return res
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Invalid request' }, { status: 400 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
    if (!sessionCookie) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    getFirebaseAdminApp()
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)

    const ok = await isAdminUid(decoded.uid)
    if (!ok) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    return NextResponse.json({
      uid: decoded.uid,
      email: decoded.email || null,
    })
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}

