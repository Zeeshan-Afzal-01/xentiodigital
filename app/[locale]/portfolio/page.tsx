import type { Metadata } from 'next'
import PortfolioContent from './PortfolioContent'

export const metadata: Metadata = {
  title: 'Portfolio - Our Work & Case Studies',
  description: 'Explore our portfolio of successful projects including web development, mobile apps, eCommerce solutions, and custom software development.',
}

export default function PortfolioPage() {
  return <PortfolioContent />
}
