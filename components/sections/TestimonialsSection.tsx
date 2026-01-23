'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import TestimonialCard from '@/components/TestimonialCard'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Inc.',
    content: 'Xentio Digital transformed our online presence. Their web development team delivered exactly what we needed, and our traffic has increased by 300%.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Founder',
    company: 'RetailPro',
    content: 'The eCommerce solution they built for us is outstanding. Sales have doubled since launch, and the platform is incredibly user-friendly.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'Growth Labs',
    content: 'Their SEO and digital marketing services have been game-changing. We\'ve seen a significant increase in qualified leads and brand awareness.',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')
  
  return (
    <section className="section-padding relative">
      <div className="container-custom">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
