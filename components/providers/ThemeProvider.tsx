'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      // PERF: avoid CSS transition jank when theme class toggles
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  )
}
