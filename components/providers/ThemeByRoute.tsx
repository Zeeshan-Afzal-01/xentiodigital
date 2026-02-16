'use client'

import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

/**
 * Home screen → default light.
 * Other pages → default dark.
 * Syncs theme with route on navigation.
 */
export function ThemeByRoute() {
  const pathname = usePathname()
  const { setTheme } = useTheme()

  useEffect(() => {
    const segments = pathname?.split('/').filter(Boolean) ?? []
    // Home: only locale segment (e.g. /en, /fr) or empty path
    const isHome = segments.length <= 1
    setTheme(isHome ? 'light' : 'dark')
  }, [pathname, setTheme])

  return null
}
