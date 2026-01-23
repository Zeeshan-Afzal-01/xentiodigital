import { NextResponse } from 'next/server'
import { getAdminDb, hasFirebaseAdminEnv } from '@/lib/firebase-admin'

/**
 * Debug route to check why blogs might not show.
 * GET /api/debug-blog
 * Returns: { hasFirebaseAdminEnv, firestoreReachable?, sampleCount?, error? }
 * Delete this route after debugging if you don't want it in production.
 */
export async function GET() {
  const hasEnv = hasFirebaseAdminEnv()
  if (!hasEnv) {
    return NextResponse.json({
      hasFirebaseAdminEnv: false,
      message:
        'Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in Vercel → Settings → Environment Variables, then redeploy.',
    })
  }

  try {
    const db = getAdminDb()
    const snap = await db.collection('blogs').limit(3).get()
    const docs = snap.docs.map((d) => {
      const v = d.data() as any
      return {
        slug: d.id,
        locale: v?.locale ?? '(missing)',
        published: v?.published ?? '(missing)',
        hasUpdatedAt: !!v?.updatedAt,
      }
    })
    return NextResponse.json({
      hasFirebaseAdminEnv: true,
      firestoreReachable: true,
      totalInSample: snap.size,
      sample: docs,
      hint: 'For blogs to show on /blog: each doc needs locale (e.g. "en"), published: true, and updatedAt. Visit /en/blog (or /{locale}/blog) so locale matches.',
    })
  } catch (e) {
    const err = e as Error
    return NextResponse.json({
      hasFirebaseAdminEnv: true,
      firestoreReachable: false,
      error: err?.message || 'Firestore error',
      hint: 'Check FIREBASE_PRIVATE_KEY: use \\n for newlines, and that the service account has Firestore read permission.',
    })
  }
}
