import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import TeamContent from './TeamContent'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('team')
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default function TeamPage() {
  return <TeamContent />
}
