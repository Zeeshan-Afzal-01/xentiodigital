'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'
import { ThemeByRoute } from './ThemeByRoute'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      // PERF: avoid CSS transition jank when theme class toggles
      disableTransitionOnChange={false}
    >
      <ThemeByRoute />
      {children}
    </NextThemesProvider>
  )
}
