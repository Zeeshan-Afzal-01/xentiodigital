import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { headers } from 'next/headers'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { TranslationProvider } from '@/components/providers/TranslationProvider'
import { LanguageSwitchProvider } from '@/components/providers/LanguageSwitchProvider'
import LocaleAttributes from '@/components/LocaleAttributes'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { locales, defaultLocale } from '@/i18n/request'
import { isRTL } from '@/lib/translation'
import { inter, cairo } from '@/lib/fonts'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: {
    default: 'Xentio Digital - Premium Digital Services & Solutions',
    template: '%s | Xentio Digital'
  },
  description: 'Leading digital services provider specializing in web development, mobile apps, SEO, eCommerce, and custom software solutions.',
  keywords: ['web development', 'mobile apps', 'SEO', 'digital marketing', 'eCommerce', 'UX/UI design', 'custom software'],
  authors: [{ name: 'Xentio Digital' }],
  creator: 'Xentio Digital',
  publisher: 'Xentio Digital',
  metadataBase: new URL('https://www.xentiodigital.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.xentiodigital.com',
    siteName: 'Xentio Digital',
    title: 'Xentio Digital - Premium Digital Services & Solutions',
    description: 'Leading digital services provider specializing in web development, mobile apps, SEO, eCommerce, and custom software solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Xentio Digital - Premium Digital Services & Solutions',
    description: 'Leading digital services provider specializing in web development, mobile apps, SEO, eCommerce, and custom software solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  // Ensure locale is valid, fallback to default
  const validLocale = locales.includes(locale as any) ? locale : defaultLocale
  
  // Load messages using next-intl's getMessages
  // This automatically uses the locale from the request context set by middleware
  const messages = await getMessages()

  // Check if RTL
  const rtl = isRTL(validLocale)
  
  // Generate hreflang alternates for SEO
  // Note: For dynamic paths, this would need to be generated per page
  const alternates = locales.map((loc) => ({
    hreflang: loc,
    href: `https://www.xentiodigital.com/${loc}`,
  }))

  return (
    <>
      {/* Update html lang and dir attributes for locale */}
      <LocaleAttributes locale={validLocale} rtl={rtl} />
      {/* hreflang tags for SEO */}
      {alternates.map((alt) => (
        <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`https://www.xentiodigital.com/${defaultLocale}`} />
      <ThemeProvider>
        <NextIntlClientProvider messages={messages} locale={validLocale}>
          <TranslationProvider>
            <LanguageSwitchProvider>
              <SmoothScrollProvider>
                <Navbar />
                <main className="relative fade-in-content">
                  {children}
                </main>
                <Footer />
              </SmoothScrollProvider>
            </LanguageSwitchProvider>
          </TranslationProvider>
        </NextIntlClientProvider>
      </ThemeProvider>
    </>
  )
}
