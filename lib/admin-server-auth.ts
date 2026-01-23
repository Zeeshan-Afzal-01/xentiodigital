import 'server-only'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import admin from 'firebase-admin'
import { getFirebaseAdminApp, getAdminDb } from '@/lib/firebase-admin'

export const ADMIN_SESSION_COOKIE = 'admin_session' as const

export type AdminSession = {
  uid: string
  email: string | null
}

async function isAdminUid(uid: string): Promise<boolean> {
  const db = getAdminDb()
  const snap = await db.collection('admins').doc(uid).get()
  return snap.exists
}

export async function getAdminFromCookies(): Promise<AdminSession | null> {
  const sessionCookie = cookies().get(ADMIN_SESSION_COOKIE)?.value
  if (!sessionCookie) return null

  // Ensure Admin SDK is initialized
  getFirebaseAdminApp()

  try {
    const decoded = await admin.auth().verifySessionCookie(sessionCookie, true)
    const ok = await isAdminUid(decoded.uid)
    if (!ok) return null
    return { uid: decoded.uid, email: decoded.email || null }
  } catch {
    return null
  }
}

export async function requireAdminOrRedirect(): Promise<AdminSession> {
  const adminSession = await getAdminFromCookies()
  if (!adminSession) redirect('/admin/login')
  return adminSession
}

