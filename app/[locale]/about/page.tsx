import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import AboutContent from './AboutContent'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default function AboutPage() {
  return <AboutContent />
}
