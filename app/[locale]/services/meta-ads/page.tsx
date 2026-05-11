import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Meta Ads Management (Facebook & Instagram) - Reach Your Ideal Customers',
  description:
    'Professional Meta Ads management for Facebook and Instagram. We build campaigns that build brand awareness, generate leads, and drive sales — across every industry and budget.',
}

const features = [
  'Campaign Strategy & Funnel Design — awareness, consideration, and conversion campaigns that work together',
  'Audience Research & Targeting — custom audiences, lookalikes, interest-based, and retargeting',
  'Creative Direction & Ad Copy — scroll-stopping visuals and copy that drives action',
  'Facebook & Instagram Placement Optimisation — the right ad in the right placement at the right time',
  'Pixel Setup & Conversion Tracking — accurate data so we know exactly what is working',
  'A/B Testing — systematic testing of audiences, creatives, and offers',
  'Retargeting Campaigns — bringing back warm audiences who showed interest',
  'Weekly Performance Reports — full transparency on what your budget is returning',
]

const benefits = [
  {
    title: 'Massive Reach',
    description:
      'Over 3 billion people use Facebook and Instagram. With the right targeting, you can reach your ideal customer profile at scale — wherever they are in the world.',
  },
  {
    title: 'Advanced Audience Targeting',
    description:
      'Target by demographics, interests, behaviours, past purchases, and custom audiences built from your own data. Meta advertising targeting is unmatched in precision.',
  },
  {
    title: 'Results at Every Budget Level',
    description:
      'Whether you are spending $300/month or $30,000/month, we build campaigns that get the most out of your budget. We adapt our strategy to what your numbers support.',
  },
  {
    title: 'Brand Awareness + Direct Response',
    description:
      'Meta Ads work for both brand building and performance marketing. We balance both so your campaigns compound in value over time.',
  },
]

const process = [
  {
    step: 1,
    title: 'Audience & Competitor Research',
    description:
      'We study your target audience, what your competitors are running, and what messaging resonates in your market. We build a targeting strategy before we create a single ad.',
  },
  {
    step: 2,
    title: 'Funnel & Campaign Setup',
    description:
      'We design a full-funnel structure — top of funnel for awareness, middle for engagement, and bottom for conversions — so no potential customer falls through the cracks.',
  },
  {
    step: 3,
    title: 'Creative Production & Launch',
    description:
      'We create or direct the ad creatives and copy, set up tracking, and launch. We monitor closely in the early days and optimise aggressively based on real data.',
  },
  {
    step: 4,
    title: 'Ongoing Optimisation & Scaling',
    description:
      'We analyse performance weekly, kill what is not working, double down on what is, and steadily scale your best-performing campaigns for compounding returns.',
  },
]

export default async function MetaAdsPage() {
  const locale = await getLocale()
  const structuredData = generateStructuredData('Service', {
    serviceType: 'Meta Ads Management',
    description:
      'Professional Meta Ads management for Facebook and Instagram campaigns across all business sizes and industries.',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <div className="service-page__hero service-page__hero--meta">
        <div className="service-page__hero-glow" aria-hidden />
        <div className="container-custom relative z-10">
          <p className="service-page__hero-kicker">Meta Ads — Facebook & Instagram</p>
          <h1 className="service-page__hero-title">
            Reach Your Ideal Customers<br />
            Where They Actually Spend Their Time.
          </h1>
          <p className="service-page__hero-sub">
            With over 3 billion people on Facebook and Instagram, the opportunity is massive — if you know how to target the right audience with the right creative. We build Meta Ads campaigns that generate leads, build brand awareness, and drive sales across every industry and every budget.
          </p>
          <Link href={`/${locale}/contact`} className="service-page__hero-cta">
            Start Your Meta Ads Strategy
          </Link>
        </div>
      </div>

      {/* What We Offer */}
      <section className="service-page__section">
        <div className="container-custom">
          <div className="service-page__section-header">
            <p className="service-page__section-kicker">WHAT WE OFFER</p>
            <h2 className="service-page__section-title">Full-Funnel Meta Ads Management That Drives Real Results</h2>
            <p className="service-page__section-sub">
              We do not just run ads. We build complete Meta advertising systems that attract, nurture, and convert your ideal customers at every stage of the buying journey.
            </p>
          </div>
          <ul className="service-page__features-list">
            {features.map((f, i) => (
              <li key={i} className="service-page__feature-item">
                <span className="service-page__feature-check" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="service-page__section service-page__section--alt">
        <div className="container-custom">
          <div className="service-page__section-header">
            <p className="service-page__section-kicker">WHY META ADS</p>
            <h2 className="service-page__section-title">Why Facebook & Instagram Advertising Works for Your Business</h2>
          </div>
          <div className="service-page__benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="service-page__benefit-card">
                <h3 className="service-page__benefit-title">{b.title}</h3>
                <p className="service-page__benefit-desc">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="service-page__section">
        <div className="container-custom">
          <div className="service-page__section-header">
            <p className="service-page__section-kicker">OUR PROCESS</p>
            <h2 className="service-page__section-title">How We Build Meta Ads Campaigns That Convert</h2>
          </div>
          <div className="service-page__process-grid">
            {process.map((p) => (
              <div key={p.step} className="service-page__process-card">
                <span className="service-page__process-number">{String(p.step).padStart(2, '0')}</span>
                <h3 className="service-page__process-title">{p.title}</h3>
                <p className="service-page__process-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="service-page__cta-section">
        <div className="container-custom text-center">
          <h2 className="service-page__cta-title">Ready to Build Meta Ads That Actually Convert?</h2>
          <p className="service-page__cta-sub">
            Tell us about your business and we will build a Meta Ads strategy around your goals and budget.
          </p>
          <Link href={`/${locale}/contact`} className="service-page__cta-btn">
            Get Your Free Strategy Call
          </Link>
        </div>
      </section>
    </>
  )
}
