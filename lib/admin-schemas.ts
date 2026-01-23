import { z } from 'zod'

export const BlogStatusSchema = z.enum(['draft', 'published'])

export const BlogInputSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().min(10),
  content: z.string().min(1),
  coverImage: z.string().optional().default(''),
  category: z.string().min(2),
  tags: z.array(z.string()).default([]),
  seoTitle: z.string().optional().default(''),
  seoDescription: z.string().optional().default(''),
  locale: z.string().min(2).default('en'),
  published: z.boolean().default(false),
  author: z.object({
    name: z.string().min(2),
    bio: z.string().min(1),
    role: z.string().min(2),
    expertise: z.array(z.string()).default([]),
  }),
})

export type BlogInput = z.infer<typeof BlogInputSchema>

