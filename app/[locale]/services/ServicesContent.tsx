'use client'

import ServiceCard from '@/components/ServiceCard'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import type { IconName } from '@/components/icons'

const services = [
  {
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    href: '/services/web-development',
    icon: 'Code' as IconName,
  },
  {
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications for iOS and Android that engage users and drive business growth.',
    href: '/services/mobile-apps',
    icon: 'Mobile' as IconName,
  },
  {
    title: 'SEO & Digital Marketing',
    description: 'Comprehensive SEO strategies and digital marketing campaigns to increase your online visibility and drive qualified leads.',
    href: '/services/seo-digital-marketing',
    icon: 'Growth' as IconName,
  },
  {
    title: 'eCommerce Solutions',
    description: 'Complete eCommerce platforms with secure payment processing, inventory management, and seamless shopping experiences.',
    href: '/services/ecommerce-solutions',
    icon: 'Ecommerce' as IconName,
  },
  {
    title: 'UX/UI & Design',
    description: 'User-centered design solutions that create intuitive, beautiful interfaces that convert visitors into customers.',
    href: '/services/ux-ui-design',
    icon: 'Design' as IconName,
  },
  {
    title: 'Desktop & Custom Software',
    description: 'Tailored desktop applications and custom software solutions designed to streamline your business operations.',
    href: '/services/desktop-custom-software',
    icon: 'Tools' as IconName,
  },
]

export default function ServicesContent() {
  const locale = useLocale()
  
  return (
    <>
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-background to-secondary-900/30" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shape bg-primary-500/20" />
          <div className="floating-shape bg-secondary-500/20" style={{ animationDelay: '-5s' }} />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">Our Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto"
          >
            Comprehensive digital solutions tailored to your business needs
          </motion.p>
        </div>
      </div>

      <section className="section-padding relative bg-gradient-to-b from-transparent via-primary-900/5 to-transparent">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.href} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-secondary-600/20 to-accent-600/20" />
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              <span className="gradient-text">Need a Custom Solution?</span>
            </h2>
            <p className="text-xl text-muted-enhanced mb-8 max-w-2xl mx-auto">
              We specialize in creating tailored digital solutions that fit your unique business requirements.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={`/${locale}/contact`} className="btn-primary">
                Get a Free Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
