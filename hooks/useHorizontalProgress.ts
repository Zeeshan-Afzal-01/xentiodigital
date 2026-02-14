import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Computes horizontal scroll progress (0–100) and active index from a scrollable element.
 * Uses requestAnimationFrame to throttle updates. Guards setState to avoid updates after unmount (prevents removeChild errors).
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
    const index = Math.min(
      Math.floor((scrollLeft / maxScroll) * itemCount),
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
  }, [update])

  useEffect(() => {
    mounted.current = true
    const el = scrollerRef.current
    if (!el) return () => { mounted.current = false }
    update()
    el.addEventListener('scroll', onScroll, { passive: true })
    const resizeObserver = new ResizeObserver(onScroll)
    resizeObserver.observe(el)
    return () => {
      mounted.current = false
      el.removeEventListener('scroll', onScroll)
      resizeObserver.disconnect()
      if (rafId.current != null) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [scrollerRef, onScroll, update])

  return { progress, activeIndex }
}
