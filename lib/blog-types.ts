export interface BlogAuthor {
  name: string
  avatar?: string
  bio: string
  role: string
  expertise: string[]
  credentials?: string[]
  social?: {
    linkedin?: string
    twitter?: string
    website?: string
  }
  yearsExperience?: number
}

/**
 * Firestore document model for `blogs/{slug}`.
 * `createdAt/updatedAt` are stored as Firestore timestamps, but we expose them
 * to the app as ISO strings to keep client components simple.
 */
export interface Blog {
  id: string // same as slug (doc id)
  title: string
  slug: string
  excerpt: string
  content: string // markdown string
  coverImage?: string
  author: BlogAuthor
  tags: string[]
  category: string
  seoTitle?: string
  seoDescription?: string
  relatedServices?: string[]
  published: boolean
  createdAt: string // ISO
  updatedAt: string // ISO
  locale: string
}

export type BlogCreateInput = Omit<Blog, 'createdAt' | 'updatedAt'> & {
  createdAt?: string
  updatedAt?: string
}

export type BlogUpdateInput = Partial<Omit<Blog, 'id' | 'slug' | 'createdAt'>> & {
  updatedAt?: string
}

