import Skeleton from '@/components/Skeleton'

/**
 * Skeleton for single blog post page (article layout).
 */
export default function BlogPostSkeleton() {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <header className="mb-8">
        <Skeleton className="h-5 w-24 mb-4" variant="rect" />
        <Skeleton className="h-10 w-full max-w-3xl mb-4" variant="rect" />
        <Skeleton className="h-10 w-4/5 max-w-2xl mb-4" variant="rect" />
        <div className="flex flex-wrap gap-4">
          <Skeleton className="h-5 w-28" variant="line" />
          <Skeleton className="h-5 w-32" variant="line" />
          <Skeleton className="h-5 w-20" variant="line" />
        </div>
      </header>
      <Skeleton className="h-64 md:h-96 w-full rounded-xl mb-8" variant="rect" />
      <div className="space-y-4 prose dark:prose-invert max-w-none">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Skeleton
            key={i}
            className={`h-4 ${i === 3 ? 'w-4/5' : 'w-full'}`}
            variant="line"
          />
        ))}
      </div>
      <div className="mt-12 pt-8 border-t border-[var(--border-default)]">
        <Skeleton className="h-8 w-48 mb-4" variant="rect" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" variant="circle" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" variant="line" />
            <Skeleton className="h-3 w-24" variant="line" />
          </div>
        </div>
      </div>
    </article>
  )
}
