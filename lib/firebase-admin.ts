import 'server-only'
import admin from 'firebase-admin'

/**
 * Server Firebase Admin (Firestore).
 * - Used by Server Components and Route Handlers
 * - Keeps Firebase SDK out of the public/client bundle
 * - Never initializes more than once
 *
 * Required env vars (server-only):
 * - FIREBASE_PROJECT_ID
 * - FIREBASE_CLIENT_EMAIL
 * - FIREBASE_PRIVATE_KEY  (use `\n` escaped newlines in env)
 */

let _app: admin.app.App | null = null
let _db: FirebaseFirestore.Firestore | null = null

function initAdmin(): admin.app.App {
  if (admin.apps.length) return admin.app()

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin env vars. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY.'
    )
  }

  return admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  })
}

export function getFirebaseAdminApp(): admin.app.App {
  if (_app) return _app
  _app = initAdmin()
  return _app
}

export function getAdminDb(): FirebaseFirestore.Firestore {
  if (_db) return _db
  getFirebaseAdminApp()
  _db = admin.firestore()
  return _db
}

export function hasFirebaseAdminEnv(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  )
}

