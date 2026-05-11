import Hero from '@/components/sections/Hero'
import JourneyStatsSection from '@/components/sections/JourneyStatsSection'
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection'
import DigiStyleServicesSection from '@/components/sections/DigiStyleServicesSection'
import HowWeWorkSection from '@/components/sections/HowWeWorkSection'
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
        <JourneyStatsSection />
        <WhyChooseUsSection />
        <DigiStyleServicesSection />
        <HowWeWorkSection />
        <ClientTestimonialsSection />
        <CaseStudiesNavSection />
        <CinematicIndustriesSection />
        <FaqSection />
        <ContactFormSection />
      </ThemeSectionsWrapper>
    </div>
  )
}
