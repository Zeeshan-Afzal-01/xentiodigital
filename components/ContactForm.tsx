'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { isRTL } from '@/lib/translation'

export default function ContactForm() {
  const t = useTranslations('contactForm')
  const locale = useLocale()
  const rtl = isRTL(locale)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const services = [
    t('services.webDevelopment'),
    t('services.mobileApps'),
    t('services.seo'),
    t('services.ecommerce'),
    t('services.uxui'),
    t('services.customSoftware'),
    t('services.other'),
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      })
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass-strong rounded-2xl p-8 border"
      style={{
        borderColor: 'var(--border-default)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="min-w-0">
          <label htmlFor="name" className="block text-sm font-semibold text-high-contrast mb-2 text-start">
            {t('name')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            dir="auto"
            className="w-full ps-4 pe-4 py-3 bg-surface border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className="block text-sm font-semibold text-high-contrast mb-2 text-start">
            {t('email')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            dir="ltr"
            className="w-full ps-4 pe-4 py-3 bg-surface border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
            placeholder={t('emailPlaceholder')}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="phone" className="block text-sm font-semibold text-high-contrast mb-2 text-start">
            {t('phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            dir="ltr"
            className="w-full ps-4 pe-4 py-3 bg-surface border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
            placeholder={t('phonePlaceholder')}
          />
        </div>
        <div className="min-w-0">
          <label htmlFor="service" className="block text-sm font-semibold text-high-contrast mb-2 text-start">
            {t('serviceInterest')} *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full ps-4 pe-4 py-3 bg-surface border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
          >
            <option value="">{t('selectService')}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-6 min-w-0">
        <label htmlFor="message" className="block text-sm font-semibold text-high-contrast mb-2 text-start">
          {t('message')} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleChange}
          dir="auto"
          className="w-full ps-4 pe-4 py-3 bg-surface border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all resize-none text-start"
          style={{
            borderColor: 'var(--border-default)',
            color: 'var(--text-primary)',
          }}
          placeholder={t('messagePlaceholder')}
        />
      </div>
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-lg border"
          style={{
            backgroundColor: 'rgba(22, 163, 74, 0.1)',
            borderColor: 'rgba(22, 163, 74, 0.3)',
            color: 'var(--brand-accent)',
          }}
        >
          {t('successMessage')}
        </motion.div>
      )}
      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-lg border"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.3)',
            color: '#DC2626',
          }}
        >
          {t('errorMessage')}
        </motion.div>
      )}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn-primary w-full md:w-auto"
      >
        {isSubmitting ? t('sending') : t('sendMessage')}
      </motion.button>
    </motion.form>
  )
}
