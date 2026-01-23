/**
 * Enterprise Translation Service
 * Supports Google Cloud Translation API, DeepL, and Weglot
 */

export type TranslationProvider = 'google' | 'deepl' | 'weglot'

export interface TranslationConfig {
  provider: TranslationProvider
  apiKey?: string
  projectId?: string // For Google Cloud
  region?: string
  cacheEnabled?: boolean
  cacheTTL?: number // Time to live in seconds
}

export interface TranslationResult {
  text: string
  sourceLanguage: string
  targetLanguage: string
  provider: TranslationProvider
}

// Country to language mapping
export const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
  SA: 'ar', // Saudi Arabia
  AE: 'ar', // UAE
  EG: 'ar', // Egypt
  FR: 'fr', // France
  BE: 'fr', // Belgium (French)
  CH: 'de', // Switzerland (German)
  DE: 'de', // Germany
  ES: 'es', // Spain
  IT: 'it', // Italy
  PT: 'pt', // Portugal
  BR: 'pt', // Brazil
  JP: 'ja', // Japan
  KR: 'ko', // South Korea
  CN: 'zh', // China
  RU: 'ru', // Russia
  IN: 'hi', // India
}

// RTL languages
export const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur']

export function isRTL(locale: string): boolean {
  return RTL_LANGUAGES.includes(locale)
}

/**
 * Google Cloud Translation API
 */
async function translateWithGoogle(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en',
  apiKey?: string,
  projectId?: string
): Promise<string> {
  // Check if API key is set and valid
  if (!apiKey || apiKey === 'your_google_cloud_translation_api_key_here' || apiKey.trim() === '') {
    console.warn('Google Translation API key not provided or invalid, returning original text')
    return text
  }

  try {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text',
      }),
    })

    if (!response.ok) {
      let errorText = ''
      let errorData: any = null
      try {
        errorText = await response.text()
        try {
          errorData = JSON.parse(errorText)
        } catch {
          // Not JSON, use as text
        }
      } catch {
        errorText = response.statusText
      }
      
      // Check for specific error types
      if (errorData?.error?.message) {
        const errorMessage = errorData.error.message.toLowerCase()
        
        if (errorMessage.includes('expired') || errorMessage.includes('renew')) {
          console.error('Google Translation API key is EXPIRED. Please renew it in Google Cloud Console.')
          console.error('   → Go to: https://console.cloud.google.com/apis/credentials')
          console.error('   → Create a new API key or renew the existing one')
          console.error('   → Update TRANSLATION_API_KEY in .env.local')
        } else if (errorMessage.includes('invalid') || errorMessage.includes('not found')) {
          console.error('Google Translation API key is INVALID. Please check your API key.')
          console.error('   → Verify the key in: https://console.cloud.google.com/apis/credentials')
        } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
          console.error('Google Translation API quota exceeded. Check your usage limits.')
          console.error('   → View usage: https://console.cloud.google.com/apis/api/translate.googleapis.com/quotas')
        } else {
        console.warn(`Google Translation API error (${response.status}):`, errorData?.error?.message || errorText.substring(0, 200))
        }
      } else {
        console.warn(`Google Translation API error (${response.status}):`, errorText.substring(0, 200))
      }
      
      // Return original text on any API error (graceful degradation)
      return text
    }

    const data = await response.json()
    
    // Check if response has the expected structure
    if (!data.data || !data.data.translations || !data.data.translations[0]) {
      console.warn('Unexpected Google Translation API response structure:', Object.keys(data))
      return text
    }
    
    return data.data.translations[0].translatedText
  } catch (error) {
    // Log error but return original text (graceful degradation)
    console.warn('Google Translation error (non-fatal):', error instanceof Error ? error.message : String(error))
    return text
  }
}

/**
 * DeepL API
 */
async function translateWithDeepL(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en',
  apiKey?: string
): Promise<string> {
  if (!apiKey) {
    console.warn('DeepL API key not provided, returning original text')
    return text
  }

  try {
    const url = 'https://api-free.deepl.com/v2/translate'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${apiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text,
        source_lang: sourceLanguage.toUpperCase(),
        target_lang: targetLanguage.toUpperCase(),
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.translations[0].text
  } catch (error) {
    console.error('DeepL Translation error:', error)
    return text
  }
}

/**
 * Main translation function
 */
export async function translateText(
  text: string,
  targetLanguage: string,
  sourceLanguage: string = 'en',
  config: TranslationConfig = {
    provider: 'google',
    cacheEnabled: true,
    cacheTTL: 86400, // 24 hours
  }
): Promise<string> {
  // Don't translate if same language
  if (targetLanguage === sourceLanguage) {
    return text
  }

  // Check cache first
  if (config.cacheEnabled) {
    const cacheKey = `translation:${sourceLanguage}:${targetLanguage}:${text}`
    const cached = await getCachedTranslation(cacheKey)
    if (cached) {
      return cached
    }
  }

  let translated: string

  switch (config.provider) {
    case 'google':
      translated = await translateWithGoogle(
        text,
        targetLanguage,
        sourceLanguage,
        config.apiKey,
        config.projectId
      )
      break
    case 'deepl':
      translated = await translateWithDeepL(
        text,
        targetLanguage,
        sourceLanguage,
        config.apiKey
      )
      break
    case 'weglot':
      // Weglot is typically client-side, handled differently
      translated = text
      break
    default:
      translated = text
  }

  // Cache the result
  if (config.cacheEnabled && translated !== text) {
    const cacheKey = `translation:${sourceLanguage}:${targetLanguage}:${text}`
    await cacheTranslation(cacheKey, translated, config.cacheTTL || 86400)
  }

  return translated
}

/**
 * Translate multiple texts in batch
 */
export async function translateBatch(
  texts: string[],
  targetLanguage: string,
  sourceLanguage: string = 'en',
  config?: TranslationConfig
): Promise<string[]> {
  // For batch translation, join with a special delimiter
  const combined = texts.join('|||TRANSLATION_SEPARATOR|||')
  const translated = await translateText(combined, targetLanguage, sourceLanguage, config)
  return translated.split('|||TRANSLATION_SEPARATOR|||')
}

/**
 * Simple in-memory cache (for server-side)
 * In production, use Redis or similar
 */
const translationCache = new Map<string, { text: string; expires: number }>()

async function getCachedTranslation(key: string): Promise<string | null> {
  const cached = translationCache.get(key)
  if (cached && cached.expires > Date.now()) {
    return cached.text
  }
  translationCache.delete(key)
  return null
}

async function cacheTranslation(key: string, text: string, ttl: number): Promise<void> {
  translationCache.set(key, {
    text,
    expires: Date.now() + ttl * 1000,
  })
}

/**
 * Detect language from Accept-Language header
 */
export function detectLanguageFromHeader(acceptLanguage: string | null): string {
  if (!acceptLanguage) return 'en'

  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, q = 'q=1'] = lang.trim().split(';')
      const quality = parseFloat(q.replace('q=', ''))
      return { code: code.split('-')[0].toLowerCase(), quality }
    })
    .sort((a, b) => b.quality - a.quality)

  return languages[0]?.code || 'en'
}

/**
 * Get language suggestion based on country
 */
export function getLanguageFromCountry(countryCode: string): string | null {
  return COUNTRY_LANGUAGE_MAP[countryCode.toUpperCase()] || null
}
