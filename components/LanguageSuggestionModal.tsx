'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { getLanguageSuggestionMessage } from '@/lib/geolocation'
import { getCookie, setCookie, COOKIE_KEYS } from '@/lib/cookies'
import { isRTL } from '@/lib/translation'
import { Icon } from '@/components/icons'

interface LanguageSuggestionModalProps {
  suggestedLanguage: string
  detectionMethod: 'geolocation' | 'browser'
}

export default function LanguageSuggestionModal({
  suggestedLanguage,
  detectionMethod,
}: LanguageSuggestionModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  useEffect(() => {
    // Check if modal was already shown
    const suggestionShown = getCookie(COOKIE_KEYS.LANGUAGE_SUGGESTION_SHOWN)
    const userChoice = getCookie(COOKIE_KEYS.LANGUAGE_CHOICE)

    // Only show if:
    // 1. Not already shown for this language
    // 2. User hasn't explicitly chosen to keep current language
    // 3. Suggested language is different from current
    if (
      !suggestionShown &&
      userChoice !== 'keep' &&
      suggestedLanguage !== currentLocale &&
      suggestedLanguage !== 'en'
    ) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [suggestedLanguage, currentLocale])

  const handleSwitch = () => {
    setIsAnimating(true)
    
    // Save user choice
    setCookie(COOKIE_KEYS.LANGUAGE, suggestedLanguage)
    setCookie(COOKIE_KEYS.LANGUAGE_SUGGESTION_SHOWN, 'true')
    setCookie(COOKIE_KEYS.LANGUAGE_CHOICE, 'switch')

    // Navigate to new locale
    const newPath = pathname.replace(`/${currentLocale}`, `/${suggestedLanguage}`)
    router.push(newPath)
    
    // Reload to apply RTL changes
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }

  const handleKeep = () => {
    setIsAnimating(true)
    
    // Save user choice
    setCookie(COOKIE_KEYS.LANGUAGE, currentLocale)
    setCookie(COOKIE_KEYS.LANGUAGE_SUGGESTION_SHOWN, 'true')
    setCookie(COOKIE_KEYS.LANGUAGE_CHOICE, 'keep')

    setTimeout(() => {
      setIsOpen(false)
      setIsAnimating(false)
    }, 300)
  }

  if (!isOpen) return null

  const messages = getLanguageSuggestionMessage(suggestedLanguage, suggestedLanguage)
  const rtl = isRTL(suggestedLanguage)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleKeep}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${
              rtl ? 'rtl' : ''
            }`}
            dir={rtl ? 'rtl' : 'ltr'}
          >
            <div className="glass-premium rounded-3xl p-8 md:p-12 max-w-md w-full relative overflow-hidden border border-white/20">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-accent-500/20 opacity-50" />
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-3xl opacity-20 blur-2xl" />

              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-3xl"
                >
                  <Icon name="Globe" className="w-8 h-8 text-white" strokeWidth={2} />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl md:text-3xl font-bold text-high-contrast text-center mb-4"
                >
                  {messages.title}
                </motion.h2>

                {/* Message */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-enhanced text-center mb-8 leading-relaxed"
                >
                  {messages.message}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`flex gap-4 ${rtl ? 'flex-row-reverse' : ''}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSwitch}
                    disabled={isAnimating}
                    className="flex-1 btn-primary text-lg py-4 glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {messages.switch}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleKeep}
                    disabled={isAnimating}
                    className="flex-1 btn-secondary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {messages.keep}
                  </motion.button>
                </motion.div>

                {/* Detection method indicator */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs text-subtle-enhanced text-center mt-6"
                >
                  <span className="inline-flex items-center gap-2 justify-center">
                    {detectionMethod === 'geolocation' ? (
                      <>
                        <Icon name="Pin" className="w-4 h-4" strokeWidth={2} />
                        <span>Based on your location</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Globe" className="w-4 h-4" strokeWidth={2} />
                        <span>Based on your browser</span>
                      </>
                    )}
                  </span>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
