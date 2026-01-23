'use client'

import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    if (prefersReducedMotion) {
      return
    }

    // PERF: reduce work on mobile/coarse pointer devices.
    const isCoarsePointer = window.matchMedia?.('(pointer: coarse)')?.matches ?? false
    const isNarrowScreen = window.matchMedia?.('(max-width: 768px)')?.matches ?? false
    const lowPowerMode = isCoarsePointer || isNarrowScreen

    // Cap DPR to reduce GPU/CPU load
    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    const viewport = { w: 0, h: 0 }

    const setCanvasSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      viewport.w = w
      viewport.h = h
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize, { passive: true })

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
    }> = []

    const colors = [
      'rgba(124, 58, 237, 0.6)',
      'rgba(6, 182, 212, 0.6)',
      'rgba(34, 197, 94, 0.6)',
      'rgba(168, 85, 247, 0.4)',
    ]

    // Create particles
    const particleCount = lowPowerMode ? 20 : 40
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * viewport.w,
        y: Math.random() * viewport.h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    let animationFrameId: number
    let lastFrameTime = 0
    const frameInterval = lowPowerMode ? 1000 / 24 : 1000 / 40 // ~24fps mobile, ~40fps desktop
    let isRunning = true

    const animate = (time: number) => {
      if (!isRunning) return
      if (time - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = time

      ctx.clearRect(0, 0, viewport.w, viewport.h)

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around edges
        if (particle.x < 0) particle.x = viewport.w
        if (particle.x > viewport.w) particle.x = 0
        if (particle.y < 0) particle.y = viewport.h
        if (particle.y > viewport.h) particle.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw connections (optimized):
        // - Disable on low power
        // - Limit checks to a small window to avoid O(n^2)
        if (!lowPowerMode) {
          const maxLinks = 8
          const maxDistance = 140
          for (let j = i + 1; j < Math.min(particles.length, i + 1 + maxLinks); j++) {
            const otherParticle = particles[j]
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distanceSq = dx * dx + dy * dy
            if (distanceSq < maxDistance * maxDistance) {
              const distance = Math.sqrt(distanceSq)
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(124, 58, 237, ${0.18 * (1 - distance / maxDistance)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const onVisibilityChange = () => {
      isRunning = !document.hidden
      if (isRunning) {
        lastFrameTime = 0
        animationFrameId = requestAnimationFrame(animate)
      } else {
        cancelAnimationFrame(animationFrameId)
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
