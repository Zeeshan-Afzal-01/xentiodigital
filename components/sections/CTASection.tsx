'use client'

import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CTASection() {
  const locale = useLocale()
  const t = useTranslations('cta')

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
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
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-accent-600/20" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
        >
          <motion.h2
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
            className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent"
          >
            {t('title')}
          </motion.h2>
          <p className="text-xl md:text-2xl mb-12 text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link href={`/${locale}/contact`} className="btn-primary text-lg px-12 py-6 glow-purple">
                {t('button')}
              </Link>
            </motion.div>
            {t('buttonSecondary') && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                <Link
                  href={`/${locale}/contact`}
                  className="btn-secondary text-lg px-12 py-6 inline-block"
                >
                  {t('buttonSecondary')}
                </Link>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
