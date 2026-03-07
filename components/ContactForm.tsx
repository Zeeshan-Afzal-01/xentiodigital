'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations, useLocale } from 'next-intl'
import { isRTL } from '@/lib/translation'
import { Icon } from '@/components/icons'

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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean }

      if (res.ok && data.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: '0 24px 60px rgba(15, 23, 42, 0.22)' }}
      onSubmit={handleSubmit}
      className="contact-form-flat rounded-2xl w-full"
      style={{
        borderColor: 'var(--border-default)',
      }}
    >
      <div className="space-y-5 mb-6">
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
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
            className="w-full ps-4 pe-4 py-3.5 bg-surface border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
            placeholder={t('namePlaceholder')}
          />
        </motion.div>
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
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
            className="w-full ps-4 pe-4 py-3.5 bg-surface border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
            placeholder={t('emailPlaceholder')}
          />
        </motion.div>
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
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
            className="w-full ps-4 pe-4 py-3.5 bg-surface border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start"
            style={{
              borderColor: 'var(--border-default)',
              color: 'var(--text-primary)',
            }}
            placeholder={t('phonePlaceholder')}
          />
        </motion.div>
        <motion.div
          className="min-w-0"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
        >
          <label htmlFor="service" className="block text-sm font-semibold text-high-contrast mb-2 text-start">
            {t('serviceInterest')} *
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full ps-4 pe-10 py-3.5 bg-surface border rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-start appearance-none cursor-pointer hover:border-[var(--border-strong)]"
              style={{
                borderColor: 'var(--border-default)',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <option value="" style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}>
                {t('selectService')}
              </option>
              {services.map((service) => (
                <option
                  key={service}
                  value={service}
                  style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--text-primary)' }}
                >
                  {service}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 end-3 w-5 h-5 text-[var(--text-primary)] opacity-70"
            />
          </div>
        </motion.div>
      </div>
      <motion.div
        className="mb-6 min-w-0"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25 }}
      >
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
      </motion.div>
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
        className="btn-primary w-full"
      >
        {isSubmitting ? t('sending') : t('sendMessage')}
      </motion.button>
    </motion.form>
  )
}
