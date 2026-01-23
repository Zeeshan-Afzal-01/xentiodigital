'use client'

import { useEffect } from 'react'

interface LocaleAttributesProps {
  locale: string
  rtl: boolean
}

export default function LocaleAttributes({ locale, rtl }: LocaleAttributesProps) {
  useEffect(() => {
    // Update html attributes
    const html = document.documentElement
    html.setAttribute('lang', locale)
    html.setAttribute('dir', rtl ? 'rtl' : 'ltr')
    
    // Update body class for RTL/LTR
    const body = document.body
    // Remove existing rtl/ltr classes
    body.classList.remove('rtl', 'ltr')
    body.classList.add(rtl ? 'rtl' : 'ltr')
    
    // Update font family based on RTL
    body.style.fontFamily = rtl 
      ? 'var(--font-cairo), system-ui, sans-serif'
      : 'var(--font-inter), system-ui, sans-serif'
  }, [locale, rtl])

  return null
}
