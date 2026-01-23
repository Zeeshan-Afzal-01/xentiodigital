import { ReactNode } from 'react'
import { defaultLocale } from '@/i18n/request'
import { inter, cairo } from '@/lib/fonts'
import GlobalInitialLoader from '@/app/GlobalInitialLoader'
import './globals.css'

// Root layout - must have <html> and <body> tags
// Locale-specific attributes are set by the [locale] layout via client-side script
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html 
      lang={defaultLocale}
      dir="ltr"
      suppressHydrationWarning
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body 
        className={inter.className}
        style={{
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <GlobalInitialLoader />
        {children}
      </body>
    </html>
  )
}
