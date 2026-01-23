'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { LoadingProvider } from '@/components/providers/LoadingProvider'

export default function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LoadingProvider>
        <Toaster position="top-right" />
        {children}
      </LoadingProvider>
    </ThemeProvider>
  )
}

