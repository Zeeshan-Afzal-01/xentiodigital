import Hero from '@/components/sections/Hero'
import WhatWhoSection from '@/components/sections/WhatWhoSection'
import PartnersSection from '@/components/sections/PartnersSection'
import OurProcessSection from '@/components/sections/OurProcessSection'
import ProfessionalServicesSection from '@/components/sections/ProfessionalServicesSection'
import HomeServicesSection from '@/components/sections/HomeServicesSection'
import CaseStudiesSection from '@/components/sections/CaseStudiesSection'
import ClientTestimonialsSection from '@/components/sections/ClientTestimonialsSection'
import CTASection from '@/components/sections/CTASection'
import ParticleBackground from '@/components/ParticleBackground'
import ThemeSectionsWrapper from '@/components/ThemeSectionsWrapper'

export default function HomeContent({ locale }: { locale: string }) {
  return (
    <div className="relative">
      <ParticleBackground />
      <Hero />
      <ThemeSectionsWrapper>
        <WhatWhoSection />
        <PartnersSection />
        
        <ProfessionalServicesSection />
        {/* <OurProcessSection /> */}
        <ClientTestimonialsSection />
      </ThemeSectionsWrapper>
      <HomeServicesSection locale={locale} />
      <CaseStudiesSection />
      <CTASection />
    </div>
  )
}
