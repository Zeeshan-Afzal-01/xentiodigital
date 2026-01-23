import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import type { Blog } from '@/lib/blog-types'
import {
  calculateReadingTime,
  formatBlogDate,
  getBlogCategoryUrl,
  getBlogPostUrl,
  getCategoryColor,
  extractHeadingsFromMarkdown,
} from '@/lib/blog-utils'
import TableOfContents from '@/components/TableOfContents'
import AuthorBio from '@/components/AuthorBio'
import TrustSignals from '@/components/TrustSignals'
import InternalLinks from '@/components/InternalLinks'
import BlogCTA from '@/components/BlogCTA'
import BlogCard from '@/components/BlogCard'
import { Icon } from '@/components/icons'
import { isRTL } from '@/lib/translation'

function slugifyHeading(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
}

export default async function BlogPostPageContent({
  post,
  locale,
  relatedPosts,
}: {
  post: Blog
  locale: string
  relatedPosts: Blog[]
}) {
  const rtl = isRTL(locale)
  const categoryColor = getCategoryColor(post.category)
  const headings = extractHeadingsFromMarkdown(post.content)
  const readingTime = calculateReadingTime(post.content)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {post.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
          </div>
        )}

        <div className="container-custom relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href={getBlogCategoryUrl(post.category, locale)}
              className={`inline-block px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r ${categoryColor} text-white mb-8 hover:scale-105 transition-transform shadow-lg`}
            >
              {post.category}
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              {post.title}
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              {post.seoDescription || post.excerpt}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
              <span className="inline-flex items-center gap-2">
                <Icon name="Calendar" className="w-4 h-4" strokeWidth={2} />
                {formatBlogDate(post.createdAt, locale)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="Clock" className="w-4 h-4" strokeWidth={2} />
                {readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <article className="lg:col-span-8 blog-article">
              {/* Markdown content (server-rendered) */}
              <div className="glass-premium rounded-2xl p-6 md:p-10 border" style={{ borderColor: 'var(--border-default)' }}>
                <ReactMarkdown
                  components={{
                    h2: ({ children, ...props }) => {
                      const text = String(children)
                      const id = slugifyHeading(text)
                      return (
                        <h2 id={id} {...props}>
                          {children}
                        </h2>
                      )
                    },
                    h3: ({ children, ...props }) => {
                      const text = String(children)
                      const id = slugifyHeading(text)
                      return (
                        <h3 id={id} {...props}>
                          {children}
                        </h3>
                      )
                    },
                    h4: ({ children, ...props }) => {
                      const text = String(children)
                      const id = slugifyHeading(text)
                      return (
                        <h4 id={id} {...props}>
                          {children}
                        </h4>
                      )
                    },
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </div>

              {/* Tags */}
              {post.tags?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-muted-enhanced mb-4 uppercase tracking-wider">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs font-medium glass-premium border text-muted-enhanced hover:text-high-contrast transition-colors"
                        style={{ borderColor: 'var(--border-default)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="mt-10 space-y-6">
                <BlogCTA variant="primary" />
                <BlogCTA variant="secondary" />
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-high-contrast mb-6">Related articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((p, idx) => (
                      <BlogCard key={p.id} post={p} index={idx} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/${locale}/blog`}
                      className="text-primary-500 hover:text-primary-400 font-semibold text-sm transition-colors inline-flex items-center gap-2"
                    >
                      View all articles
                      <Icon name="ChevronRight" rtlFlip rtl={rtl} className="w-4 h-4" strokeWidth={2} />
                    </Link>
                  </div>
                </div>
              )}
            </article>

            <aside className="lg:col-span-4 space-y-8">
              {/* TOC (client scroll spy only) */}
              <TableOfContents headings={headings} />

              <AuthorBio author={post.author} locale={locale} />
              <TrustSignals variant="compact" showTestimonials={false} />
              <InternalLinks post={post} variant="services" />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

