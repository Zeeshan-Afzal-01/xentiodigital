import Skeleton from '@/components/Skeleton'

/**
 * Main content skeleton for [locale] route loading.
 * Used inside layout (Navbar + main + Footer); only content area.
 */
export default function PageSkeleton() {
  return (
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
  )
}
