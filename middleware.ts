import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from './i18n/request'
import { detectCountryFromIP, getLanguageFromCountry } from './lib/geolocation'
import { detectLanguageFromHeader } from './lib/translation'
import { parseCookies } from './lib/cookies'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Admin UI routes (skip i18n)
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next()

    // Edge-safe guard: require presence of admin session cookie.
    // Full verification happens server-side in protected layout + API routes.
    const sessionCookie = request.cookies.get('admin_session')?.value
    if (!sessionCookie) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
  }

  // Admin API routes
  if (pathname.startsWith('/api/admin')) {
    // Session endpoint must be reachable before cookie exists (login)
    if (pathname === '/api/admin/session') {
      return NextResponse.next()
    }
    const sessionCookie = request.cookies.get('admin_session')?.value
    if (!sessionCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.next()
  }
  // Parse cookies
  const cookies = parseCookies(request.headers.get('cookie'))
  
  // Check if user has already chosen a language
  const userLocale = cookies['xentio-locale']
  if (userLocale && locales.includes(userLocale as any)) {
    // User has a saved preference, use it
    return intlMiddleware(request)
  }

  // Detect language from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language')
  const browserLanguage = detectLanguageFromHeader(acceptLanguage)

  // Detect country from IP (non-blocking)
  let countryLanguage: string | null = null
  try {
    const geolocation = await detectCountryFromIP(request)
    countryLanguage = geolocation ? getLanguageFromCountry(geolocation.countryCode) : null
  } catch (error) {
    console.error('Geolocation detection failed:', error)
  }

  // Determine suggested language
  // Priority: Country > Browser > Default
  const suggestedLanguage = countryLanguage || 
                            (locales.includes(browserLanguage as any) ? browserLanguage : null) ||
                            defaultLocale

  // If suggested language is different from current/default, set a flag
  const currentPath = request.nextUrl.pathname
  const pathLocale = currentPath.split('/')[1]
  const currentLocale = locales.includes(pathLocale as any) ? pathLocale : defaultLocale

  // Run the intl middleware first
  const response = intlMiddleware(request)

  // If we're on default locale and have a suggestion, add suggestion data
  if (response instanceof NextResponse && currentLocale === defaultLocale && suggestedLanguage !== defaultLocale) {
    // Set cookies for client-side access (these will be read by TranslationProvider)
    const cookieOptions = {
      path: '/',
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: 'lax' as const,
    }
    
    response.cookies.set('x-suggested-language', suggestedLanguage, cookieOptions)
    response.cookies.set('x-detection-method', countryLanguage ? 'geolocation' : 'browser', cookieOptions)
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
