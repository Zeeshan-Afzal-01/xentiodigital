import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Google Ads Management Services - Stop Wasting Budget, Start Converting',
  description:
    'Expert Google Ads management that maximises your ROI. We handle everything — Search, Shopping, Display, and YouTube — so you get maximum return on every dollar spent.',
}

const features = [
  'Campaign Strategy & Setup — built around your specific goals and audience',
  'Keyword Research & Intent Mapping — targeting people actively searching for what you offer',
  'Compelling Ad Copy — tested headlines and descriptions that drive clicks and conversions',
  'Landing Page Recommendations — so your traffic converts, not just clicks',
  'Bid Management & Budget Optimisation — maximum results at minimum waste',
  'A/B Testing — continuous testing of ads, audiences, and landing pages',
  'Conversion Tracking — every lead, sale, and call is tracked and attributed',
  'Weekly Performance Reports — you always know exactly what your money is doing',
]

const benefits = [
  {
    title: 'Instant Visibility',
    description:
      'Appear at the top of Google the moment campaigns go live. No waiting months like with SEO — your business is in front of buyers from day one.',
  },
  {
    title: 'Targeted, High-Intent Traffic',
    description:
      'Reach people who are actively searching for your product or service right now. Google Ads is intent-based marketing at its most powerful.',
  },
  {
    title: 'Full Budget Control',
    description:
      'You set the budget. We make it work as hard as possible. No surprise charges, no wasted spend on irrelevant clicks.',
  },
  {
    title: 'Measurable, Transparent ROI',
    description:
      'Every click, lead, and sale is tracked. You get weekly reports showing exactly what your investment returned — in plain language, not agency jargon.',
  },
]

const process = [
  {
    step: 1,
    title: 'Research & Audit',
    description:
      'We analyse your business, competitors, and target keywords. If you have existing campaigns, we audit them fully to find waste and missed opportunities.',
  },
  {
    step: 2,
    title: 'Strategy & Campaign Build',
    description:
      'We build your campaigns with the right structure — ad groups, keywords, match types, and negative keywords — to ensure every dollar is spent on the right audience.',
  },
  {
    step: 3,
    title: 'Launch & Monitor',
    description:
      'Campaigns go live and we monitor performance closely in the first weeks, making rapid adjustments to capture what works and eliminate what does not.',
  },
  {
    step: 4,
    title: 'Optimise & Scale',
    description:
      'We continuously refine bids, test new ad variations, expand winning keywords, and scale budgets intelligently based on what the data tells us.',
  },
]

export default async function GoogleAdsPage() {
  const locale = await getLocale()
  const structuredData = generateStructuredData('Service', {
    serviceType: 'Google Ads Management',
    description:
      'Expert Google Ads management that maximises your ROI across Search, Shopping, Display, and YouTube campaigns.',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <div className="service-page__hero">
        <div className="service-page__hero-glow" aria-hidden />
        <div className="container-custom relative z-10">
          <p className="service-page__hero-kicker">Google Ads Management</p>
          <h1 className="service-page__hero-title">
            Stop Wasting Ad Budget.<br />
            Start Getting Clicks That Actually Convert.
          </h1>
          <p className="service-page__hero-sub">
            Google Ads is one of the fastest ways to put your business in front of people who are actively searching for what you offer. We set up, manage, and continuously optimise your campaigns so you get maximum return on every dollar spent.
          </p>
          <Link href={`/${locale}/contact`} className="service-page__hero-cta">
            Get a Free Google Ads Audit
          </Link>
        </div>
      </div>

      {/* What We Offer */}
      <section className="service-page__section">
        <div className="container-custom">
          <div className="service-page__section-header">
            <p className="service-page__section-kicker">WHAT WE OFFER</p>
            <h2 className="service-page__section-title">Everything You Need to Run Google Ads That Work</h2>
            <p className="service-page__section-sub">
              From the first keyword to the final conversion, we handle every part of your Google Ads account with a focus on results, not just activity.
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
            <p className="service-page__section-kicker">WHY GOOGLE ADS</p>
            <h2 className="service-page__section-title">The Benefits of Running Google Ads With Xentio Digital</h2>
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
            <h2 className="service-page__section-title">How We Build and Manage Your Google Ads Campaigns</h2>
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
          <h2 className="service-page__cta-title">Ready to Make Your Google Ads Work?</h2>
          <p className="service-page__cta-sub">
            Get a free audit of your current campaigns — or start fresh with a strategy built around your goals.
          </p>
          <Link href={`/${locale}/contact`} className="service-page__cta-btn">
            Get Your Free Audit
          </Link>
        </div>
      </section>
    </>
  )
}
