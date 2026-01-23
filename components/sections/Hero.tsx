'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
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
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Gradient Background - Theme-aware */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--hero-gradient)' }}
      />

      {/* Floating Shapes - Theme-aware opacity */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-shape" style={{ 
          backgroundColor: 'rgba(109, 40, 217, 0.15)',
        }} />
        <div className="floating-shape" style={{ 
          animationDelay: '-5s',
          backgroundColor: 'rgba(8, 145, 178, 0.15)',
        }} />
        <div className="floating-shape" style={{ 
          animationDelay: '-10s',
          backgroundColor: 'rgba(22, 163, 74, 0.1)',
        }} />
      </div>

      {/* Animated Grid Pattern - Only in dark mode */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 hidden dark:block">
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
            className="text-fluid-5xl font-bold mb-6 leading-tight text-container"
          >
            <span className="gradient-text">{t('title')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-responsive-lg text-muted-enhanced mb-12 max-w-2xl mx-auto leading-relaxed text-container"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="magnetic flex-shrink-0"
            >
              <Link href={`/${locale}/contact`} className="btn-primary text-lg glow-purple whitespace-nowrap">
                {t('cta')}
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="magnetic flex-shrink-0"
            >
              <Link href={`/${locale}/portfolio`} className="btn-secondary text-lg whitespace-nowrap">
                {t('ctaSecondary')}
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Gradient Orbs - Reduced opacity in light mode */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
        style={{
          backgroundColor: 'rgba(109, 40, 217, 0.08)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-slow"
        style={{ 
          animationDelay: '1s',
          backgroundColor: 'rgba(8, 145, 178, 0.08)',
        }}
      />
    </section>
  )
}
