/**
 * Cookie utilities for language persistence
 */

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return
  
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
}

export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

/**
 * Server-side cookie parsing
 */
export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {}
  
  if (!cookieHeader) return cookies
  
  cookieHeader.split(';').forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split('=')
    if (name) {
      cookies[name] = rest.join('=')
    }
  })
  
  return cookies
}

export const COOKIE_KEYS = {
  LANGUAGE: 'xentio-locale',
  LANGUAGE_SUGGESTION_SHOWN: 'xentio-lang-suggestion-shown',
  LANGUAGE_CHOICE: 'xentio-lang-choice',
} as const
