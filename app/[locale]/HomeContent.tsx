import Hero from '@/components/sections/Hero'
import WhatWhoSection from '@/components/sections/WhatWhoSection'
import PartnersSection from '@/components/sections/PartnersSection'
import OurProcessSection from '@/components/sections/OurProcessSection'
import ProfessionalServicesSection from '@/components/sections/ProfessionalServicesSection'
import ServicesSection from '@/components/sections/ServicesSectionNew'
import ClientTestimonialsSection from '@/components/sections/ClientTestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import ParticleBackground from '@/components/ParticleBackground'

export default function HomeContent({ locale }: { locale: string }) {
  return (
    <div className="relative">
      <ParticleBackground />
      <Hero />
      <WhatWhoSection />
      <PartnersSection />
      <OurProcessSection />
      <ProfessionalServicesSection />
      <ServicesSection locale={locale} />
      <ClientTestimonialsSection />
      <CTASection />
    </div>
  )
}
