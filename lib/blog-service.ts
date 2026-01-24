import 'server-only'
import { unstable_cache } from 'next/cache'
import { getAdminDb } from '@/lib/firebase-admin'
import type { Blog, BlogAuthor, BlogCreateInput, BlogUpdateInput } from '@/lib/blog-types'

const BLOGS_COLLECTION = 'blogs' as const

function toIsoDate(value: any): string {
  // Firestore Admin returns Timestamp-like objects with `.toDate()`
  if (!value) return new Date().toISOString()
  if (typeof value === 'string') return new Date(value).toISOString()
  if (value?.toDate) return value.toDate().toISOString()
  if (value instanceof Date) return value.toISOString()
  return new Date().toISOString()
}

function normalizeAuthor(author: any): BlogAuthor {
  return {
    name: author?.name || 'Xentio Digital Team',
    avatar: author?.avatar,
    bio: author?.bio || 'Xentio Digital editorial team.',
    role: author?.role || 'Digital Services Experts',
    expertise: Array.isArray(author?.expertise) ? author.expertise : [],
    credentials: Array.isArray(author?.credentials) ? author.credentials : undefined,
    social: author?.social,
    yearsExperience: typeof author?.yearsExperience === 'number' ? author.yearsExperience : undefined,
  }
}

function normalizeBlog(docId: string, data: any): Blog {
  return {
    id: docId,
    title: data?.title || '',
    slug: data?.slug || docId,
    excerpt: data?.excerpt || '',
    content: data?.content || '',
    coverImage: data?.coverImage || undefined,
    author: normalizeAuthor(data?.author),
    tags: Array.isArray(data?.tags) ? data.tags : [],
    category: data?.category || '',
    seoTitle: data?.seoTitle || undefined,
    seoDescription: data?.seoDescription || undefined,
    relatedServices: Array.isArray(data?.relatedServices) ? data.relatedServices : undefined,
    published: Boolean(data?.published),
    createdAt: toIsoDate(data?.createdAt),
    updatedAt: toIsoDate(data?.updatedAt),
    locale: data?.locale || 'en',
  }
}

async function _getAllBlogs(locale: string): Promise<Blog[]> {
  const db = getAdminDb()
  const snap = await db
    .collection(BLOGS_COLLECTION)
    .where('locale', '==', locale)
    .orderBy('updatedAt', 'desc')
    .get()

  return snap.docs.map((d) => normalizeBlog(d.id, d.data()))
}

async function _getBlogBySlug(slug: string, locale: string): Promise<Blog | null> {
  const db = getAdminDb()
  const docRef = db.collection(BLOGS_COLLECTION).doc(slug)
  const docSnap = await docRef.get()
  if (!docSnap.exists) return null
  const blog = normalizeBlog(docSnap.id, docSnap.data())
  if (blog.locale !== locale) return null
  return blog
}

/**
 * Server-side cached reads for public pages.
 * These do NOT put Firebase SDK in the client bundle.
 */
export const getAllBlogs = (locale: string) =>
  unstable_cache(() => _getAllBlogs(locale), ['blogs', 'all', locale], {
    revalidate: process.env.NODE_ENV === 'development' ? 1 : 60,
  })()

export const getBlogBySlug = (slug: string, locale: string) =>
  unstable_cache(() => _getBlogBySlug(slug, locale), ['blogs', 'bySlug', locale, slug], { revalidate: 60 })()

/**
 * Mutations (usable from Route Handlers if you want server-side writes).
 * Admin UI in this project writes via client SDK, but these are provided for completeness.
 */
export async function createBlog(data: BlogCreateInput): Promise<void> {
  const now = new Date().toISOString()
  const slug = data.slug
  const db = getAdminDb()
  await db.collection(BLOGS_COLLECTION).doc(slug).set(
    {
      ...data,
      id: slug,
      slug,
      createdAt: data.createdAt ? new Date(data.createdAt) : new Date(now),
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(now),
    },
    { merge: false }
  )
}

export async function updateBlog(slug: string, data: BlogUpdateInput): Promise<void> {
  const db = getAdminDb()
  await db.collection(BLOGS_COLLECTION).doc(slug).set(
    {
      ...data,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
    },
    { merge: true }
  )
}

export async function deleteBlog(slug: string): Promise<void> {
  const db = getAdminDb()
  await db.collection(BLOGS_COLLECTION).doc(slug).delete()
}

