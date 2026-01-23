import { Metadata } from 'next'
import { Suspense } from 'react'
import { generateSEOMetadata } from '@/lib/seo'
import BlogListContent from './BlogListContent'
import { getAllBlogs } from '@/lib/blog-service'
import { hasFirebaseAdminEnv } from '@/lib/firebase-admin'
import LoadingFallback from '@/components/LoadingFallback'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Blog - Insights & Resources | Xentio Digital',
  description: 'Discover industry insights, guides, and updates on digital marketing, SEO, web development, e-commerce, and business growth.',
  path: '/blog',
})

export const revalidate = 60
export const dynamic = 'force-dynamic'

async function BlogContent({ locale }: { locale: string }) {
  const hasEnv = hasFirebaseAdminEnv()
  if (!hasEnv) {
    console.warn(
      '[Blog] Firebase Admin env missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY on Vercel → Settings → Environment Variables, then redeploy. See /api/debug-blog'
    )
  }
  const blogs = hasEnv ? await getAllBlogs(locale) : []
  const published = blogs.filter((b) => b.published)
  if (hasEnv && blogs.length === 0) {
    console.warn(
      '[Blog] getAllBlogs returned 0 for locale:',
      locale,
      '— check: blog docs have locale, published: true, updatedAt. See /api/debug-blog'
    )
  }
  return <BlogListContent posts={published} />
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return (
    <Suspense fallback={<LoadingFallback message="Loading blog posts from database..." />}>
      <BlogContent locale={locale} />
    </Suspense>
  )
}
