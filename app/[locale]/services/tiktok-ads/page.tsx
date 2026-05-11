import type { Metadata } from 'next'
import Link from 'next/link'
import { getLocale } from 'next-intl/server'
import { generateStructuredData } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'TikTok Ads Management - Stop the Scroll, Drive Real Results',
  description:
    'TikTok advertising campaigns that capture attention and drive action. Lower competition, higher engagement — we help your business win on the fastest-growing ad platform in the world.',
}

const features = [
  'TikTok Ads Strategy — built around your product, audience, and growth goals',
  'Audience Research & Targeting — interest-based, behavioural, and custom audience setup',
  'Video Ad Creative Direction — hook, hold, convert — we guide every element of your ads',
  'In-Feed Ads, TopView, and Spark Ads — we use the right format for each campaign objective',
  'TikTok Pixel Setup & Conversion Tracking — so every lead and sale is attributed correctly',
  'A/B Testing — we test hooks, visuals, copy, and calls-to-action systematically',
  'Retargeting & Lookalike Audiences — finding more people like your best customers',
  'Weekly Reports & Optimisation — transparent data and continuous improvements',
]

const benefits = [
  {
    title: 'Lower Competition, Higher Reach',
    description:
      'TikTok advertising is still less saturated than Facebook or Google in most niches. That means lower cost-per-click and higher visibility for your brand right now — before it gets more competitive.',
  },
  {
    title: 'Unmatched Organic Reach Potential',
    description:
      'A great TikTok ad can go viral. Unlike other platforms, TikTok still shows content to new audiences even without a big follower count, giving your campaigns massive amplification potential.',
  },
  {
    title: 'Highly Engaged Audience',
    description:
      'TikTok users spend an average of 90+ minutes per day on the platform. That level of attention and engagement is rare — and it makes TikTok Ads unusually effective for brand recall and conversion.',
  },
  {
    title: 'Works for Any Industry',
    description:
      'TikTok is no longer just for consumer brands. B2B companies, service businesses, ecommerce stores, local businesses — we run successful TikTok campaigns across every category.',
  },
]

const process = [
  {
    step: 1,
    title: 'Research & Creative Strategy',
    description:
      'We study your target audience on TikTok, analyse competitors, and build a creative brief. TikTok is a creative-first platform — getting the concept and hook right matters more than budget.',
  },
  {
    step: 2,
    title: 'Campaign Build & Pixel Setup',
    description:
      'We build your ad account structure, set up tracking with the TikTok Pixel, create custom and lookalike audiences, and configure campaigns for your specific objective — traffic, leads, or sales.',
  },
  {
    step: 3,
    title: 'Creative Production & Launch',
    description:
      'We create or guide the production of your video ads, write scroll-stopping hooks and captions, and launch. We monitor the first hours and days closely and optimise fast.',
  },
  {
    step: 4,
    title: 'Test, Learn, and Scale',
    description:
      'TikTok rewards creative freshness. We continuously test new hooks, angles, and ad formats, scaling what works and refreshing creatives before fatigue sets in — keeping your results strong month after month.',
  },
]

export default async function TikTokAdsPage() {
  const locale = await getLocale()
  const structuredData = generateStructuredData('Service', {
    serviceType: 'TikTok Ads Management',
    description:
      'TikTok advertising campaigns that capture attention and drive measurable results for businesses of all sizes.',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <div className="service-page__hero service-page__hero--tiktok">
        <div className="service-page__hero-glow" aria-hidden />
        <div className="container-custom relative z-10">
          <p className="service-page__hero-kicker">TikTok Ads Management</p>
          <h1 className="service-page__hero-title">
            TikTok Is Not Just for Teenagers Anymore.<br />
            Your Customers Are There.
          </h1>
          <p className="service-page__hero-sub">
            TikTok has become one of the most powerful advertising platforms for businesses in 2025 and beyond. With lower competition and higher engagement than most platforms, TikTok Ads give you a serious edge. We create campaigns that stop the scroll and drive real action — from product sales to lead generation.
          </p>
          <Link href={`/${locale}/contact`} className="service-page__hero-cta">
            Start Your TikTok Ads Strategy
          </Link>
        </div>
      </div>

      {/* What We Offer */}
      <section className="service-page__section">
        <div className="container-custom">
          <div className="service-page__section-header">
            <p className="service-page__section-kicker">WHAT WE OFFER</p>
            <h2 className="service-page__section-title">TikTok Advertising That Stops the Scroll and Drives Action</h2>
            <p className="service-page__section-sub">
              We handle everything from strategy and creative direction to campaign management and reporting. Your only job is reviewing the results.
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
            <p className="service-page__section-kicker">WHY TIKTOK ADS</p>
            <h2 className="service-page__section-title">Why TikTok Is the Right Platform for Your Business Right Now</h2>
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
            <h2 className="service-page__section-title">How We Build TikTok Campaigns That Get Results</h2>
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
          <h2 className="service-page__cta-title">Ready to Grow Your Business on TikTok?</h2>
          <p className="service-page__cta-sub">
            Get a free consultation and find out how TikTok Ads can work for your specific business and budget.
          </p>
          <Link href={`/${locale}/contact`} className="service-page__cta-btn">
            Get Your Free Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
