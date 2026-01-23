'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Blog } from '@/lib/blog-types'
import { getCategoryColor } from '@/lib/blog-utils'
import { Icon } from '@/components/icons'

interface BlogFiltersProps {
  posts: Blog[]
  selectedCategory: string | null
  selectedTag: string | null
  searchQuery: string
  onCategoryChange: (category: string | null) => void
  onTagChange: (tag: string | null) => void
  onSearchChange: (query: string) => void
}

export default function BlogFilters({
  posts,
  selectedCategory,
  selectedTag,
  searchQuery,
  onCategoryChange,
  onTagChange,
  onSearchChange,
}: BlogFiltersProps) {
  const categories = Array.from(new Set(posts.map((p) => p.category))).sort()
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags || []))).sort()
  const [showTags, setShowTags] = useState(false)

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-12 rounded-xl glass-premium border text-high-contrast placeholder:text-muted-enhanced focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
          style={{
            borderColor: 'var(--border-default)',
          }}
        />
        <Icon
          name="Search"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-enhanced"
          strokeWidth={2}
        />
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-muted-enhanced mb-3 uppercase tracking-wider">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onCategoryChange(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-primary-500 text-white'
                : 'glass-premium border text-muted-enhanced hover:text-high-contrast'
            }`}
            style={{
              borderColor: selectedCategory === null ? 'transparent' : 'var(--border-default)',
            }}
          >
            All
          </motion.button>
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            const categoryColor = getCategoryColor(category)
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(isSelected ? null : category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSelected
                    ? `bg-gradient-to-r ${categoryColor} text-white`
                    : 'glass-premium border text-muted-enhanced hover:text-high-contrast'
                }`}
                style={{
                  borderColor: isSelected ? 'transparent' : 'var(--border-default)',
                }}
              >
                {category}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Tags Toggle */}
      <div>
        <button
          onClick={() => setShowTags(!showTags)}
          className="flex items-center justify-between w-full text-sm font-semibold text-muted-enhanced mb-3 uppercase tracking-wider"
        >
          <span>Tags</span>
          <motion.svg
            animate={{ rotate: showTags ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {showTags && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {tags.map((tag) => {
                const isSelected = selectedTag === tag
                return (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTagChange(isSelected ? null : tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-primary-500 text-white'
                        : 'glass-premium border text-muted-enhanced hover:text-high-contrast'
                    }`}
                    style={{
                      borderColor: isSelected ? 'transparent' : 'var(--border-default)',
                    }}
                  >
                    {tag}
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Active Filters */}
      {(selectedCategory || selectedTag || searchQuery) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 flex-wrap"
        >
          <span className="text-sm text-muted-enhanced">Active filters:</span>
          {selectedCategory && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onCategoryChange(null)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-500 flex items-center gap-2"
            >
              {selectedCategory}
              <span>×</span>
            </motion.button>
          )}
          {selectedTag && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onTagChange(null)}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-500 flex items-center gap-2"
            >
              {selectedTag}
              <span>×</span>
            </motion.button>
          )}
          {searchQuery && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => onSearchChange('')}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-500 flex items-center gap-2"
            >
              <span>&quot;{searchQuery}&quot;</span>
              <span>×</span>
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  )
}
