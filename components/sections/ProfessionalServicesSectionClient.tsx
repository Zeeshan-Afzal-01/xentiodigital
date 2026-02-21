'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './ProfessionalServicesSection.module.scss'

const SECTION_IMAGE =
  'https://www.digitalsilk.com/wp-content/uploads/2024/09/image-104-1.png'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
}

const lineDraw = {
  hidden: { scaleX: 0, opacity: 0.8 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerRow = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
}

const blockItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: 0.1 + i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

interface Props {
  title: string
  titleHighlight: string
  titleSuffix: string
  imageAlt: string
  items: Array<{ title: string; description: string }>
}

export default function ProfessionalServicesSectionClient({
  title,
  titleHighlight,
  titleSuffix,
  imageAlt,
  items,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} themeable-section themeable-professional-services`}
      aria-labelledby="professional-services-heading"
    >
      <div className={styles.container}>
        {/* Heading row: animated title + image */}
        <motion.div
          className={styles.headingRow}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.06 } },
            hidden: {},
          }}
        >
          <h2 id="professional-services-heading" className={styles.headingTitle}>
            <motion.span variants={fadeUp} custom={0}>
              {title}
              {titleHighlight ? ' ' : ''}
            </motion.span>
            {titleHighlight ? (
              <motion.span className={styles.headingHighlight} variants={fadeUp} custom={1}>
                {titleHighlight}
              </motion.span>
            ) : null}
            {titleSuffix ? (
              <motion.span variants={fadeUp} custom={2}>
                {' '}
                {titleSuffix}
              </motion.span>
            ) : null}
          </h2>
          <motion.div
            className={styles.imageWrap}
            variants={fadeUp}
            custom={2}
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Image
              src={SECTION_IMAGE}
              alt={imageAlt}
              width={400}
              height={192}
              sizes="(max-width: 767px) 120px, 200px"
              className={styles.imageSrc}
              priority={false}
            />
          </motion.div>
        </motion.div>

        {/* Gradient separator — line draw */}
        <motion.div
          className={styles.separator}
          aria-hidden
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={lineDraw}
          style={{ transformOrigin: 'left' }}
        />

        {/* Grid: staggered rows and blocks */}
        <div className={styles.gridWrap}>
          {[0, 1, 2, 3].map((rowIndex) => (
            <motion.div
              key={rowIndex}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={staggerRow}
              custom={rowIndex}
            >
              {rowIndex > 0 && (
                <motion.div
                  className={styles.separator}
                  aria-hidden
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={lineDraw}
                  style={{ transformOrigin: 'left' }}
                />
              )}
              <motion.div
                className={styles.blockRow}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {},
                }}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
              >
                {items.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, colIndex) => {
                  const num = rowIndex * 2 + colIndex + 1
                  const numStr = num < 10 ? `0${num}` : `${num}`
                  const itemIndex = rowIndex * 2 + colIndex
                  return (
                    <motion.div
                      key={num}
                      className={styles.blockCol}
                      variants={blockItem}
                      custom={itemIndex}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <motion.span
                        className={styles.number}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.5 }
                        }
                        transition={{
                          delay: 0.2 + itemIndex * 0.1,
                          type: 'spring',
                          stiffness: 200,
                          damping: 20,
                        }}
                        whileHover={{
                          scale: 1.08,
                          transition: { duration: 0.2 },
                        }}
                      >
                        {numStr}
                      </motion.span>
                      <h3 className={styles.subheading}>{item.title}</h3>
                      <div className={styles.description}>
                        <p>{item.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.separator}
          aria-hidden
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={lineDraw}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </section>
  )
}
