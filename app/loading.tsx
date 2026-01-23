import LoadingFallback from '@/components/LoadingFallback'

/**
 * Shown during root-level route loading (first segment: [locale], admin, etc.)
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingFallback message="Loading..." />
    </div>
  )
}
