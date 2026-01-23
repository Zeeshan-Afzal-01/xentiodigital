import { getTranslations } from 'next-intl/server'
import ServicesPageContent from './ServicesPageContent'

export async function generateMetadata() {
  const t = await getTranslations('services')
  
  return {
    title: `${t('title')} | Xentio Digital`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title')} | Xentio Digital`,
      description: t('subtitle'),
    },
  }
}

export default function ServicesPage() {
  return <ServicesPageContent />
}
