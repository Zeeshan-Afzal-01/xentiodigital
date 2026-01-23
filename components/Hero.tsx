'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface HeroProps {
  title: string
  subtitle: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
}

export default function Hero({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '/contact',
  secondaryCtaText,
  secondaryCtaLink,
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const createFloatingShape = () => {
      if (!containerRef.current) return

      const shapes = containerRef.current.querySelectorAll('.floating-shape')
      shapes.forEach((shape) => {
        const element = shape as HTMLElement
        const randomX = Math.random() * 100
        const randomY = Math.random() * 100
        const randomSize = 200 + Math.random() * 300
        const randomDuration = 15 + Math.random() * 10

        element.style.left = `${randomX}%`
        element.style.top = `${randomY}%`
        element.style.width = `${randomSize}px`
        element.style.height = `${randomSize}px`
        element.style.animationDuration = `${randomDuration}s`
      })
    }

    createFloatingShape()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-background to-secondary-900/20" />
      
      {/* Floating Shapes */}
      <div ref={containerRef} className="absolute inset-0 overflow-hidden">
        <div className="floating-shape bg-primary-500/30" />
        <div className="floating-shape bg-secondary-500/30" style={{ animationDelay: '-5s' }} />
        <div className="floating-shape bg-accent-500/20" style={{ animationDelay: '-10s' }} />
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">{title}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-enhanced mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="magnetic"
            >
              <Link href={ctaLink} className="btn-primary text-lg px-10 py-5">
                {ctaText}
              </Link>
            </motion.div>
            {secondaryCtaText && secondaryCtaLink && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="magnetic"
              >
                <Link href={secondaryCtaLink} className="btn-secondary text-lg px-10 py-5">
                  {secondaryCtaText}
                </Link>
              </motion.div>
            )}
          </motion.div>

        </div>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
    </section>
  )
}
