import Image from 'next/image'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
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
  const t = await getTranslations('blog')
  const rtl = isRTL(locale)
  const categoryColor = getCategoryColor(post.category)
  const headings = extractHeadingsFromMarkdown(post.content)
  const readingTime = calculateReadingTime(post.content)

  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={!post.coverImage ? { background: 'var(--hero-gradient, linear-gradient(135deg, rgba(109,40,217,0.08) 0%, transparent 50%, rgba(8,145,178,0.08) 100%))' } : undefined}
      >
        {post.coverImage ? (
          <div className="absolute inset-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />
          </div>
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <div className="floating-shape bg-primary-500/20" />
            <div className="floating-shape bg-secondary-500/20" style={{ animationDelay: '-5s' }} />
          </div>
        )}

        <div className="container-custom relative z-10 text-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href={getBlogCategoryUrl(post.category, locale)}
              className={`inline-block px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-gradient-to-r ${categoryColor} text-gray-900 dark:text-white mb-5 sm:mb-8 hover:scale-105 transition-transform shadow-lg`}
            >
              {post.category}
            </Link>

            <h1
              className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight ${
                post.coverImage ? 'text-white' : 'text-high-contrast'
              }`}
            >
              {post.title}
            </h1>

            <p
              className={`text-sm sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed ${
                post.coverImage ? 'text-white/80' : 'text-muted-enhanced'
              }`}
            >
              {post.seoDescription || post.excerpt}
            </p>

            <div
              className={`flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm ${
                post.coverImage ? 'text-white/80' : 'text-muted-enhanced'
              }`}
            >
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
      <section className="py-8 sm:py-10 md:py-14 bg-surface">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
            <article className="lg:col-span-8 blog-article w-full">
              {/* Markdown content (server-rendered) */}
              <div className="glass-premium rounded-2xl p-4 sm:p-6 md:p-10 border" style={{ borderColor: 'var(--border-default)' }}>
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
                  <h3 className="text-sm font-semibold text-muted-enhanced mb-4 uppercase tracking-wider">{t('tags')}</h3>
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
                  <h2 className="text-2xl font-bold text-high-contrast mb-6">{t('relatedPosts')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((p, idx) => (
                      <BlogCard key={p.id} post={p} index={idx} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      href={`/${locale}/blog`}
                      className="text-primary-600 dark:text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 font-semibold text-sm transition-colors inline-flex items-center gap-2"
                    >
                      {t('viewAllArticles')}
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

