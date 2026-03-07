'use client'

import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

/**
 * Hero scrolling background: two columns of images, theme-aware.
 * - Dark: moody tech/creative; Light: bright, clean agency vibe.
 * - Crossfade when theme changes.
 */
const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=82&fit=crop`

// Dark theme: moody, tech, digital agency
const COLUMNS_DARK: { images: string[] }[] = [
  {
    images: [
      U('1550751827-4bd374c3f58b'), // tech screens
      U('1497366216548-37526070297c'), // modern office
      U('1460925895917-afdab827c52f'), // analytics
      U('1551434678-e076c223a692'),   // team dev
      U('1517694712202-14dd9538aa97'), // laptop code
    ],
  },
  {
    images: [
      U('1504384308090-c894fdcc538d'), // workspace
      U('1522071820081-009f0129c71c'), // collaboration
      U('1552664730-d307ca884978'),   // team meeting
      U('1499951360447-b19be8af80c5'), // laptop
      U('1516321318423-f06f85e504b3'), // creative workspace
    ],
  },
]

// Light theme: bright, clean, agency
const COLUMNS_LIGHT: { images: string[] }[] = [
  {
    images: [
      U('1497366811353-6870744d04b2'), // bright office
      U('1523240795612-9a054b0db644'), // woman at laptop
      U('1557804506-669a67965ba0'),   // business handshake
      U('1542744173-8e7e53415bb0'),   // team meeting bright
      U('1600880292203-757bb62b4baf'), // laptop workspace
    ],
  },
  {
    images: [
      U('1556761175-b413da4baf72'),   // team discussion
      U('1553877522-43269d4ea984'),   // office bright
      U('1517245386807-bb43f82c33c4'), // team planning
      U('1552664730-d307ca884978'),   // meeting
      U('1522071820081-009f0129c71c'), // collaboration light
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
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted ? resolvedTheme === 'dark' : true
  const columns = isDark ? COLUMNS_DARK : COLUMNS_LIGHT

  return (
    <div className="hero-bg_wrap">
      <div className="hero-bg_wrap-cols">
        <AnimatePresence mode="wait">
          <motion.div
            key={isDark ? 'dark' : 'light'}
            className="hero-bg_wrap-cols-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {columns.map((col, colIndex) => (
              <div key={colIndex} className="hero-bg_wrap-col">
                <div className="hero-bg_wrap-slides v-scroll">
                  {col.images.map((src, i) => (
                    <div key={`a-${colIndex}-${i}`} className="hero-bg_wrap_slide">
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
                </div>
                <div className="hero-bg_wrap-slides v-scroll">
                  {col.images.map((src, i) => (
                    <div key={`b-${colIndex}-${i}`} className="hero-bg_wrap_slide">
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
