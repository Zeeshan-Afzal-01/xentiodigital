import Hero from '@/components/sections/Hero'
import JourneyStatsSection from '@/components/sections/JourneyStatsSection'
import DigiStyleServicesSection from '@/components/sections/DigiStyleServicesSection'
import PartnersSection from '@/components/sections/PartnersSection'
import ClientTestimonialsSection from '@/components/sections/ClientTestimonialsSection'
import CaseStudiesNavSection from '@/components/sections/CaseStudiesNavSection'
import CinematicIndustriesSection from '@/components/sections/CinematicIndustriesSection'
import FaqSection from '@/components/sections/FaqSection'
import ContactFormSection from '@/components/sections/ContactFormSection'
import ParticleBackground from '@/components/ParticleBackground'
import ThemeSectionsWrapper from '@/components/ThemeSectionsWrapper'

export default function HomeContent({ locale: _locale }: { locale: string }) {
  return (
    <div className="relative">
      <ParticleBackground />
      <Hero />
      <ThemeSectionsWrapper>
        {/* ia-what-who section (Bold Ideas heading) — commented out */}
        {/* <WhatWhoSection /> */}
        <JourneyStatsSection />
        <DigiStyleServicesSection />
        <PartnersSection />
        {/* <ProfessionalServicesSection /> — "Why Businesses Trust Us" removed */}
        {/* <OurProcessSection /> */}
        <ClientTestimonialsSection />
        <CaseStudiesNavSection />
        <CinematicIndustriesSection />
        <FaqSection />
        <ContactFormSection />
      </ThemeSectionsWrapper>
    </div>
  )
}
