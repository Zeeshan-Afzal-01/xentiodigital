import LoadingFallback from '@/components/LoadingFallback'

/**
 * Shown during [locale] route loading (home, about, services, blog, etc.)
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingFallback message="Loading..." />
    </div>
  )
}
