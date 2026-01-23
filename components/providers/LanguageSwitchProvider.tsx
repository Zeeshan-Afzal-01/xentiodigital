'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

interface LanguageSwitchContextType {
  isSwitching: boolean
  previousLocale: string | null
}

const LanguageSwitchContext = createContext<LanguageSwitchContextType>({
  isSwitching: false,
  previousLocale: null,
})

export function useLanguageSwitch() {
  return useContext(LanguageSwitchContext)
}

export function LanguageSwitchProvider({ children }: { children: ReactNode }) {
  const locale = useLocale()
  const pathname = usePathname()
  const [isSwitching, setIsSwitching] = useState(false)
  const [previousLocale, setPreviousLocale] = useState<string | null>(null)

  useEffect(() => {
    // Detect language change
    const currentLocale = pathname.split('/')[1]
    
    if (previousLocale && previousLocale !== currentLocale) {
      setIsSwitching(true)
      
      // Lock layout during transition
      document.body.style.overflow = 'hidden'
      document.body.style.pointerEvents = 'none'
      
      // Re-enable after transition
      setTimeout(() => {
        setIsSwitching(false)
        document.body.style.overflow = ''
        document.body.style.pointerEvents = ''
      }, 400) // Match fade transition duration
    }
    
    setPreviousLocale(currentLocale)
  }, [pathname, previousLocale])

  return (
    <LanguageSwitchContext.Provider value={{ isSwitching, previousLocale }}>
      <div className={isSwitching ? 'language-switching' : ''}>
        {children}
      </div>
    </LanguageSwitchContext.Provider>
  )
}
