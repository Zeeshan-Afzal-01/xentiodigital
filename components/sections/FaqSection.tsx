'use client'

import { useTranslations } from 'next-intl'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

type FaqItem = { question: string; answer: string }

export default function FaqSection() {
  const t = useTranslations('faq')
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const items = (t.raw('items') as FaqItem[]) ?? []
  const list = Array.isArray(items) ? items : []

  return (
    <motion.section
      ref={sectionRef}
      className="faq-section themeable-section"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      aria-labelledby="faq-heading"
    >
      <div className="faq-section__bg" aria-hidden />
      <div className="faq-section__container">
        <motion.h2
          id="faq-heading"
          className="faq-section__title"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {t('title')}
        </motion.h2>
        <ul className="faq-section__list">
          {list.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <li key={index} className="faq-section__item">
                <motion.div
                  className="faq-section__card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <button
                    type="button"
                    className="faq-section__trigger"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    id={`faq-question-${index}`}
                  >
                    <span className="faq-section__number">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="faq-section__question">{item.question}</span>
                    <span className="faq-section__icon" aria-hidden>
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-question-${index}`}
                        className="faq-section__answer-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
                      >
                        <p className="faq-section__answer">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.section>
  )
}
