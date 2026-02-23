import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import ContactContent from './ContactContent'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contact')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default function ContactPage() {
  return <ContactContent />
}
