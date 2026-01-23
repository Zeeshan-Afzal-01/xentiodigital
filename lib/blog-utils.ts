/**
 * Blog utility functions
 */

import readingTime from 'reading-time'

/**
 * Calculate reading time from text content
 */
export function calculateReadingTime(content: string): number {
  const stats = readingTime(content)
  return Math.ceil(stats.minutes)
}

/**
 * Format date for display
 */
export function formatBlogDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

/**
 * Get category color/gradient
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'Digital Marketing': 'from-purple-500 to-pink-500',
    'SEO': 'from-blue-500 to-cyan-500',
    'Web Development': 'from-indigo-500 to-purple-500',
    'E-commerce': 'from-green-500 to-emerald-500',
    'Business Growth': 'from-orange-500 to-red-500',
    'AI & Automation': 'from-cyan-500 to-blue-500',
  }
  return colors[category] || 'from-gray-500 to-gray-600'
}

/**
 * Generate blog post URL
 */
export function getBlogPostUrl(slug: string, locale: string = 'en'): string {
  return `/${locale}/blog/${slug}`
}

/**
 * Generate blog category URL
 */
export function getBlogCategoryUrl(category: string, locale: string = 'en'): string {
  return `/${locale}/blog?category=${encodeURIComponent(category)}`
}

/**
 * Extract headings from Markdown content string (H2-H4)
 */
export function extractHeadingsFromMarkdown(content: string): Array<{ id: string; text: string; level: number }> {
  const headingRegex = /^(#{2,4})\s+(.+)$/gm
  const extracted: Array<{ id: string; text: string; level: number }> = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length // Number of # characters (2, 3, or 4)
    const text = match[2].trim()
    if (text && level >= 2 && level <= 4) {
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      extracted.push({ id, text, level })
    }
  }

  return extracted
}
