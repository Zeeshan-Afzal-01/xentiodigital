'use client'

/**
 * Matches DigitalSilk hero-bg_wrap structure exactly:
 * - Each hero-bg_wrap-col has TWO .hero-bg_wrap-slides.v-scroll strips (same slides in each for seamless loop)
 * - Odd columns: animation heroscroll (0 → -100%); even: heroscroll-reverse (-100% → 0)
 * - Client logos bar at bottom, inside hero-bg_wrap
 */
const DEMO_BASE = 'https://www.digitalsilk.com/wp-content/uploads/2024/05'

const COLUMNS: { images: string[] }[] = [
  { images: ['1', '2', '3', '4', '5'] },
  { images: ['8', '9', '10', '11', '12'] },
  { images: ['13', '14', '15', '6', '7'] },
]

const HERO_CLIENT_LOGOS = [
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/xerox_logo-1.png', alt: 'Xerox', width: 91, height: 21 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/Sony-1.png', alt: 'Sony', width: 106, height: 19 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/PG_logo-1.png', alt: 'P&G', width: 63, height: 27 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/nyc_logo-1.png', alt: 'NYC', width: 85, height: 29 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/nfl_logo-1.png', alt: 'NFL', width: 42, height: 55 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/MicrosoftTeams-image-2.png', alt: 'Microsoft', width: 46, height: 45 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/mcds_logo-1.png', alt: "McDonald's", width: 65, height: 55 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/grenco_logo-1.png', alt: 'Grenco', width: 103, height: 35 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/g2_logo-1.png', alt: 'G2', width: 49, height: 55 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/enchant_logo-1.png', alt: 'Enchant', width: 133, height: 31 },
  { src: 'https://www.digitalsilk.com/wp-content/uploads/2024/05/BRU_Logo-1.png', alt: 'BRU', width: 125, height: 27 },
]

function imageSrc(name: string) {
  return `${DEMO_BASE}/${name}.jpg`
}

export default function ScrollingImages() {
  return (
    <div className="hero-bg_wrap">
      <div className="hero-bg_wrap-cols">
        {COLUMNS.map((col, colIndex) => (
          <div key={colIndex} className="hero-bg_wrap-col">
            {/* First strip */}
            <div className="hero-bg_wrap-slides v-scroll">
              {col.images.map((name, i) => (
                <div key={`a-${colIndex}-${i}`} className="hero-bg_wrap_slide">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc(name)}
                    alt=""
                    className="img-cover"
                    loading={colIndex === 0 && i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            {/* Second strip (duplicate for seamless loop) */}
            <div className="hero-bg_wrap-slides v-scroll">
              {col.images.map((name, i) => (
                <div key={`b-${colIndex}-${i}`} className="hero-bg_wrap_slide">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc(name)}
                    alt=""
                    className="img-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="hero-bg-gradient_overlay" aria-hidden />

      {/* Client logos bar — inside hero-bg_wrap, at bottom */}
      <div className="-client-slides is-playing" aria-hidden>
        <div className="m-slider__wrapper slider-css">
          {[...HERO_CLIENT_LOGOS, ...HERO_CLIENT_LOGOS].map((logo, i) => (
            <div key={i} className="m-slide client-item">
              <div className="m-slide__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  decoding="async"
                  fetchPriority="high"
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
