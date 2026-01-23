/**
 * RTL-aware animation utilities
 * Ensures animations work correctly in both LTR and RTL
 */

import { isRTL } from './translation'

/**
 * Get direction-aware slide animation
 */
export function getSlideAnimation(locale: string, distance: number = 50) {
  const isRtl = isRTL(locale)
  
  return {
    initial: {
      opacity: 0,
      x: isRtl ? distance : -distance,
    },
    animate: {
      opacity: 1,
      x: 0,
    },
    exit: {
      opacity: 0,
      x: isRtl ? -distance : distance,
    },
  }
}

/**
 * Get direction-aware transform origin
 */
export function getTransformOrigin(locale: string): string {
  return isRTL(locale) ? 'right center' : 'left center'
}

/**
 * Get direction-aware scale animation
 */
export function getScaleAnimation(locale: string) {
  return {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  }
}

/**
 * Disable animations during language switch
 */
export function shouldDisableAnimations(isLanguageSwitching: boolean): boolean {
  return isLanguageSwitching
}
