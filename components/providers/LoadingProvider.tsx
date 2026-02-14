'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface LoadingContextType {
  setLoading: (loading: boolean, message?: string) => void
  isLoading: boolean
  loadingMessage: string | undefined
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>(undefined)

  const setLoading = useCallback((loading: boolean, message?: string) => {
    setIsLoading(loading)
    setLoadingMessage(message)
  }, [])

  return (
    <LoadingContext.Provider value={{ setLoading, isLoading, loadingMessage }}>
      {children}
    </LoadingContext.Provider>
  )
}
