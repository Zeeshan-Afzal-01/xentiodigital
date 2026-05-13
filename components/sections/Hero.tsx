'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTheme } from 'next-themes'
import ScrollingImages from '@/components/ScrollingImages'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 0.61, 0.36, 1] },
}

/** Dark mode hero background image */
const HERO_BG_DARK =
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=82&fit=crop'

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const { resolvedTheme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const isDark = resolvedTheme !== 'light' // default dark until theme resolves
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.35], [1.12, 1])
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 24])

  return (
    <section
      ref={sectionRef}
      className={`hero home-hero m-banner relative min-h-screen overflow-hidden ${isDark ? 'bg-[#00042a]' : 'bg-white'}`}
    >
      {/* Dark mode: animated photo background */}
      {isDark && (
        <motion.div
          className="hero-bg_animated"
          style={{ scale, y }}
          aria-hidden="true"
        >
          <motion.img
            src={HERO_BG_DARK}
            alt=""
            className="hero-bg_animated__img"
            fetchPriority="high"
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
          />
        </motion.div>
      )}

      {/* Light mode: custom Tailwind gradient background */}
      {!isDark && (
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-violet-50/80 to-sky-50/70" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#6D28D9 1px, transparent 1px), linear-gradient(90deg, #6D28D9 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div className="absolute -top-20 right-0 w-[650px] h-[650px] rounded-full bg-primary-500/10 blur-[130px]" />
          <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-secondary-500/10 blur-[110px]" />
          <div className="absolute -top-10 -left-10 w-[380px] h-[380px] rounded-full bg-violet-400/10 blur-[100px]" />
        </div>
      )}
      <div className="m-banner__content">
        {/* Scrolling image columns + gradient (ScrollingImages renders hero-bg_wrap) */}
        <ScrollingImages />

        {/* Content: container > c-heading, CTA, cert-list */}
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
                className={`c-btn -primary-v1 -opacity inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-xs md:text-sm font-medium uppercase tracking-[0.1em] transition-colors ${
                  isDark
                    ? 'border border-white bg-white/10 text-white hover:bg-white hover:text-[#1e1b4b]'
                    : 'border border-primary-600 bg-primary-600/10 text-primary-700 hover:bg-primary-600 hover:text-white'
                }`}
              >
                {t('ctaSecondary')}
              </Link>
            ) : null}
          </motion.div>

          <motion.p
            className={`hero__trust-line text-xs md:text-sm mt-6 max-w-2xl leading-relaxed ${isDark ? 'text-white/85' : 'text-slate-500'}`}
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
