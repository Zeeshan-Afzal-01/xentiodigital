/**
 * Language-specific font configuration
 * Dynamically loads fonts based on locale
 */

import { Inter, Noto_Sans_Arabic, Cairo } from 'next/font/google'

// Latin fonts (English, French, German, Spanish, etc.)
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Arabic font
export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-arabic',
  display: 'swap',
})

// Alternative Arabic font (Cairo - more modern)
export const cairo = Cairo({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-cairo',
  display: 'swap',
})

/**
 * Get font class based on locale
 */
export function getFontForLocale(locale: string): string {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  
  if (rtlLanguages.includes(locale)) {
    return cairo.variable // Use Cairo for Arabic
  }
  
  return inter.variable // Use Inter for Latin languages
}

/**
 * Get font family CSS variable
 */
export function getFontFamily(locale: string): string {
  const rtlLanguages = ['ar', 'he', 'fa', 'ur']
  
  if (rtlLanguages.includes(locale)) {
    return 'var(--font-cairo), system-ui, sans-serif'
  }
  
  return 'var(--font-inter), system-ui, sans-serif'
}
