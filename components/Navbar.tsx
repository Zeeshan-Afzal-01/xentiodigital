'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import ServicesDropdown from './ServicesDropdown'
import ServicesMobileMenu from './ServicesMobileMenu'
import { isRTL } from '@/lib/translation'
import { getSlideAnimation } from '@/lib/animation-rtl'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const servicesDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const t = useTranslations('nav')
  const locale = useLocale()
  const rtl = isRTL(locale)

  useEffect(() => {
    // PERF: throttle scroll state updates (Navbar is global).
    let rafId = 0
    const update = () => {
      rafId = 0
      setScrolled(window.scrollY > 20)
    }
    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll as any)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (servicesDropdownTimeoutRef.current) {
        clearTimeout(servicesDropdownTimeoutRef.current)
      }
    }
  }, [])

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-premium border-b' : 'bg-transparent'
      }`}
      style={{ borderColor: scrolled ? 'var(--border-default)' : 'transparent' }}
    >
      <div className="container-custom" style={{ overflow: 'visible', position: 'relative' }}>
        <div className="flex justify-between items-center h-20">
          <Link 
            href={`/${locale}`} 
            className="flex items-center gap-2 group min-w-0 flex-shrink-0"
          >
            <span className="text-2xl font-bold gradient-text whitespace-nowrap transition-transform duration-200 group-hover:scale-[1.03]">
              Xentio Digital
            </span>
          </Link>

          {/* Desktop Menu - Flexible Layout */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end min-w-0" style={{ overflow: 'visible' }}>
            <nav className="flex items-center gap-6 flex-wrap min-w-0" style={{ overflow: 'visible' }}>
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-enhanced hover:text-high-contrast transition-colors font-medium animated-underline text-sm whitespace-nowrap flex-shrink-0"
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Services with Multi-level Dropdown */}
              <div
                className="relative group flex-shrink-0"
                style={{ overflow: 'visible', zIndex: servicesDropdownOpen ? 60 : 'auto' }}
                onMouseEnter={() => {
                  // Clear any pending close
                  if (servicesDropdownTimeoutRef.current) {
                    clearTimeout(servicesDropdownTimeoutRef.current)
                    servicesDropdownTimeoutRef.current = null
                  }
                  setServicesDropdownOpen(true)
                }}
                onMouseLeave={() => {
                  // Delay closing to allow moving to dropdown
                  servicesDropdownTimeoutRef.current = setTimeout(() => {
                    setServicesDropdownOpen(false)
                  }, 300)
                }}
              >
                <Link
                  href={`/${locale}/services`}
                  className={`text-muted-enhanced hover:text-high-contrast transition-colors font-medium animated-underline text-sm whitespace-nowrap ${
                    servicesDropdownOpen ? 'text-high-contrast' : ''
                  }`}
                  aria-haspopup="true"
                  aria-expanded={servicesDropdownOpen}
                >
                  {t('services')}
                </Link>
                <AnimatePresence>
                  {servicesDropdownOpen && (
                    <div
                      onMouseEnter={() => {
                        // Keep open when hovering dropdown
                        if (servicesDropdownTimeoutRef.current) {
                          clearTimeout(servicesDropdownTimeoutRef.current)
                          servicesDropdownTimeoutRef.current = null
                        }
                      }}
                      onMouseLeave={() => {
                        setServicesDropdownOpen(false)
                      }}
                    >
                      <ServicesDropdown onClose={() => setServicesDropdownOpen(false)} />
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-enhanced hover:text-high-contrast transition-colors font-medium animated-underline text-sm whitespace-nowrap flex-shrink-0"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className={`flex items-center gap-4 ${rtl ? 'mr-4 pr-4 border-r' : 'ml-4 pl-4 border-l'} flex-shrink-0`}
              style={{
                borderColor: 'var(--border-default)',
              }}
            >
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
            <div className="flex-shrink-0 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]">
              <Link 
                href={`/${locale}/contact`} 
                className="btn-primary text-sm whitespace-nowrap"
              >
                {t('getStarted') || 'Get Started'}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className={`lg:hidden flex items-center gap-3 flex-shrink-0 ${rtl ? 'flex-row-reverse' : ''}`}>
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="p-2 rounded-lg text-muted-enhanced hover:text-high-contrast transition-colors"
              style={{
                '--hover-bg': 'var(--bg-surface)',
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                className={`h-6 w-6 ${rtl ? 'scale-x-[-1]' : ''}`}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </motion.svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - RTL Safe */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...getSlideAnimation(locale, 20)}
              className="lg:hidden py-4 border-t overflow-hidden"
              style={{
                borderColor: 'var(--border-default)',
              }}
            >
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-muted-enhanced hover:text-high-contrast transition-colors text-start"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Services Mobile Menu */}
              <div className="py-2">
                <Link
                  href={`/${locale}/services`}
                  className="block py-2 text-muted-enhanced hover:text-high-contrast transition-colors text-start font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t('services')}
                </Link>
                <ServicesMobileMenu onClose={() => setIsOpen(false)} />
              </div>

              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-muted-enhanced hover:text-high-contrast transition-colors text-start"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className="mt-4"
              >
                <Link
                  href={`/${locale}/contact`}
                  className="btn-primary block text-center w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {t('getStarted') || 'Get Started'}
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
