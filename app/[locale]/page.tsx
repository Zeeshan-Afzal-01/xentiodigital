import HomeContent from './HomeContent'

interface PageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  return <HomeContent locale={locale} />
}
