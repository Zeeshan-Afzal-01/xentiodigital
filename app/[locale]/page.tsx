import type { Metadata } from 'next'
import HomeContent from './HomeContent'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export const metadata: Metadata = {
  title: { absolute: 'Xentio Digital | SEO & Performance Marketing Agency' },
  description: 'Xentio Digital is a results-driven digital marketing agency offering SEO, Google Ads, Meta Ads, TikTok Ads, and web development services worldwide. Get real growth.',
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  return <HomeContent locale={locale} />
}
