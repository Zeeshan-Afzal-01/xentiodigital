import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

/**
 * Client Firebase (modular SDK).
 * - Safe to import in Client Components (admin panel)
 * - Uses NEXT_PUBLIC_* env vars (not secrets)
 * - Never initializes more than once
 */

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let _app: FirebaseApp | null = null
let _db: Firestore | null = null

export function getFirebaseApp(): FirebaseApp {
  if (_app) return _app
  if (getApps().length) {
    _app = getApp()
    return _app
  }

  // Minimal runtime validation (avoids silent misconfig)
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
    throw new Error(
      'Missing Firebase client env vars. Set NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID, NEXT_PUBLIC_FIREBASE_APP_ID (and others as needed).'
    )
  }

  _app = initializeApp(firebaseConfig)
  return _app
}

export function getFirestoreDb(): Firestore {
  if (_db) return _db
  _db = getFirestore(getFirebaseApp())
  return _db
}

