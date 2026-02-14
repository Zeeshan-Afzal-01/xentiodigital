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

const DESIGNRUSH_LOGO = 'https://www.digitalsilk.com/wp-content/uploads/2022/08/industry-left-logo-left-side.png'
const FORBES_LOGO = 'https://www.digitalsilk.com/wp-content/uploads/2025/04/Forbes_logo.svg'

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
          >
            <Link href={`/${locale}/contact`} className="c-btn -slideover" style={{ marginTop: '1.5rem' }}>
              <span>
                <span>{t('cta')}</span>
                <span className="c-btn__ico">
                  <svg className="w-5 h-5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </span>
            </Link>
          </motion.div>

          <div className="row hero__cert-list -all-devices">
            <motion.div
              className="hero__cert"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.28 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={DESIGNRUSH_LOGO}
                alt="DesignRush"
                width={39}
                height={54}
                decoding="async"
                loading="lazy"
              />
              <div className="hero__cert-cont">
                <p>{t('designRushReviews')}</p>
                <span className="flex gap-0.5" aria-hidden>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </span>
              </div>
            </motion.div>
            <motion.div
              className="hero__cert"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...fadeUp.transition, delay: 0.28 }}
            >
              <p>{t('bestAgency2024')}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={FORBES_LOGO}
                alt="Forbes"
                width={112}
                height={30}
                decoding="async"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
