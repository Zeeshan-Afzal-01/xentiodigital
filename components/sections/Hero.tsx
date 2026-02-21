'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ScrollingImages from '@/components/ScrollingImages'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
}

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  return (
    <section className="hero home-hero m-banner relative min-h-screen overflow-hidden bg-[#00042a]">
      <div className="m-banner__content">
        {/* Scrolling image columns + gradient (ScrollingImages renders hero-bg_wrap) */}
        <ScrollingImages />

        {/* Content: container > c-heading, CTA, cert-list */}
        <div className="container">
          <div className="c-heading -h1">
            <div className="c-heading__pre">
              <motion.h1
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={fadeUp.transition}
              >
                {t('heading')}
              </motion.h1>
            </div>
            <div className="c-heading__title">
              <motion.p
                className="text-shadow-white"
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={{ ...fadeUp.transition, delay: 0.06 }}
              >
                {t('mainTitleLine1')} {t('mainTitleLine2')}
              </motion.p>
            </div>
            <div className="c-heading__sub">
              <motion.span
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={{ ...fadeUp.transition, delay: 0.12 }}
              >
                {t('subtitle')}
              </motion.span>
            </div>
          </div>

          <motion.div
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="flex flex-wrap gap-4 mt-6"
          >
            <Link href={`/${locale}/contact`} className="c-btn -slideover">
              <span>
                <span>{t('cta')}</span>
                <span className="c-btn__ico">
                  <svg className="w-5 h-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </span>
            </Link>
            <Link
              href={`/${locale}/portfolio`}
              className="c-btn -primary-v1 -opacity inline-flex items-center justify-center rounded-sm border border-white bg-white/10 px-5 py-2.5 text-xs md:text-sm font-medium uppercase tracking-[0.1em] text-white hover:bg-white hover:text-[#1e1b4b] transition-colors"
            >
              {t('ctaSecondary')}
            </Link>
          </motion.div>

          <motion.p
            className="hero__trust-line text-xs md:text-sm text-white/85 mt-6 max-w-2xl leading-relaxed"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...fadeUp.transition, delay: 0.28 }}
          >
            {t('trustLine')}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
