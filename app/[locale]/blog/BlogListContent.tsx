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
  const [filtersOpen, setFiltersOpen] = useState(false)

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

  const activeFilterCount = [selectedCategory, selectedTag, searchQuery].filter(Boolean).length

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[45vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 blog-hero-animated-bg"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />

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

        <div className="container-custom relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6"
          >
            <span className="gradient-text">{t('title')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto px-2"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-8 sm:py-10 md:py-14">
        <div className="container-custom px-4 sm:px-6 lg:px-8">

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-5">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass-premium border text-sm font-medium text-high-contrast w-full justify-between"
              style={{ borderColor: 'var(--border-default)' }}
            >
              <span className="flex items-center gap-2">
                <Icon name="Search" className="w-4 h-4" strokeWidth={2} />
                {t('filters') || 'Filters'}
                {activeFilterCount > 0 && (
                  <span className="bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <motion.span
                animate={{ rotate: filtersOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <Icon name="ChevronDown" className="w-4 h-4" strokeWidth={2} />
              </motion.span>
            </button>

            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-2">
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Sidebar - Filters (desktop only) */}
            <aside className="hidden lg:block lg:col-span-1">
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

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-5 sm:mb-8"
              >
                <p className="text-sm sm:text-base text-muted-enhanced">
                  {filteredPosts.length} {filteredPosts.length === 1 ? t('articleFound') : t('articlesFound')}
                </p>
              </motion.div>

              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                  className="glass-premium rounded-2xl p-8 sm:p-12 text-center border"
                  style={{ borderColor: 'var(--border-default)' }}
                >
                  <div className="flex justify-center mb-4">
                    <Icon name="Search" className="w-12 h-12 sm:w-14 sm:h-14 text-primary-500" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-high-contrast mb-2">
                    {t('noPosts')}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-enhanced">
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
