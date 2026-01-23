import { Suspense } from 'react'
import Link from 'next/link'
import { requireAdminOrRedirect } from '@/lib/admin-server-auth'
import { getFirebaseAdminApp, getAdminDb } from '@/lib/firebase-admin'
import LoadingFallback from '@/components/LoadingFallback'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getStats() {
  getFirebaseAdminApp()
  const db = getAdminDb()

  const totalSnap = await db.collection('blogs').count().get()
  const publishedSnap = await db.collection('blogs').where('published', '==', true).count().get()
  const draftSnap = await db.collection('blogs').where('published', '==', false).count().get()

  const last = await db.collection('blogs').orderBy('updatedAt', 'desc').limit(1).get()
  const lastUpdated = last.docs[0]?.data()?.updatedAt
  const lastUpdatedIso = lastUpdated?.toDate ? lastUpdated.toDate().toISOString() : null

  return {
    total: totalSnap.data().count,
    published: publishedSnap.data().count,
    drafts: draftSnap.data().count,
    lastUpdatedIso,
  }
}

async function DashboardStats() {
  const stats = await getStats()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">Total Blogs</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">Published</h3>
          <p className="text-3xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">Drafts</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.drafts}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-300">Last Updated</h3>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {stats.lastUpdatedIso ? new Date(stats.lastUpdatedIso).toLocaleString() : '—'}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/blogs/new" className="btn-primary">
            Create New Blog
          </Link>
          <Link href="/admin/blogs" className="btn-secondary">
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  )
}

export default async function AdminDashboardPage() {
  await requireAdminOrRedirect()
  return (
    <Suspense fallback={<LoadingFallback message="Loading dashboard statistics from database..." />}>
      <DashboardStats />
    </Suspense>
  )
}

