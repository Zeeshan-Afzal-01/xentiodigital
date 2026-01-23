/**
 * RTL/LTR utility functions
 * Helper functions for direction-aware layouts
 */

import { isRTL } from './translation'

/**
 * Get direction-aware class names
 */
export function getDirectionClasses(locale: string, ltrClass: string, rtlClass: string): string {
  return isRTL(locale) ? rtlClass : ltrClass
}

/**
 * Get logical margin/padding classes
 * Use with Tailwind's logical properties
 */
export function getLogicalSpacing(locale: string) {
  return {
    start: isRTL(locale) ? 'mr' : 'ml',
    end: isRTL(locale) ? 'ml' : 'mr',
    paddingStart: isRTL(locale) ? 'pr' : 'pl',
    paddingEnd: isRTL(locale) ? 'pl' : 'pr',
  }
}

/**
 * Get transform origin based on direction
 */
export function getTransformOrigin(locale: string): string {
  return isRTL(locale) ? 'origin-right' : 'origin-left'
}

/**
 * Get animation direction
 */
export function getAnimationDirection(locale: string, ltrValue: number, rtlValue: number): number {
  return isRTL(locale) ? rtlValue : ltrValue
}

/**
 * Flip icon/arrow based on direction
 */
export function getIconFlip(locale: string): string {
  return isRTL(locale) ? 'scale-x-[-1]' : ''
}
