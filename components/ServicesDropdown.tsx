'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { servicesData, ServiceCategory } from '@/lib/services-data'
import { isRTL } from '@/lib/translation'
import { Icon } from '@/components/icons'

interface ServicesDropdownProps {
  onClose?: () => void
}

export default function ServicesDropdown({ onClose }: ServicesDropdownProps) {
  const locale = useLocale()
  const rtl = isRTL(locale)
  const shouldReduceMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null)
  const [submenuPosition, setSubmenuPosition] = useState<'right' | 'left'>('right')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const submenuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveCategory(null)
        onClose?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCategory(null)
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout)
      }
    }
  }, [hoverTimeout])

  // Calculate submenu position based on viewport
  const calculateSubmenuPosition = useCallback((categoryId: string) => {
    const categoryElement = categoryRefs.current[categoryId]
    if (!categoryElement || !dropdownRef.current) return

    const dropdownRect = dropdownRef.current.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    
    // Default: RTL opens left, LTR opens right
    let shouldOpenLeft = rtl
    
    // Check if submenu would overflow on the right (LTR) or left (RTL)
    if (!rtl) {
      // LTR: Check if opening right would overflow
      const spaceOnRight = viewportWidth - dropdownRect.right
      const submenuWidth = 320 // min-w-[20rem] = 320px
      const gap = 20 // ml-5 = 20px gap
      if (spaceOnRight < submenuWidth + gap) {
        shouldOpenLeft = true
      }
    } else {
      // RTL: Check if opening left would overflow
      const spaceOnLeft = dropdownRect.left
      const submenuWidth = 320
      const gap = 20 // mr-5 = 20px gap
      if (spaceOnLeft < submenuWidth + gap) {
        shouldOpenLeft = false
      }
    }
    
    setSubmenuPosition(shouldOpenLeft ? 'left' : 'right')
  }, [rtl])

  // Recalculate submenu position on window resize
  useEffect(() => {
    const handleResize = () => {
      if (activeCategory) {
        calculateSubmenuPosition(activeCategory)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeCategory, calculateSubmenuPosition])

  const handleCategoryEnter = (categoryId: string) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
    // Calculate optimal submenu position
    calculateSubmenuPosition(categoryId)
    // Immediate activation for smooth feel
    setActiveCategory(categoryId)
  }

  const handleCategoryLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
    }
    // Longer delay to allow moving to submenu
    const timeout = setTimeout(() => {
      setActiveCategory(null)
    }, 250)
    setHoverTimeout(timeout)
  }

  const handleSubmenuEnter = () => {
    // Cancel any pending close when entering submenu
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }

  const handleSubmenuLeave = () => {
    // Close submenu when leaving
    setActiveCategory(null)
  }

  const animationVariants = {
    initial: shouldReduceMotion 
      ? { opacity: 0 }
      : { opacity: 0, y: 8, scale: 0.96 },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, scale: 1 },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 8, scale: 0.96 },
  }

  // Dynamic submenu variants based on position
  const getSubmenuVariants = (position: 'left' | 'right') => {
    const slideDistance = 12
    const slideDirection = position === 'right' ? -slideDistance : slideDistance
    
    return {
      initial: shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: slideDirection, scale: 0.98 },
      animate: shouldReduceMotion
        ? { opacity: 1 }
        : { opacity: 1, x: 0, scale: 1 },
      exit: shouldReduceMotion
        ? { opacity: 0 }
        : { opacity: 0, x: slideDirection, scale: 0.98 },
    }
  }

  return (
    <div
      ref={dropdownRef}
      className={`absolute ${rtl ? 'right-0' : 'left-0'} top-full mt-1 min-w-[22rem] max-w-[30rem] z-[60]`}
      style={{ overflow: 'visible' }}
      onMouseEnter={() => {
        // Keep open when mouse enters dropdown area
        if (hoverTimeout) {
          clearTimeout(hoverTimeout)
          setHoverTimeout(null)
        }
      }}
      onMouseLeave={() => {
        // Close when leaving dropdown
        handleCategoryLeave()
      }}
    >
      <motion.div
        variants={animationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          duration: shouldReduceMotion ? 0 : 0.3, 
          ease: [0.4, 0, 0.2, 1],
          delay: shouldReduceMotion ? 0 : 0.05
        }}
        className="rounded-2xl border backdrop-blur-xl shadow-2xl"
        style={{
          borderColor: 'var(--border-default)',
          backgroundColor: 'var(--bg-elevated)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border-default), 0 0 40px rgba(124, 58, 237, 0.1)',
          overflow: 'visible',
          opacity: 1,
        }}
      >
        <div className="p-3" style={{ overflow: 'visible', position: 'relative' }}>
          {servicesData.map((category) => (
            <div
              key={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el
              }}
              className="relative"
              style={{ overflow: 'visible', zIndex: activeCategory === category.id ? 10 : 1 }}
            >
              {/* Level 1: Category */}
              <Link
                href={`/${locale}/services/${category.slug}`}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative ${
                  activeCategory === category.id
                    ? 'bg-surface text-high-contrast shadow-lg'
                    : 'text-muted-enhanced hover:text-high-contrast hover:bg-surface/60'
                }`}
                onClick={onClose}
                aria-haspopup="true"
                aria-expanded={activeCategory === category.id}
                onMouseEnter={() => handleCategoryEnter(category.id)}
              >
                {/* Active indicator */}
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 border"
                    style={{
                      borderColor: 'var(--brand-primary)',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon name={category.icon} className="w-5 h-5 flex-shrink-0 relative z-10 text-high-contrast" strokeWidth={2} />
                <span className="font-semibold text-sm flex-1 relative z-10">{category.name}</span>
                <motion.div
                  animate={{
                    x: activeCategory === category.id ? (rtl ? -6 : 6) : 0,
                    opacity: activeCategory === category.id ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`flex-shrink-0 relative z-10 ${
                    activeCategory === category.id ? 'text-primary-500' : 'text-muted-enhanced'
                  }`}
                >
                  <Icon name="ChevronRight" rtlFlip rtl={rtl} className="w-4 h-4" strokeWidth={2.5} />
                </motion.div>
              </Link>

              {/* Level 2: Sub-services */}
              <AnimatePresence>
                {activeCategory === category.id && category.subServices.length > 0 && (
                  <motion.div
                    ref={(el) => {
                      submenuRefs.current[category.id] = el
                    }}
                    variants={getSubmenuVariants(submenuPosition)}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ 
                      duration: shouldReduceMotion ? 0 : 0.3, 
                      ease: [0.4, 0, 0.2, 1],
                      delay: shouldReduceMotion ? 0 : 0.05
                    }}
                    className={`absolute ${
                      submenuPosition === 'right' 
                        ? (rtl ? 'right-full mr-5' : 'left-full ml-5')
                        : (rtl ? 'left-full ml-5' : 'right-full mr-5')
                    } top-0 min-w-[20rem] max-w-[22rem] z-[70]`}
                    style={{ 
                      position: 'absolute',
                      overflow: 'visible',
                    }}
                    onMouseEnter={handleSubmenuEnter}
                    onMouseLeave={handleSubmenuLeave}
                  >
                    <div
                      className="rounded-2xl border backdrop-blur-xl shadow-2xl"
                      style={{
                        borderColor: 'var(--border-default)',
                        backgroundColor: 'var(--bg-elevated)',
                        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.4), 0 0 0 1px var(--border-default), 0 0 40px rgba(6, 182, 212, 0.1)',
                        overflow: 'visible',
                        opacity: 1,
                      }}
                    >
                      <div className="p-3" style={{ overflow: 'visible' }}>
                        {/* Category Header */}
                        <div className="px-4 py-3 mb-2 border-b bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-t-xl"
                          style={{
                            borderColor: 'var(--border-default)',
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Icon name={category.icon} className="w-5 h-5 text-high-contrast" strokeWidth={2} />
                            <span className="font-bold text-sm text-high-contrast">{category.name}</span>
                          </div>
                        </div>

                        {/* Sub-services */}
                        <div className="space-y-1">
                          {category.subServices.map((subService) => (
                            <Link
                              key={subService.id}
                              href={`/${locale}/services/${subService.slug}`}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-muted-enhanced hover:text-high-contrast hover:bg-surface group relative"
                              onClick={onClose}
                            >
                              {/* Hover glow effect */}
                              <motion.div
                                className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:via-secondary-500/10 group-hover:to-accent-500/10 transition-all duration-300"
                                initial={false}
                              />
                              <Icon name={subService.icon} className="w-5 h-5 flex-shrink-0 relative z-10 text-high-contrast" strokeWidth={2} />
                              <span className="text-sm font-medium flex-1 relative z-10">{subService.name}</span>
                              <motion.div
                                className="w-4 h-4 flex-shrink-0 relative z-10"
                                initial={{ opacity: 0, x: rtl ? 4 : -4 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Icon name="ChevronRight" rtlFlip rtl={rtl} className="w-4 h-4" strokeWidth={2.5} />
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
