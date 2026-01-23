'use client'

import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import ServiceCategoryCard from '@/components/ServiceCategoryCard'
import { servicesData } from '@/lib/services-data'
import Link from 'next/link'
import Hero from '@/components/Hero'

export default function ServicesPageContent() {
  const t = useTranslations('services')
  const locale = useLocale()

  return (
    <>
      <Hero
        title={t('title')}
        subtitle={t('subtitle')}
        ctaText={t('viewServices')}
        ctaLink={`/${locale}/contact`}
      />

      <section className="section-padding relative overflow-hidden">
        {/* Animated Background Gradient */}
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
          {/* Service Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
            {servicesData.map((category, index) => (
              <ServiceCategoryCard
                key={category.id}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-surface">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-high-contrast mb-4"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-enhanced mb-8 max-w-2xl mx-auto"
          >
            Let&apos;s discuss how we can help transform your business with our comprehensive digital solutions.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link href={`/${locale}/contact`} className="btn-primary text-lg px-10 py-5">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
