'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { servicesData, getAllServices } from '@/lib/services-data'
import { getBlogPostUrl } from '@/lib/blog-utils'
import type { Blog } from '@/lib/blog-types'
import { Icon } from '@/components/icons'
import { isRTL } from '@/lib/translation'

interface InternalLinksProps {
  post: Blog
  variant?: 'services' | 'related-posts' | 'both'
}

export default function InternalLinks({ post, variant = 'both' }: InternalLinksProps) {
  const locale = useLocale()
  const rtl = isRTL(locale)
  
  // Get related services based on category and tags
  const relatedServices = getAllServices().filter((service) => {
    const serviceCategory = servicesData.find((cat) => 
      cat.subServices.some((sub) => sub.id === service.id)
    )
    return (
      serviceCategory?.name === post.category ||
      post.tags.some((tag) => 
        service.name.toLowerCase().includes(tag.toLowerCase()) ||
        service.description.toLowerCase().includes(tag.toLowerCase())
      )
    )
  }).slice(0, 3)

  // Also check if post has explicit relatedServices
  const explicitServices = post.relatedServices
    ? getAllServices().filter((service) => 
        post.relatedServices?.includes(service.slug)
      )
    : []

  const servicesToShow = explicitServices.length > 0 ? explicitServices : relatedServices

  return (
    <div className="space-y-8">
      {/* Related Services */}
      {(variant === 'services' || variant === 'both') && servicesToShow.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-premium rounded-2xl p-6 md:p-8 border"
          style={{
            borderColor: 'var(--border-default)',
          }}
        >
          <h3 className="text-xl font-bold text-high-contrast mb-4">
            Related Services
          </h3>
          <p className="text-sm text-muted-enhanced mb-6">
            Explore our services that can help you implement these strategies
          </p>
          <div className="space-y-3">
            {servicesToShow.map((service, index) => {
              const category = servicesData.find((cat) =>
                cat.subServices.some((sub) => sub.id === service.id)
              )
              return (
                <Link
                  key={service.id}
                  href={`/${locale}/services/${service.slug}`}
                  className="block p-4 rounded-lg glass-premium border transition-all hover:scale-[1.02] group"
                  style={{
                    borderColor: 'var(--border-default)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-primary)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-default)'
                  }}
                >
                  <div className="flex items-start gap-4">
                    <Icon name={service.icon} className="w-6 h-6 flex-shrink-0 text-high-contrast" strokeWidth={2} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-high-contrast mb-1 group-hover:text-primary-500 transition-colors">
                        {service.name}
                      </h4>
                      <p className="text-sm text-muted-enhanced line-clamp-2">
                        {service.description}
                      </p>
                      {category && (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs text-primary-500">
                          {category.name}
                          <Icon name="ArrowRight" rtlFlip rtl={rtl} className="w-3.5 h-3.5" strokeWidth={2} />
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-6">
            <Link
              href={`/${locale}/services`}
              className="text-primary-500 hover:text-primary-400 font-semibold text-sm transition-colors inline-flex items-center gap-2"
            >
              View All Services
              <Icon name="ChevronRight" rtlFlip rtl={rtl} className="w-4 h-4" strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
