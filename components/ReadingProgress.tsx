'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // PERF: throttle scroll work to animation frames and use passive listeners.
    let rafId = 0

    const compute = () => {
      rafId = 0
      const windowHeight = window.innerHeight || 0
      const documentHeight = document.documentElement.scrollHeight || 0
      const scrollTop = window.scrollY || 0
      const scrollableHeight = Math.max(1, documentHeight - windowHeight)
      const scrolled = scrollTop / scrollableHeight
      setProgress(Math.min(Math.max(scrolled, 0), 1) * 100)
    }

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll as any)
      window.removeEventListener('resize', onScroll as any)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Don't render at all if progress is 0 to avoid any interference
  if (progress === 0) {
    return null
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-surface/50 z-50 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 transition-[width] duration-100 ease-linear will-change-[width]"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  )
}
