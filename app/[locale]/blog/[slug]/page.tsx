import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'
import { getAllBlogs, getBlogBySlug } from '@/lib/blog-service'
import BlogPostPageContent from './BlogPostPageContent'
import { hasFirebaseAdminEnv } from '@/lib/firebase-admin'
import LoadingFallback from '@/components/LoadingFallback'

interface PageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasFirebaseAdminEnv()) {
    return {
      title: 'Post Not Found | Xentio Digital',
    }
  }

  const post = await getBlogBySlug(slug, locale)

  if (!post || !post.published) {
    return {
      title: 'Post Not Found | Xentio Digital',
    }
  }

  const metadata = generateSEOMetadata({
    title: post.seoTitle ? `${post.seoTitle} | Xentio Digital Blog` : `${post.title} | Xentio Digital Blog`,
    description: post.seoDescription || post.excerpt,
    path: `/${locale}/blog/${slug}`,
    image: post.coverImage || '/og-image.jpg',
  })

  // Add Article structured data
  const articleData = generateStructuredData('Article', {
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage ? `https://www.xentiodigital.com${post.coverImage}` : undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
      ...(post.author.social?.linkedin && {
        sameAs: [
          post.author.social.linkedin,
          ...(post.author.social.twitter ? [post.author.social.twitter] : []),
        ],
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xentio Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.xentiodigital.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.xentiodigital.com/${locale}/blog/${slug}`,
    },
  })

  return {
    ...metadata,
    other: {
      'article-data': JSON.stringify(articleData),
    },
  }
}

async function BlogPostContent({ locale, slug }: { locale: string; slug: string }) {
  if (!hasFirebaseAdminEnv()) {
    notFound()
  }

  const post = await getBlogBySlug(slug, locale)

  if (!post || !post.published) {
    notFound()
  }

  // Related posts (server-side, same locale, published)
  const all = await getAllBlogs(locale)
  const relatedPosts = all
    .filter((p) => p.published && p.slug !== post.slug)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 4)

  // Generate structured data with enhanced author info
  const articleData = generateStructuredData('Article', {
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage ? `https://www.xentiodigital.com${post.coverImage}` : undefined,
    datePublished: post.createdAt,
    dateModified: post.updatedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
      ...(post.author.social?.linkedin && {
        sameAs: [
          post.author.social.linkedin,
          ...(post.author.social.twitter ? [post.author.social.twitter] : []),
        ],
      }),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Xentio Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.xentiodigital.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.xentiodigital.com/${locale}/blog/${slug}`,
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleData),
        }}
        suppressHydrationWarning
      />
      <BlogPostPageContent post={post} locale={locale} relatedPosts={relatedPosts} />
    </>
  )
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params
  return (
    <Suspense fallback={<LoadingFallback message="Loading blog post from database..." />}>
      <BlogPostContent locale={locale} slug={slug} />
    </Suspense>
  )
}
