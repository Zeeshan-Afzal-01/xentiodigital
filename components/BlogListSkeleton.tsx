import Skeleton from '@/components/Skeleton'

/**
 * Skeleton for blog listing page (grid of cards).
 */
export default function BlogListSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-4" variant="rect" />
        <Skeleton className="h-5 w-full max-w-2xl" variant="line" />
        <Skeleton className="h-5 w-3/4 max-w-xl mt-2" variant="line" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-secondary)] p-0 flex flex-col"
          >
            <Skeleton className="h-48 w-full rounded-none" variant="rect" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-20" variant="rect" />
              <Skeleton className="h-6 w-full" variant="line" />
              <Skeleton className="h-6 w-4/5" variant="line" />
              <Skeleton className="h-4 w-full" variant="line" />
              <Skeleton className="h-4 w-2/3" variant="line" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-4 w-24" variant="line" />
                <Skeleton className="h-4 w-16" variant="line" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
