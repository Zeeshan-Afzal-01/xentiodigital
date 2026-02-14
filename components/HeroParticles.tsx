'use client'

import { useEffect, useRef } from 'react'

/**
 * Lightweight glowing particles for the hero section only.
 * Small count, subtle glow, respects reduced motion.
 */
export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (prefersReducedMotion) return

    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    const viewport = { w: 0, h: 0 }

    const setSize = () => {
      viewport.w = canvas.parentElement?.clientWidth ?? window.innerWidth
      viewport.h = canvas.parentElement?.clientHeight ?? window.innerHeight
      canvas.width = Math.floor(viewport.w * dpr)
      canvas.height = Math.floor(viewport.h * dpr)
      canvas.style.width = `${viewport.w}px`
      canvas.style.height = `${viewport.h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setSize()
    const ro = new ResizeObserver(setSize)
    ro.observe(canvas.parentElement ?? document.body)

    const count = 25
    const particles: Array<{ x: number; y: number; r: number; opacity: number; speed: number }> = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * viewport.w,
        y: Math.random() * viewport.h,
        r: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.4 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
      })
    }

    let frameId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, viewport.w, viewport.h)

      particles.forEach((p) => {
        const y = (p.y - p.speed * 30) % (viewport.h + 20)
        p.y = y < -10 ? viewport.h + 10 : y

        const glow = 0.2 + 0.15 * Math.sin(time + p.x * 0.01)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${glow * p.opacity})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(196, 181, 253, ${p.opacity})`
        ctx.fill()
      })

      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    />
  )
}
