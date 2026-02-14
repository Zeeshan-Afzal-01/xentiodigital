import Skeleton from '@/components/Skeleton'

/**
 * Full-page skeleton for root app/loading (before [locale] layout mounts).
 * Includes navbar strip so the page doesn’t look blank.
 */
export default function RootLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="sticky top-0 z-10 border-b border-[var(--border-default)] bg-[var(--bg-primary)]/95 backdrop-blur">
        <div className="flex justify-between items-center h-16 md:h-20 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-40" variant="rect" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-24" variant="rect" />
            <Skeleton className="h-10 w-10 rounded-full" variant="circle" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4 max-w-md" variant="rect" />
          <Skeleton className="h-4 w-full max-w-2xl" variant="line" />
          <Skeleton className="h-4 w-full max-w-2xl" variant="line" />
          <Skeleton className="h-4 w-2/3 max-w-xl" variant="line" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full" variant="rect" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
