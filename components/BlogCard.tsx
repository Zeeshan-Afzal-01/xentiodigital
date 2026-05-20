'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Blog } from '@/lib/blog-types'
import { calculateReadingTime, getCategoryColor, formatBlogDate, getBlogPostUrl } from '@/lib/blog-utils'
import { useLocale } from 'next-intl'

interface BlogCardProps {
  post: Blog
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const locale = useLocale()
  const categoryColor = getCategoryColor(post.category)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative h-full"
    >
      <Link href={getBlogPostUrl(post.slug, locale)}>
        <div
          className="glass-premium rounded-2xl overflow-hidden border h-full flex flex-col transition-all duration-300"
          style={{ borderColor: 'var(--border-default)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--brand-primary)'
            e.currentTarget.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-default)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Featured Image */}
          {post.coverImage && (
            <div className="relative w-full h-40 sm:h-48 overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            {/* Category Badge */}
            <div className="mb-3">
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColor} text-gray-900 dark:text-white`}>
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-high-contrast mb-2 sm:mb-3 line-clamp-2 group-hover:text-primary-500 transition-colors leading-snug">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-muted-enhanced mb-3 sm:mb-4 line-clamp-3 flex-1 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div
              className="flex items-center justify-between text-xs sm:text-sm text-muted-enhanced pt-3 sm:pt-4 border-t"
              style={{ borderColor: 'var(--border-default)' }}
            >
              <span>{formatBlogDate(post.createdAt, locale)}</span>
              <span>{calculateReadingTime(post.content)} min read</span>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${categoryColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl pointer-events-none`} />
        </div>
      </Link>
    </motion.article>
  )
}
