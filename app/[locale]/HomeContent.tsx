import Hero from '@/components/sections/Hero'
import WhatWhoSection from '@/components/sections/WhatWhoSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import PartnersSection from '@/components/sections/PartnersSection'
import OurProcessSection from '@/components/sections/OurProcessSection'
import ServicesSection from '@/components/sections/ServicesSectionNew'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import ParticleBackground from '@/components/ParticleBackground'

export default function HomeContent({ locale }: { locale: string }) {
  return (
    <div className="relative">
      <ParticleBackground />
      <Hero />
      <WhatWhoSection />
      <FeaturesSection />
      <PartnersSection />
      <OurProcessSection />
      <ServicesSection locale={locale} />
      <TestimonialsSection />
      <CTASection />
    </div>
  )
}
