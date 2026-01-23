/**
 * Server-side translation utilities
 * For translating content in Server Components
 */

import { translateText, TranslationConfig } from './translation'

let translationConfig: TranslationConfig | null = null

function getTranslationConfig(): TranslationConfig {
  if (!translationConfig) {
    translationConfig = {
      provider: (process.env.TRANSLATION_PROVIDER as any) || 'google',
      apiKey: process.env.TRANSLATION_API_KEY,
      projectId: process.env.GOOGLE_PROJECT_ID,
      cacheEnabled: true,
      cacheTTL: 86400,
    }
  }
  return translationConfig
}

/**
 * Translate text on the server
 * Use this in Server Components for dynamic translations
 */
export async function translate(
  text: string,
  targetLocale: string,
  sourceLocale: string = 'en'
): Promise<string> {
  if (targetLocale === sourceLocale || !text || !text.trim()) {
    return text
  }

  const config = getTranslationConfig()
  
  // If no API key, return original (fallback)
  if (!config.apiKey || config.apiKey === 'your_google_cloud_translation_api_key_here') {
    console.warn('Translation API key not configured. Returning original text.')
    return text
  }

  try {
    return await translateText(text, targetLocale, sourceLocale, config)
  } catch (error) {
    console.error('Server translation error:', error)
    // Always return original text on error (graceful degradation)
    return text
  }
}

/**
 * Translate metadata for SEO
 */
export async function translateMetadata(
  metadata: {
    title?: string
    description?: string
    keywords?: string[]
  },
  locale: string
): Promise<{
  title?: string
  description?: string
  keywords?: string[]
}> {
  if (locale === 'en') {
    return metadata
  }

  const [title, description, keywords] = await Promise.all([
    metadata.title ? translate(metadata.title, locale) : undefined,
    metadata.description ? translate(metadata.description, locale) : undefined,
    metadata.keywords
      ? Promise.all(metadata.keywords.map((kw) => translate(kw, locale)))
      : undefined,
  ])

  return {
    title,
    description,
    keywords,
  }
}
