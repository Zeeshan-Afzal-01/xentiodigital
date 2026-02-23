import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import TestimonialsContent from './TestimonialsContent'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('testimonialsPage')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default function TestimonialsPage() {
  return <TestimonialsContent />
}
