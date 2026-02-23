'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import type { Blog } from '@/lib/blog-types'
import BlogCard from '@/components/BlogCard'
import BlogFilters from '@/components/BlogFilters'
import { Icon } from '@/components/icons'

export default function BlogListContent({ posts }: { posts: Blog[] }) {
  const t = useTranslations('blog')
  const allPosts = posts
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter posts
  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = !selectedCategory || post.category === selectedCategory
      const matchesTag = !selectedTag || post.tags.includes(selectedTag)
      const matchesSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.seoDescription || '').toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesTag && matchesSearch
    })
  }, [allPosts, selectedCategory, selectedTag, searchQuery])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div
          className="absolute inset-0 blog-hero-animated-bg"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">{t('title')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <BlogFilters
                  posts={allPosts}
                  selectedCategory={selectedCategory}
                  selectedTag={selectedTag}
                  searchQuery={searchQuery}
                  onCategoryChange={setSelectedCategory}
                  onTagChange={setSelectedTag}
                  onSearchChange={setSearchQuery}
                />
              </div>
            </aside>

            {/* Main Content - Blog Grid */}
            <div className="lg:col-span-3">
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                <p className="text-muted-enhanced">
                  {filteredPosts.length} {filteredPosts.length === 1 ? t('articleFound') : t('articlesFound')}
                </p>
              </motion.div>

              {/* Blog Posts Grid */}
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="wait">
                    {filteredPosts.map((post, index) => (
                      <BlogCard key={post.slug} post={post} index={index} />
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-premium rounded-2xl p-12 text-center border"
                  style={{
                    borderColor: 'var(--border-default)',
                  }}
                >
                  <div className="flex justify-center mb-4">
                    <Icon name="Search" className="w-14 h-14 text-primary-500" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-high-contrast mb-2">
                    {t('noPosts')}
                  </h3>
                  <p className="text-muted-enhanced">
                    {t('noPostsSubtitle')}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
