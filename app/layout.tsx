import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { defaultLocale } from '@/i18n/request'
import { inter, cairo } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  icons: { icon: '/favicon.png' },
}

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
        {children}
      </body>
    </html>
  )
}
