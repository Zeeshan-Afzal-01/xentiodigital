'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'



// Each image appears exactly once per column — no cross-column duplicates.
const COLUMNS_DARK: { images: string[] }[] = [
  {
    images: [
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778587899/seo-research_jqhdj0.jpg',
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778589880/web-development_xzrjw9.jpg',
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778587899/digital-marketing_mabjfi.jpg',
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778587906/ppc-advertising_mllq2e.jpg',
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778587900/social-media_dkh226.jpg',
      'https://res.cloudinary.com/dcl1irn9s/image/upload/w_600,h_400,c_fit,q_auto,f_auto/v1779214876/Black_and_Purple_Modern_Business_Digital_Marketing_Workshop_Presentation_1_dbtbbt.png',
    ],
  },
  {
    images: [
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778587887/mobile-3d_k0wkze.jpg',
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778587906/metaverse-business_yes7br.jpg',
      'https://res.cloudinary.com/degbinbhz/image/upload/f_auto,q_auto,w_600/v1778587896/ads-optimization_v8scj0.jpg',
      // 'https://res.cloudinary.com/dcl1irn9s/image/upload/w_600,h_400,c_pad,b_white,q_auto:eco,f_auto/v1779215053/magnifying-glass-highlighting-ads-computer-screen-with-floating-icons-analytics-traffic-optimization-sales-conversions-symbolizing-digital-marketing_1_yhnnds.jpg',
      'https://res.cloudinary.com/dcl1irn9s/image/upload/w_600,h_400,c_pad,b_white,q_auto:eco,f_auto/v1779214913/digital-marketing-analytics-dashboard-with-ads-performance-charts-ai-interface-representing-data_1_eewv5d.jpg',
    ],
  },
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

export default function ScrollingImages() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const cb = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', cb)
    return () => mq.removeEventListener('change', cb)
  }, [])
  const allColumns = COLUMNS_DARK
  // On mobile: merge all images into one column for maximum variety
  const mergedMobileColumn = { images: allColumns.flatMap((col) => col.images) }
  const columns = isMobile ? [mergedMobileColumn] : allColumns

  return (
    <div className="hero-bg_wrap">
      <div className={`hero-bg_wrap-cols${isMobile ? ' hero-bg_wrap-cols--single' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            className="hero-bg_wrap-cols-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="hero-bg_wrap-col">
                <div className="hero-bg_wrap-slides v-scroll-continuous">
                  {col.images.map((src, i) => (
                    <div key={i} className="hero-bg_wrap_slide">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt=""
                        className="img-cover"
                        loading={colIndex === 0 && i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                  ))}
                  {/* Duplicate set — stays below viewport, enables seamless gap-free loop */}
                  {col.images.map((src, i) => (
                    <div key={`d-${i}`} className="hero-bg_wrap_slide">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
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
          </motion.div>
        </AnimatePresence>
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
