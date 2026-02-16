import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Computes horizontal scroll progress (0–100) and active index from a scrollable element.
 * Uses requestAnimationFrame to throttle updates. Guards setState to avoid updates after unmount (prevents removeChild errors).
 * Active index uses round() so gesture/swipe correctly shows the slide that is in view after snap.
 */
export function useHorizontalProgress(
  scrollerRef: React.RefObject<HTMLDivElement | null>,
  itemCount: number
) {
  const [progress, setProgress] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const rafId = useRef<number | null>(null)
  const ticking = useRef(false)
  const mounted = useRef(true)
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const update = useCallback(() => {
    if (!mounted.current) return
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll <= 0) {
      setProgress(100)
      setActiveIndex(Math.max(0, itemCount - 1))
      return
    }
    const pct = (scrollLeft / maxScroll) * 100
    setProgress(pct)
    // Use round so the active slide updates correctly when user swipes (e.g. slide 2 shows after R→L gesture)
    const index = Math.min(
      Math.max(0, Math.round((scrollLeft / maxScroll) * (itemCount - 1))),
      itemCount - 1
    )
    setActiveIndex(index)
  }, [scrollerRef, itemCount])

  const onScroll = useCallback(() => {
    if (ticking.current || !mounted.current) return
    ticking.current = true
    rafId.current = requestAnimationFrame(() => {
      if (!mounted.current) {
        ticking.current = false
        return
      }
      update()
      ticking.current = false
    })
    // After gesture ends, scroll may snap; run update again so activeIndex matches snapped position
    if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current)
    scrollEndTimer.current = setTimeout(() => {
      scrollEndTimer.current = null
      update()
    }, 150)
  }, [update])

  useEffect(() => {
    mounted.current = true
    const el = scrollerRef.current
    if (!el) return () => { mounted.current = false }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    if ('onscrollend' in window) {
      el.addEventListener('scrollend', update as EventListener, { passive: true })
    }
    const resizeObserver = new ResizeObserver(onScroll)
    resizeObserver.observe(el)
    return () => {
      mounted.current = false
      el.removeEventListener('scroll', onScroll)
      if ('onscrollend' in window) {
        el.removeEventListener('scrollend', update as EventListener)
      }
      if (scrollEndTimer.current) {
        clearTimeout(scrollEndTimer.current)
        scrollEndTimer.current = null
      }
      resizeObserver.disconnect()
      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [scrollerRef, onScroll, update])

  return { progress, activeIndex }
}
