'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Icon, IconName } from '@/components/icons'

interface TrustSignalsProps {
  variant?: 'compact' | 'full'
  showTestimonials?: boolean
  showStats?: boolean
  showCertifications?: boolean
}

export default function TrustSignals({
  variant = 'compact',
  showTestimonials = true,
  showStats = true,
  showCertifications = true,
}: TrustSignalsProps) {
  const locale = useLocale()

  const stats = [
    { value: '500+', label: 'Projects Completed', icon: 'DigitalTransformation' as IconName },
    { value: '98%', label: 'Client Satisfaction', icon: 'Star' as IconName },
    { value: '10+', label: 'Years Experience', icon: 'Calendar' as IconName },
    { value: '50+', label: 'Expert Team', icon: 'Users' as IconName },
  ]

  const certifications = [
    'Google Certified Partner',
    'HubSpot Certified',
    'Shopify Partners',
    'AWS Certified',
  ]

  const testimonials = [
    {
      quote: 'Xentio Digital transformed our online presence. Our traffic increased by 300%.',
      author: 'Sarah Johnson',
      role: 'CEO, TechStart Inc.',
    },
    {
      quote: 'Their SEO services have been game-changing. We\'ve seen a significant increase in qualified leads.',
      author: 'Emily Rodriguez',
      role: 'Marketing Director, Growth Labs',
    },
  ]

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-premium rounded-xl p-6 border"
        style={{
          borderColor: 'var(--border-default)',
        }}
      >
        <h3 className="text-sm font-semibold text-muted-enhanced mb-4 uppercase tracking-wider">
          Trusted By Industry Leaders
        </h3>
        {showStats && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {stats.slice(0, 4).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-enhanced">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
        {showCertifications && (
          <div className="pt-4 border-t"
            style={{
              borderColor: 'var(--border-default)',
            }}
          >
            <div className="flex flex-wrap gap-2">
              {certifications.slice(0, 2).map((cert) => (
                <span
                  key={cert}
                  className="px-2 py-1 rounded text-xs font-medium glass-premium border text-muted-enhanced"
                  style={{
                    borderColor: 'var(--border-default)',
                  }}
                >
                  <span className="inline-flex items-center gap-1">
                    <Icon name="Check" className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>{cert}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Stats */}
      {showStats && (
        <div className="glass-premium rounded-2xl p-8 border"
          style={{
            borderColor: 'var(--border-default)',
          }}
        >
          <h3 className="text-xl font-bold text-high-contrast mb-6 text-center">
            Trusted Results
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 text-primary-500">
                  <Icon name={stat.icon} className="w-8 h-8" strokeWidth={2} />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-enhanced">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {showCertifications && (
        <div className="glass-premium rounded-2xl p-8 border"
          style={{
            borderColor: 'var(--border-default)',
          }}
        >
          <h3 className="text-xl font-bold text-high-contrast mb-6 text-center">
            Certifications & Partnerships
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-4 py-2 rounded-lg text-sm font-medium glass-premium border text-muted-enhanced"
                style={{
                  borderColor: 'var(--border-default)',
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <Icon name="Check" className="w-4 h-4" strokeWidth={2} />
                  <span>{cert}</span>
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {showTestimonials && (
        <div className="glass-premium rounded-2xl p-8 border"
          style={{
            borderColor: 'var(--border-default)',
          }}
        >
          <h3 className="text-xl font-bold text-high-contrast mb-6 text-center">
            What Our Clients Say
          </h3>
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="border-l-4 pl-6"
                style={{
                  borderColor: 'var(--brand-primary)',
                }}
              >
                <p className="text-muted-enhanced mb-4 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <div className="font-semibold text-high-contrast">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-enhanced">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              href={`/${locale}/testimonials`}
              className="text-primary-500 hover:text-primary-400 font-semibold text-sm transition-colors"
            >
              View All Testimonials →
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  )
}
