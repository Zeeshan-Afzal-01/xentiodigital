'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import ConfirmModal from '@/components/admin/ConfirmModal'
import { useLoading } from '@/components/providers/LoadingProvider'

type BlogListItem = {
  slug: string
  title: string
  category: string
  locale: string
  updatedAt: string | null
  status: 'published' | 'draft'
}

export default function AdminBlogsPage() {
  const { setLoading: setGlobalLoading } = useLoading()
  const [items, setItems] = useState<BlogListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)

  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all')

  const [deleteSlug, setDeleteSlug] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [publishingSlug, setPublishingSlug] = useState<string | null>(null)

  const queryKey = useMemo(() => `${status}::${q.trim().toLowerCase()}`, [status, q])

  async function fetchFirstPage() {
    setLoading(true)
    setGlobalLoading(true, 'Loading blogs from database...')
    try {
      const params = new URLSearchParams()
      params.set('limit', '20')
      params.set('status', status)
      if (q.trim()) params.set('q', q.trim())
      const res = await fetch(`/api/admin/blogs?${params.toString()}`)
      const data = (await res.json().catch(() => ({}))) as { items?: BlogListItem[]; nextCursor?: string | null; error?: string }
      if (!res.ok) {
        const msg = res.status === 401 ? 'Please log in again.' : (data?.error || 'Failed to load blogs')
        throw new Error(msg)
      }
      setItems(data.items ?? [])
      setNextCursor(data.nextCursor ?? null)
    } catch (e: any) {
      toast.error(e?.message || 'Failed to load blogs')
    } finally {
      setLoading(false)
      setGlobalLoading(false)
    }
  }

  async function fetchNextPage() {
    if (!nextCursor) return
    setLoadingMore(true)
    try {
      const params = new URLSearchParams()
      params.set('limit', '20')
      params.set('status', status)
      params.set('cursor', nextCursor)
      const res = await fetch(`/api/admin/blogs?${params.toString()}`)
      const data = (await res.json().catch(() => ({}))) as { items?: BlogListItem[]; nextCursor?: string | null; error?: string }
      if (!res.ok) throw new Error(data?.error || 'Failed to load more')
      setItems((prev) => [...prev, ...(data.items ?? [])])
      setNextCursor(data.nextCursor ?? null)
    } catch (e: any) {
      toast.error(e?.message || 'Failed to load more')
    } finally {
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    const t = setTimeout(() => {
      fetchFirstPage()
    }, 250)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey])

  async function handlePublish(slug: string) {
    setPublishingSlug(slug)
    setGlobalLoading(true, 'Publishing blog...')
    try {
      const res = await fetch(`/api/admin/blogs/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: true }),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null)) as any
        throw new Error(msg?.error || 'Failed to publish')
      }
      toast.success('Blog published')
      setItems((prev) => prev.map((b) => (b.slug === slug ? { ...b, status: 'published' as const } : b)))
    } catch (e: any) {
      toast.error(e?.message || 'Failed to publish blog')
    } finally {
      setPublishingSlug(null)
      setGlobalLoading(false)
    }
  }

  async function handleDelete(slug: string) {
    setDeleting(true)
    setGlobalLoading(true, 'Deleting blog from database...')
    try {
      const res = await fetch(`/api/admin/blogs/${slug}`, { method: 'DELETE' })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null)) as any
        throw new Error(msg?.error || 'Failed to delete')
      }
      toast.success('Blog deleted')
      setItems((prev) => prev.filter((b) => b.slug !== slug))
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete blog')
    } finally {
      setDeleting(false)
      setDeleteSlug(null)
      setGlobalLoading(false)
    }
  }

  if (loading) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
        <Link href="/admin/blogs/new" className="btn-primary">
          Add New Blog
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 flex flex-col md:flex-row gap-3 md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or tag…"
          className="w-full md:flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="w-full md:w-48 px-4 py-2 border rounded-lg dark:bg-gray-700"
        >
          <option value="all">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Locale
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Updated
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {items.map((blog) => (
              <tr key={blog.slug}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                    {blog.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{blog.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {blog.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {blog.locale}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      blog.status === 'published'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}
                  >
                    {blog.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {blog.updatedAt ? new Date(blog.updatedAt).toLocaleDateString() : '—'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {blog.status === 'draft' && (
                    <button
                      onClick={() => handlePublish(blog.slug)}
                      disabled={publishingSlug === blog.slug}
                      className="text-green-600 hover:text-green-900 mr-4 disabled:opacity-60"
                    >
                      {publishingSlug === blog.slug ? 'Publishing…' : 'Publish'}
                    </button>
                  )}
                  <Link
                    href={`/admin/blogs/edit/${blog.slug}`}
                    className="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteSlug(blog.slug)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">No blogs found</div>
        ) : null}
      </div>

      <div className="flex justify-center">
        {nextCursor ? (
          <button
            onClick={fetchNextPage}
            disabled={loadingMore}
            className="btn-secondary disabled:opacity-60"
          >
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        ) : null}
      </div>

      <ConfirmModal
        open={Boolean(deleteSlug)}
        title="Delete blog?"
        description="This will permanently remove the blog post from Firestore."
        confirmText="Delete"
        confirmVariant="danger"
        loading={deleting}
        onCancel={() => setDeleteSlug(null)}
        onConfirm={() => {
          if (deleteSlug) void handleDelete(deleteSlug)
        }}
      />
    </div>
  )
}

