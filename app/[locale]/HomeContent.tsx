import Hero from '@/components/sections/Hero'
import StatsSection from '@/components/sections/StatsSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ServicesSection from '@/components/sections/ServicesSectionNew'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import ParticleBackground from '@/components/ParticleBackground'

export default function HomeContent({ locale }: { locale: string }) {
  return (
    <div className="relative">
      <ParticleBackground />
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection locale={locale} />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
