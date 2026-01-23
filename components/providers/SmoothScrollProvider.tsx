'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // PERF: Lenis can cause jank on mobile/low-power devices.
    // We enable it only on desktop, only after hydration, and disable if user prefers reduced motion.
    const isAdmin = window.location.pathname.startsWith('/admin')
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    const isCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false
    const isNarrowScreen = window.matchMedia?.('(max-width: 1023px)')?.matches ?? false

    const shouldEnable = !isAdmin && !prefersReducedMotion && !isCoarsePointer && !isNarrowScreen

    if (!shouldEnable) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.debug('[Lenis] disabled', { isAdmin, prefersReducedMotion, isCoarsePointer, isNarrowScreen })
      }
      return
    }

    let lenis: Lenis | null = null
    let rafId = 0
    let destroyed = false

    const start = () => {
      if (destroyed) return

      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
        infinite: false,
      })

      const raf = (time: number) => {
        if (destroyed || !lenis) return
        lenis.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)

      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.debug('[Lenis] enabled')
      }
    }

    // Start after hydration/idle to avoid blocking TTI
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined

    const idleId = ric ? ric(start, { timeout: 1200 }) : window.setTimeout(start, 250)

    return () => {
      destroyed = true
      if (ric) {
        ;(window as any).cancelIdleCallback?.(idleId)
      } else {
        window.clearTimeout(idleId)
      }
      if (rafId) cancelAnimationFrame(rafId)
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
