'use client'

import { getAuth, setPersistence, browserLocalPersistence, signInWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth'
import { getFirebaseApp } from '@/lib/firebase'

export type AdminUser = {
  uid: string
  email: string | null
}

const auth = getAuth(getFirebaseApp())
let _persistenceReady = false

async function ensurePersistence() {
  if (_persistenceReady) return
  await setPersistence(auth, browserLocalPersistence)
  _persistenceReady = true
}

export async function signIn(email: string, password: string): Promise<AdminUser> {
  await ensurePersistence()
  
  let cred
  try {
    cred = await signInWithEmailAndPassword(auth, email, password)
  } catch (err: any) {
    // Firebase Auth errors
    const code = err?.code || ''
    if (code === 'auth/user-not-found' || code === 'auth/wrong-password') {
      throw new Error('Invalid email or password')
    }
    if (code === 'auth/invalid-email') {
      throw new Error('Invalid email format')
    }
    if (code === 'auth/too-many-requests') {
      throw new Error('Too many failed attempts. Please try again later.')
    }
    throw new Error(err?.message || 'Login failed. Check your email and password.')
  }

  const idToken = await cred.user.getIdToken()

  // Create a server session cookie (used for SSR/admin route protection + API)
  const res = await fetch('/api/admin/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })

  if (!res.ok) {
    // Not an admin / invalid token / server misconfig — ensure client signs out too
    await fbSignOut(auth).catch(() => {})
    const msg = (await res.json().catch(() => null)) as any
    const errorMsg = msg?.error || 'Admin login failed'
    if (errorMsg.includes('Not authorized') || errorMsg.includes('admin only')) {
      throw new Error('This account is not authorized as an admin. Contact your administrator.')
    }
    throw new Error(errorMsg)
  }

  return { uid: cred.user.uid, email: cred.user.email }
}

export async function signOut(): Promise<void> {
  await fetch('/api/admin/session', { method: 'DELETE' }).catch(() => {})
  await fbSignOut(auth).catch(() => {})
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const res = await fetch('/api/admin/session', { method: 'GET', cache: 'no-store' })
  if (!res.ok) return null
  return (await res.json()) as AdminUser
}

