/**
 * Geolocation Detection Service
 * Detects user country from IP address
 */

export interface GeolocationResult {
  country: string
  countryCode: string
  city?: string
  region?: string
  timezone?: string
}

/**
 * Detect country from IP using Vercel Edge or Cloudflare
 * Falls back to free IP geolocation API
 */
export async function detectCountryFromIP(
  request: Request
): Promise<GeolocationResult | null> {
  try {
    // Try Vercel Edge Headers first
    const countryCode = request.headers.get('x-vercel-ip-country') ||
                        request.headers.get('cf-ipcountry') ||
                        request.headers.get('x-country-code')

    if (countryCode && countryCode !== 'XX') {
      return {
        country: countryCode,
        countryCode: countryCode,
      }
    }

    // Fallback to IP geolocation API
    const clientIP = getClientIP(request)
    if (!clientIP) {
      return null
    }

    // Use free IP geolocation service
    const response = await fetch(`https://ipapi.co/${clientIP}/json/`, {
      headers: {
        'User-Agent': 'Xentio-Digital-i18n',
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    if (data.error) {
      return null
    }

    return {
      country: data.country_name || '',
      countryCode: data.country_code || '',
      city: data.city,
      region: data.region,
      timezone: data.timezone,
    }
  } catch (error) {
    console.error('Geolocation detection error:', error)
    return null
  }
}

/**
 * Extract client IP from request
 */
function getClientIP(request: Request): string | null {
  // Try various headers (Vercel, Cloudflare, etc.)
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return null
}

/**
 * Get language from country code
 */
export function getLanguageFromCountry(countryCode: string): string | null {
  const COUNTRY_LANGUAGE_MAP: Record<string, string> = {
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
  
  return COUNTRY_LANGUAGE_MAP[countryCode.toUpperCase()] || null
}

/**
 * Get language suggestion message in detected language
 */
export function getLanguageSuggestionMessage(
  detectedLanguage: string,
  suggestedLanguage: string
): { title: string; message: string; switch: string; keep: string } {
  const messages: Record<string, { title: string; message: string; switch: string; keep: string }> = {
    ar: {
      title: 'اقتراح اللغة',
      message: 'هل ترغب في التبديل إلى اللغة العربية؟',
      switch: 'تبديل اللغة',
      keep: 'البقاء على الإنجليزية',
    },
    fr: {
      title: 'Suggestion de langue',
      message: 'Souhaitez-vous passer au français?',
      switch: 'Changer la langue',
      keep: 'Rester en anglais',
    },
    de: {
      title: 'Sprachvorschlag',
      message: 'Möchten Sie zu Deutsch wechseln?',
      switch: 'Sprache wechseln',
      keep: 'Bei Englisch bleiben',
    },
    es: {
      title: 'Sugerencia de idioma',
      message: '¿Te gustaría cambiar al español?',
      switch: 'Cambiar idioma',
      keep: 'Permanecer en inglés',
    },
    it: {
      title: 'Suggerimento lingua',
      message: 'Vuoi passare all\'italiano?',
      switch: 'Cambia lingua',
      keep: 'Resta in inglese',
    },
    pt: {
      title: 'Sugestão de idioma',
      message: 'Gostaria de mudar para português?',
      switch: 'Mudar idioma',
      keep: 'Permanecer em inglês',
    },
    ja: {
      title: '言語の提案',
      message: '日本語に切り替えますか？',
      switch: '言語を切り替える',
      keep: '英語のまま',
    },
    ko: {
      title: '언어 제안',
      message: '한국어로 전환하시겠습니까?',
      switch: '언어 전환',
      keep: '영어 유지',
    },
    zh: {
      title: '语言建议',
      message: '您想切换到中文吗？',
      switch: '切换语言',
      keep: '保持英语',
    },
    ru: {
      title: 'Предложение языка',
      message: 'Хотите переключиться на русский?',
      switch: 'Изменить язык',
      keep: 'Остаться на английском',
    },
    hi: {
      title: 'भाषा सुझाव',
      message: 'क्या आप हिंदी में स्विच करना चाहेंगे?',
      switch: 'भाषा बदलें',
      keep: 'अंग्रेजी में रहें',
    },
  }

  return messages[detectedLanguage] || {
    title: 'Language Suggestion',
    message: `Would you like to switch to ${suggestedLanguage}?`,
    switch: 'Switch Language',
    keep: 'Keep English',
  }
}
