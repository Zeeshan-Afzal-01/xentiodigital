import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import CareersContent from './CareersContent'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('careers')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default function CareersPage() {
  return <CareersContent />
}
