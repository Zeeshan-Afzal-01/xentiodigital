'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { translateText, TranslationConfig } from '@/lib/translation'

/**
 * Custom hook for dynamic translations using API
 * Falls back to next-intl if translation fails
 */
export function useDynamicTranslation() {
  const locale = useLocale()
  const [translationConfig, setTranslationConfig] = useState<TranslationConfig | null>(null)

  useEffect(() => {
    // Load translation config from environment
    const config: TranslationConfig = {
      provider: (process.env.NEXT_PUBLIC_TRANSLATION_PROVIDER as any) || 'google',
      apiKey: process.env.NEXT_PUBLIC_TRANSLATION_API_KEY,
      projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
      cacheEnabled: true,
      cacheTTL: 86400,
    }
    setTranslationConfig(config)
  }, [])

  const translate = useCallback(
    async (text: string, targetLocale?: string): Promise<string> => {
      if (!translationConfig || !translationConfig.apiKey) {
        return text // Fallback to original if no API key
      }

      const target = targetLocale || locale
      if (target === 'en') {
        return text // Don't translate English
      }

      try {
        return await translateText(text, target, 'en', translationConfig)
      } catch (error) {
        console.error('Translation error:', error)
        return text // Fallback to original on error
      }
    },
    [locale, translationConfig]
  )

  return { translate, locale }
}
