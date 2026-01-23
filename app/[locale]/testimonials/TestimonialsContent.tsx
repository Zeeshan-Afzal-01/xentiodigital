'use client'

import { useTranslations, useLocale } from 'next-intl'
import TestimonialCard from '@/components/TestimonialCard'
import Link from 'next/link'

export default function TestimonialsContent() {
  const t = useTranslations('testimonialsPage')
  const locale = useLocale()

  const testimonials = [
    {
      name: t('testimonials.sarah.name'),
      role: t('testimonials.sarah.role'),
      company: t('testimonials.sarah.company'),
      content: t('testimonials.sarah.content'),
      rating: 5,
    },
    {
      name: t('testimonials.michael.name'),
      role: t('testimonials.michael.role'),
      company: t('testimonials.michael.company'),
      content: t('testimonials.michael.content'),
      rating: 5,
    },
    {
      name: t('testimonials.emily.name'),
      role: t('testimonials.emily.role'),
      company: t('testimonials.emily.company'),
      content: t('testimonials.emily.content'),
      rating: 5,
    },
    {
      name: t('testimonials.david.name'),
      role: t('testimonials.david.role'),
      company: t('testimonials.david.company'),
      content: t('testimonials.david.content'),
      rating: 5,
    },
    {
      name: t('testimonials.lisa.name'),
      role: t('testimonials.lisa.role'),
      company: t('testimonials.lisa.company'),
      content: t('testimonials.lisa.content'),
      rating: 5,
    },
    {
      name: t('testimonials.james.name'),
      role: t('testimonials.james.role'),
      company: t('testimonials.james.company'),
      content: t('testimonials.james.content'),
      rating: 5,
    },
  ]

  return (
    <>
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-high-contrast mb-4">
            {t('joinTitle')}
          </h2>
          <p className="text-xl text-muted-enhanced mb-8 max-w-2xl mx-auto">
            {t('joinSubtitle')}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary">
            {t('getStarted')}
          </Link>
        </div>
      </section>
    </>
  )
}
