'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ScrollingImages from '@/components/ScrollingImages'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
}

const HERO_BG =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=82&fit=crop'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.35], [1.12, 1])
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 24])

  return (
    <section
      ref={sectionRef}
      className="hero home-hero m-banner relative min-h-screen overflow-hidden bg-[#00042a] dark"
    >
      <motion.div
        className="hero-bg_animated"
        style={{ scale, y }}
        aria-hidden="true"
      >
        <motion.img
          src={HERO_BG}
          alt=""
          className="hero-bg_animated__img"
          loading="eager"
          decoding="async"
          suppressHydrationWarning
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </motion.div>

      <div className="m-banner__content">
        <ScrollingImages />

        <div className="container">
          <div className="c-heading -h1">
            {t('preHeading') ? (
              <div className="c-heading__pre">
                <motion.span
                  className="hero-pre-label"
                  initial={fadeUp.initial}
                  animate={fadeUp.animate}
                  transition={fadeUp.transition}
                >
                  {t('preHeading')}
                </motion.span>
              </div>
            ) : null}
            <h1 className="c-heading__title">
              <motion.span
                className="text-shadow-white block"
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={{ ...fadeUp.transition, delay: 0.06 }}
              >
                {t('heading')}
              </motion.span>
            </h1>
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
            {t('ctaSecondary') ? (
              <Link
                href={`/${locale}/portfolio`}
                className="c-btn -primary-v1 -opacity inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-xs md:text-sm font-medium uppercase tracking-[0.1em] transition-colors border border-white bg-white/10 text-white hover:bg-white hover:text-[#1e1b4b]"
              >
                {t('ctaSecondary')}
              </Link>
            ) : null}
          </motion.div>

          <motion.p
            className="hero__trust-line text-xs md:text-sm mt-6 max-w-2xl leading-relaxed text-white/85"
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
