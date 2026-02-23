'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLocale, useTranslations } from 'next-intl'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Icon } from '@/components/icons'

// Set your Mapbox token here or use environment variable
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoieGVudGlvZGlnaXRhbCIsImEiOiJjbGV4YWJjM2owMGN0M3BwN2N4ZzJ0Y2N0In0.example'

export default function OfficeMapContent() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const locale = useLocale()
  const t = useTranslations('office')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || !mapContainer.current) return

    mapboxgl.accessToken = MAPBOX_TOKEN

    // Office coordinates
    const officeCoords: [number, number] = [-122.4194, 37.7749] // San Francisco (update with your location)

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
      center: officeCoords,
      zoom: 15,
      pitch: 45,
      bearing: -17.6,
    })

    // Add 3D buildings
    map.current.on('load', () => {
      if (map.current) {
        map.current.addLayer({
          id: '3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 14,
          paint: {
            'fill-extrusion-color': theme === 'dark' ? '#1e293b' : '#e2e8f0',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        })
      }
    })

    // Add pulsing marker
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.innerHTML = `
      <div class="marker-pulse"></div>
      <div class="marker-icon" aria-hidden="true"></div>
    `

    marker.current = new mapboxgl.Marker(el)
      .setLngLat(officeCoords)
      .addTo(map.current)

    // Add popup (translated)
    const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false })
      .setLngLat(officeCoords)
      .setHTML(`
        <div class="p-4">
          <h3 class="font-bold text-lg mb-2">${t('companyName')}</h3>
          <p class="text-sm text-muted-enhanced">${t('addressLine1')}</p>
          <p class="text-sm text-muted-enhanced">${t('addressLine2')}</p>
          <p class="text-sm text-muted-enhanced">${t('country')}</p>
        </div>
      `)
      .addTo(map.current)

    return () => {
      map.current?.remove()
    }
  }, [mounted, theme, locale, t])

  return (
    <>
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-background to-secondary-900/30" />
        <div className="container-custom relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="gradient-text">{t('title')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-enhanced max-w-3xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      <section className="section-padding relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="glass-premium rounded-3xl overflow-hidden border border-black/10 dark:border-white/10">
                <div
                  ref={mapContainer}
                  className="w-full h-[600px] relative"
                  style={{ minHeight: '600px' }}
                />
              </div>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="glass-premium rounded-3xl p-8 border border-black/10 dark:border-white/10">
                <h2 className="text-2xl font-bold text-high-contrast mb-6">{t('officeInformation')}</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-high-contrast mb-2 flex items-center">
                      <Icon name="Pin" className="mr-3 w-5 h-5" strokeWidth={2} /> {t('address')}
                    </h3>
                    <p className="text-muted-enhanced">
                      {t('addressLine1')}<br />
                      {t('addressLine2')}<br />
                      {t('country')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-high-contrast mb-2 flex items-center">
                      <Icon name="Clock" className="mr-3 w-5 h-5" strokeWidth={2} /> {t('officeHours')}
                    </h3>
                    <p className="text-muted-enhanced">
                      {t('hoursWeekday')}<br />
                      {t('hoursSaturday')}<br />
                      {t('hoursSunday')}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-high-contrast mb-2 flex items-center">
                      <Icon name="Phone" className="mr-3 w-5 h-5" strokeWidth={2} /> {t('contact')}
                    </h3>
                    <p className="text-muted-enhanced">
                      <a href="tel:+1234567890" className="hover:text-primary-400 transition-colors">
                        +1 (234) 567-890
                      </a>
                      <br />
                      <a
                        href="mailto:info@xentiodigital.com"
                        className="hover:text-primary-400 transition-colors"
                      >
                        info@xentiodigital.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="glass-premium rounded-3xl p-6 border border-black/10 dark:border-white/10 text-center"
              >
                <h3 className="text-lg font-semibold text-high-contrast mb-4">{t('getDirections')}</h3>
                <a
                  href="https://maps.google.com/?q=123+Digital+Street+Tech+City"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full"
                >
                  {t('openInGoogleMaps')}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .custom-marker {
          position: relative;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .marker-pulse {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(124, 58, 237, 0.4);
          animation: pulse 2s infinite;
        }

        .marker-icon {
          position: relative;
          z-index: 1;
          width: 14px;
          height: 14px;
          border-radius: 9999px;
          background: rgba(124, 58, 237, 0.95);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
        }

        .marker-icon::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 6px;
          height: 6px;
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.95);
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .mapboxgl-popup-content {
          background: rgba(255, 255, 255, 0.1) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 12px !important;
          color: inherit !important;
        }

        .mapboxgl-popup-tip {
          border-top-color: rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>
    </>
  )
}
