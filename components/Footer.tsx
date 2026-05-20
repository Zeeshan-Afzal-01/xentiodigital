'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { isRTL } from '@/lib/translation'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const t = useTranslations('footer')
  const locale = useLocale()
  const rtl = isRTL(locale)

  const footerLinks = {
    services: [
      { href: `/${locale}/services/seo`, label: t('seo') },
      { href: `/${locale}/services/google-ads`, label: t('googleAds') },
      { href: `/${locale}/services/meta-ads`, label: t('metaAds') },
      { href: `/${locale}/services/tiktok-ads`, label: t('tiktokAds') },
      { href: `/${locale}/services/web-development`, label: t('webDevelopment') },
    ],
    company: [
      { href: `/${locale}/about`, label: t('aboutUs') },
      { href: `/${locale}/portfolio`, label: t('portfolio') },
      { href: `/${locale}/testimonials`, label: t('testimonials') },
      { href: `/${locale}/team`, label: t('team') },
      { href: `/${locale}/careers`, label: t('careers') },
      { href: `/${locale}/contact`, label: t('contact') },
    ],
    legal: [
      { href: `/${locale}/privacy-policy`, label: t('privacyPolicy') },
      { href: `/${locale}/terms-of-service`, label: t('termsOfService') },
    ],
  }

  const socialLinks = [
    {
      href: 'https://www.facebook.com/xentiodigital/',
      label: 'Facebook',
      path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
    },
    {
      href: 'https://www.instagram.com/xentiodigital/',
      label: 'Instagram',
      path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
      href: 'https://www.linkedin.com/company/xentio-digital/',
      label: 'LinkedIn',
      path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    },
  ]

  return (
    <footer className="relative border-t" style={{ 
      background: 'var(--bg-secondary)',
      borderColor: 'var(--border-default)',
    }}>
      <div className="absolute inset-0 opacity-30" style={{
        background: 'linear-gradient(to right, rgba(109, 40, 217, 0.05) 0%, transparent 50%, rgba(8, 145, 178, 0.05) 100%)',
      }} />

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center place-items-center">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icon.svg"
                alt="Xentio Digital"
                className="h-10 w-auto object-contain"
              />
              <h3 className="text-2xl font-bold gradient-text">Xentio Digital</h3>
            </div>
            <p className="text-muted-enhanced mb-6 leading-relaxed">
              {t('tagline')}
            </p>
            <div className={`flex gap-4 flex-wrap justify-center ${rtl ? 'flex-row-reverse' : ''}`}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center text-muted-enhanced hover:text-high-contrast hover:bg-primary-500/20 transition-all group flex-shrink-0"
                  aria-label={social.label}
                >
                  <svg className="w-5 h-5 group-hover:glow-purple" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <h4 className="text-high-contrast font-semibold mb-4">{t('services')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-enhanced hover:text-high-contrast hover:gradient-text transition-all animated-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <h4 className="text-high-contrast font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-enhanced hover:text-high-contrast hover:gradient-text transition-all animated-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <h4 className="text-high-contrast font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-3 text-muted-enhanced">
              <li>
                <a
                  href="mailto:info@xentiodigital.com"
                  className="hover:text-high-contrast transition-colors"
                >
                  info@xentiodigital.com
                </a>
              </li>
              <li>
                <a href="tel:+923219486293" className="hover:text-high-contrast transition-colors">
                  +92 321 9486293
                </a>
              </li>
              <li>
                124, Broadway Commercial, Park View City, Lahore, Pakistan.
              </li>
              <li className="pt-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={`/${locale}/contact`} className="btn-primary inline-block">
                    {t('getQuote')}
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t pt-8 mt-8 text-center"
          style={{
            borderColor: 'var(--border-default)',
          }}
        >
          <div className={`flex flex-col md:flex-row justify-center gap-4 md:gap-8 items-center ${rtl ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-muted-enhanced text-sm mb-0">
              &copy; {currentYear} Xentio Digital. {t('rights')}.
            </p>
            <div className={`flex gap-6 flex-wrap ${rtl ? 'flex-row-reverse' : ''}`}>
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-enhanced hover:text-high-contrast transition-colors animated-underline whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
