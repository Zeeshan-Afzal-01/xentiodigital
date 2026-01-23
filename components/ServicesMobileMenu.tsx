'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { servicesData } from '@/lib/services-data'
import { isRTL } from '@/lib/translation'
import { Icon } from '@/components/icons'

interface ServicesMobileMenuProps {
  onClose: () => void
}

export default function ServicesMobileMenu({ onClose }: ServicesMobileMenuProps) {
  const locale = useLocale()
  const rtl = isRTL(locale)
  const shouldReduceMotion = useReducedMotion()
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  return (
    <div className="space-y-1">
      {servicesData.map((category) => {
        const isExpanded = expandedCategories.has(category.id)
        
        return (
          <div key={category.id} className="border-b"
            style={{
              borderColor: 'var(--border-default)',
            }}
          >
            {/* Category Header - Clickable */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between py-3 text-muted-enhanced hover:text-high-contrast transition-colors text-start"
              aria-expanded={isExpanded}
            >
              <div className="flex items-center gap-3">
                <Icon name={category.icon} className="w-5 h-5 text-high-contrast" strokeWidth={2} />
                <span className="font-medium">{category.name}</span>
              </div>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <Icon name="ChevronDown" className="w-5 h-5 text-high-contrast" strokeWidth={2} />
              </motion.div>
            </button>

            {/* Category Link */}
            <Link
              href={`/${locale}/services/${category.slug}`}
              className={`block py-2 text-sm text-muted-enhanced hover:text-high-contrast transition-colors ${rtl ? 'pr-8' : 'pl-8'}`}
              onClick={onClose}
            >
              View All {category.name}
            </Link>

            {/* Sub-services - Accordion */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={shouldReduceMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0.1 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className={`${rtl ? 'pr-8' : 'pl-8'} pb-2 space-y-1`}>
                    {category.subServices.map((subService) => (
                      <Link
                        key={subService.id}
                        href={`/${locale}/services/${subService.slug}`}
                        className="flex items-center gap-2 py-2 text-sm text-muted-enhanced hover:text-high-contrast transition-colors"
                        onClick={onClose}
                      >
                        <Icon name={subService.icon} className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                        <span>{subService.name}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
