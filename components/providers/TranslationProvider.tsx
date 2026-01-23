'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LanguageSuggestionModal from '@/components/LanguageSuggestionModal'
import { getCookie, COOKIE_KEYS } from '@/lib/cookies'

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null)
  const [detectionMethod, setDetectionMethod] = useState<'geolocation' | 'browser'>('browser')
  const pathname = usePathname()

  useEffect(() => {
    // Check for language suggestion from cookies (set by middleware)
    const checkSuggestion = () => {
      try {
        const stored = getCookie('x-suggested-language')
        const method = getCookie('x-detection-method') as 'geolocation' | 'browser' | null

        if (stored) {
          setSuggestedLanguage(stored)
          setDetectionMethod(method || 'browser')
        }
      } catch (error) {
        console.error('Error checking language suggestion:', error)
      }
    }

    // Small delay to ensure cookies are available
    const timer = setTimeout(checkSuggestion, 100)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {children}
      {suggestedLanguage && (
        <LanguageSuggestionModal
          suggestedLanguage={suggestedLanguage}
          detectionMethod={detectionMethod}
        />
      )}
    </>
  )
}
