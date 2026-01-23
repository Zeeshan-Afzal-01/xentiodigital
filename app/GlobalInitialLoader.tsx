'use client'

import { useEffect, useState } from 'react'

/**
 * Fullscreen loader shown on first paint (initial page load).
 * Hides when document has finished loading. Uses CSS-only animation (no Framer)
 * so it appears as soon as HTML is parsed.
 */
export default function GlobalInitialLoader() {
  const [show, setShow] = useState(true)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const hide = () => {
      setShow(false)
    }
    if (document.readyState === 'complete') {
      // Already loaded (e.g. HMR, client nav): hide quickly
      const t = setTimeout(hide, 100)
      return () => clearTimeout(t)
    }
    const onLoad = () => {
      // Slight delay so we don't flash on very fast loads
      setTimeout(hide, 350)
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  useEffect(() => {
    if (!show) {
      const t = setTimeout(() => setGone(true), 250)
      return () => clearTimeout(t)
    }
  }, [show])

  if (gone) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-gray-900 transition-opacity duration-200 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Xentio Digital
        </h1>
        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
          <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full animate-spin" />
          <div
            className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"
            style={{ animationDuration: '1s' }}
          />
        </div>
      </div>
    </div>
  )
}
