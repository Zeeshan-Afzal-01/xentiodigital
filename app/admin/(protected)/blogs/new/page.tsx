'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import dynamic from 'next/dynamic'
import { BlogInputSchema } from '@/lib/admin-schemas'
import { useLoading } from '@/components/providers/LoadingProvider'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function NewBlogPage() {
  const router = useRouter()
  const { setLoading: setGlobalLoading } = useLoading()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'SEO',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    locale: 'en',
    status: 'draft' as 'draft' | 'published',
    authorName: 'Xentio Digital Team',
    authorRole: 'Digital Services Experts',
    authorBio: 'Xentio Digital editorial team.',
    authorExpertise: 'SEO, Web Development, Digital Marketing',
  })

  const payload = useMemo(() => {
    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    const expertise = form.authorExpertise
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)
    return {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage || '',
      category: form.category,
      tags,
      seoTitle: form.seoTitle || form.title,
      seoDescription: form.seoDescription || form.excerpt,
      locale: form.locale,
      published: form.status === 'published',
      author: {
        name: form.authorName,
        role: form.authorRole,
        bio: form.authorBio,
        expertise,
      },
    }
  }, [form])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setGlobalLoading(true, 'Saving blog to database...')
    try {
      const parsed = BlogInputSchema.parse(payload)
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      })
      if (!res.ok) {
        const msg = (await res.json().catch(() => null)) as any
        throw new Error(msg?.error || 'Failed to create blog')
      }
      toast.success('Blog created')
      router.push('/admin/blogs')
    } catch (err: any) {
      toast.error(err?.message || 'Failed to create blog')
    } finally {
      setLoading(false)
      setGlobalLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  title: e.target.value,
                  slug: slugify(e.target.value),
                  seoTitle: e.target.value,
                }))
              }
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: slugify(e.target.value) }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">SEO Title</label>
            <input
              value={form.seoTitle}
              onChange={(e) => setForm((p) => ({ ...p, seoTitle: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">SEO Description</label>
            <input
              value={form.seoDescription}
              onChange={(e) => setForm((p) => ({ ...p, seoDescription: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            rows={3}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Locale</label>
            <select
              value={form.locale}
              onChange={(e) => setForm((p) => ({ ...p, locale: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="en">en</option>
              <option value="fr">fr</option>
              <option value="de">de</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            >
              <option>SEO</option>
              <option>Digital Marketing</option>
              <option>Web Development</option>
              <option>E-commerce</option>
              <option>Business Growth</option>
              <option>AI & Automation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as any }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image URL</label>
            <input
              value={form.coverImage}
              onChange={(e) => setForm((p) => ({ ...p, coverImage: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              placeholder="/images/blog/your-image.jpg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input
            value={form.tags}
            onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            placeholder="SEO, Digital Marketing, Strategy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
          <div data-color-mode="dark">
            <MDEditor value={form.content} onChange={(v) => setForm((p) => ({ ...p, content: v || '' }))} height={520} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Author Name</label>
            <input
              value={form.authorName}
              onChange={(e) => setForm((p) => ({ ...p, authorName: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author Role</label>
            <input
              value={form.authorRole}
              onChange={(e) => setForm((p) => ({ ...p, authorRole: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Author Bio</label>
            <textarea
              value={form.authorBio}
              onChange={(e) => setForm((p) => ({ ...p, authorBio: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              rows={2}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Author Expertise (comma-separated)</label>
            <input
              value={form.authorExpertise}
              onChange={(e) => setForm((p) => ({ ...p, authorExpertise: e.target.value }))}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? 'Saving…' : 'Save Blog'}
          </button>
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

