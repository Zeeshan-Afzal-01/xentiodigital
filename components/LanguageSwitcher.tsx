'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { isRTL } from '@/lib/translation'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const rtl = isRTL(locale)

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent page scroll when scrolling inside dropdown
  // Using CSS overscroll-behavior: contain for better performance
  // Minimal JS intervention for faster scrolling

  const handleLanguageChange = (code: string) => {
    // Save to cookie
    if (typeof document !== 'undefined') {
      document.cookie = `xentio-locale=${code};path=/;max-age=${365 * 24 * 60 * 60};SameSite=Lax`
    }
    
    // Add fade transition class
    document.body.classList.add('language-switching')
    
    // Small delay for fade effect
    setTimeout(() => {
      const newPathname = pathname.replace(`/${locale}`, `/${code}`)
      router.push(newPathname)
      setIsOpen(false)
      
      // Reload to apply RTL changes if switching to/from RTL language
      const isCurrentRTL = ['ar', 'he', 'fa', 'ur'].includes(locale)
      const isNewRTL = ['ar', 'he', 'fa', 'ur'].includes(code)
      if (isCurrentRTL !== isNewRTL) {
        setTimeout(() => {
          document.body.classList.remove('language-switching')
          window.location.reload()
        }, 300)
      } else {
        // Remove transition class after animation
        setTimeout(() => {
          document.body.classList.remove('language-switching')
        }, 400)
      }
    }, 150)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg glass border transition-all ${rtl ? 'flex-row-reverse' : ''}`}
        style={{
          borderColor: 'var(--border-default)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--brand-primary)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-default)'
        }}
      >
        <span className="text-xl flex-shrink-0">{currentLanguage.flag}</span>
        <span className="text-sm font-medium text-high-contrast hidden sm:inline whitespace-nowrap">
          {currentLanguage.code.toUpperCase()}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className={`w-4 h-4 text-muted-enhanced flex-shrink-0 ${rtl ? 'scale-x-[-1]' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full mt-2 ${rtl ? 'left-0' : 'right-0'} min-w-[12rem] max-w-[16rem] rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-2xl overflow-hidden z-50 bg-white dark:bg-gray-800`}
          >
            <div 
              ref={scrollContainerRef}
              className="py-2 max-h-80 overflow-y-auto overflow-x-hidden dropdown-scroll"
              style={{
                scrollBehavior: 'auto', // Use auto for faster, more responsive scrolling
              }}
              onWheel={(e) => {
                // Prevent page scroll but allow native fast scrolling
                const target = e.currentTarget
                const { scrollTop, scrollHeight, clientHeight } = target
                const isAtTop = scrollTop <= 1
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1

                // Only prevent page scroll if we can scroll within dropdown
                if ((!isAtTop && e.deltaY < 0) || (!isAtBottom && e.deltaY > 0)) {
                  e.stopPropagation()
                }
              }}
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ x: rtl ? -4 : 4, backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-start transition-colors ${
                    locale === lang.code
                      ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-900 dark:text-primary-200 font-semibold'
                      : 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } ${rtl ? 'flex-row-reverse' : ''}`}
                >
                  <span className="text-xl flex-shrink-0">{lang.flag}</span>
                  <span className="text-sm font-medium flex-1 min-w-0">{lang.name}</span>
                  {locale === lang.code && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`w-4 h-4 text-primary-400 flex-shrink-0 ${rtl ? 'mr-auto' : 'ml-auto'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
