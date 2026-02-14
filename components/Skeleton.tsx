interface SkeletonProps {
  className?: string
  /** 'line' | 'circle' | 'rect' - line is default, circle for avatars, rect for images/cards */
  variant?: 'line' | 'circle' | 'rect'
}

export default function Skeleton({ className = '', variant = 'line' }: SkeletonProps) {
  const variantClass =
    variant === 'line' ? 'h-4' : variant === 'circle' ? 'rounded-full' : 'rounded-lg'
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${variantClass} ${className}`.trim()}
    />
  )
}
