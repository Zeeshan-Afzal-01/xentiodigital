'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import ServicesMobileMenu from './ServicesMobileMenu'
import { isRTL } from '@/lib/translation'
import { getSlideAnimation } from '@/lib/animation-rtl'

const SITE_LOGO_TEXT = 'XENTIO DIGITAL'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations('nav')
  const locale = useLocale()
  const rtl = isRTL(locale)

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/portfolio`, label: t('portfolio') },
    { href: `/${locale}/testimonials`, label: t('testimonials') },
    { href: `/${locale}/team`, label: t('team') },
    { href: `/${locale}/careers`, label: t('careers') },
    { href: `/${locale}/contact`, label: t('contact') },
    { href: `/${locale}/blog`, label: t('blog') },
  ]

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className="site-header site-header--transparent fixed top-0 left-0 right-0 w-full z-[99] transition-all duration-300"
      role="banner"
      data-sticky="sticky"
    >
      <div className="site-header__main">
        <div className={`site-header__row container-fluid flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-8 ${rtl ? 'flex-row-reverse' : ''}`}>
          <div className="site-header__col -left flex items-center">
            <Link href={`/${locale}`} className="site-header__logo flex items-center" aria-label="Home">
              <span className="text-white font-bold text-lg md:text-xl tracking-tight whitespace-nowrap">
                {SITE_LOGO_TEXT}
              </span>
            </Link>
          </div>

          <div className={`site-header__col -right flex items-center gap-3 md:gap-4 ${rtl ? 'flex-row-reverse' : ''}`}>
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              href={`/${locale}/contact`}
              className="c-btn -primary-v1 -opacity hidden sm:inline-flex items-center justify-center rounded-sm border border-white bg-white/10 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.12em] text-white hover:bg-white hover:text-[#1e1b4b] transition-colors"
            >
              {t('requestAQuote')}
            </Link>
            <button
              type="button"
              className="nav-main__btn flex items-center justify-center w-10 h-10 rounded text-white hover:opacity-80 transition-opacity"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t('menu')}
              aria-expanded={isOpen}
            >
              <span className="sr-only">{t('menu')}</span>
              {!isOpen ? (
                <div className="burger-icon flex flex-col gap-1.5">
                  <span className="burger-line block w-6 h-0.5 bg-current rounded" />
                  <span className="burger-line block w-6 h-0.5 bg-current rounded" />
                  <span className="burger-line block w-6 h-0.5 bg-current rounded" />
                </div>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0f0a23]/98 backdrop-blur-lg pt-20 pb-12 px-6 overflow-y-auto"
            aria-modal
            role="dialog"
            aria-label={t('menu')}
          >
            <div className="container-custom max-w-2xl">
              <motion.div {...getSlideAnimation(locale, 16)} className="flex flex-col gap-2">
                {navLinks.slice(0, 2).map((link) => (
                  <Link key={link.href} href={link.href} className="block py-3 text-white text-lg font-medium hover:opacity-80" onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="py-3">
                  <Link href={`/${locale}/services`} className="block text-white text-lg font-medium hover:opacity-80" onClick={() => setIsOpen(false)}>
                    {t('services')}
                  </Link>
                  <ServicesMobileMenu onClose={() => setIsOpen(false)} />
                </div>
                {navLinks.slice(2).map((link) => (
                  <Link key={link.href} href={link.href} className="block py-3 text-white text-lg font-medium hover:opacity-80" onClick={() => setIsOpen(false)}>
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <Link href={`/${locale}/contact`} className="c-btn -primary-v1 -opacity inline-flex items-center justify-center rounded-sm border border-white bg-white/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white hover:bg-white hover:text-[#1e1b4b]" onClick={() => setIsOpen(false)}>
                    {t('requestAQuote')}
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
