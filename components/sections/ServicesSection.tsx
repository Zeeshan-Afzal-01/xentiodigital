'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'
import type { IconName } from '@/components/icons'

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    href: '/services/web-development',
    icon: 'Code' as IconName,
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android that engage users and drive business growth.',
    href: '/services/mobile-apps',
    icon: 'Mobile' as IconName,
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Comprehensive SEO strategies and digital marketing campaigns to increase your online visibility and drive qualified leads.',
    href: '/services/seo-digital-marketing',
    icon: 'Growth' as IconName,
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'eCommerce Solutions',
    description: 'Complete eCommerce platforms with secure payment processing, inventory management, and seamless shopping experiences.',
    href: '/services/ecommerce-solutions',
    icon: 'Ecommerce' as IconName,
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    title: 'UX/UI & Design',
    description: 'User-centered design solutions that create intuitive, beautiful interfaces that convert visitors into customers.',
    href: '/services/ux-ui-design',
    icon: 'Design' as IconName,
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Desktop & Custom Software',
    description: 'Tailored desktop applications and custom software solutions designed to streamline your business operations.',
    href: '/services/desktop-custom-software',
    icon: 'Tools' as IconName,
    gradient: 'from-cyan-500 to-teal-500',
  },
]

export default function ServicesSection() {
  const t = useTranslations('services')
  const locale = useLocale()

  return (
    <section className="section-padding relative overflow-hidden">
      <motion.div
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          backgroundImage: 'var(--section-gradient)',
          backgroundSize: '200% 200%',
        }}
        className="absolute inset-0"
      />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t('title')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
          {services.map((service, index) => (
            <ServiceCard
              key={service.href}
              {...service}
              index={index}
              locale={locale}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link href={`/${locale}/services`} className="btn-secondary text-lg px-10 py-5">
              View All Services
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
