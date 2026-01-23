'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'

interface BlogCTAProps {
  variant?: 'primary' | 'secondary' | 'inline'
  title?: string
  description?: string
  ctaText?: string
  ctaLink?: string
  className?: string
}

export default function BlogCTA({
  variant = 'primary',
  title = 'Ready to Transform Your Business?',
  description = 'Let\'s discuss how we can help you achieve similar results. Get in touch today for a free consultation.',
  ctaText = 'Get Started',
  ctaLink = '/contact',
  className = '',
}: BlogCTAProps) {
  const locale = useLocale()

  if (variant === 'inline') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`blog-cta-inline my-12 p-6 rounded-xl glass-premium border ${className}`}
        style={{
          borderColor: 'var(--border-default)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-high-contrast mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted-enhanced">
              {description}
            </p>
          </div>
          <Link
            href={`/${locale}${ctaLink}`}
            className="btn-primary whitespace-nowrap"
          >
            {ctaText}
          </Link>
        </div>
      </motion.div>
    )
  }

  if (variant === 'secondary') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`blog-cta-secondary my-16 p-8 md:p-12 rounded-2xl glass-premium border text-center ${className}`}
        style={{
          borderColor: 'var(--border-default)',
        }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-high-contrast mb-4">
          {title}
        </h3>
        <p className="text-lg text-muted-enhanced mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${locale}${ctaLink}`} className="btn-primary text-lg px-8 py-4">
              {ctaText}
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/${locale}/services`} className="btn-secondary text-lg px-8 py-4">
              View Our Services
            </Link>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  // Primary variant (full-width with gradient)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`blog-cta-primary relative my-16 p-8 md:p-12 rounded-3xl overflow-hidden ${className}`}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.4) 0%, transparent 50%)',
          backgroundSize: '200% 200%',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 via-secondary-600/30 to-accent-600/30" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <motion.h3
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundImage:
              'linear-gradient(135deg, #7C3AED 0%, #A855F7 25%, #06B6D4 50%, #22D3EE 75%, #22C55E 100%)',
            backgroundSize: '200% 200%',
          }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent"
        >
          {title}
        </motion.h3>
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(124, 58, 237, 0.5)',
                '0 0 40px rgba(124, 58, 237, 0.8)',
                '0 0 20px rgba(124, 58, 237, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Link
              href={`/${locale}${ctaLink}`}
              className="inline-block bg-white text-primary-600 font-semibold text-lg px-10 py-5 rounded-xl hover:bg-gray-100 transition-colors shadow-xl"
            >
              {ctaText}
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={`/${locale}/portfolio`}
              className="inline-block bg-white/10 backdrop-blur-sm text-white font-semibold text-lg px-10 py-5 rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
            >
              View Case Studies
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
