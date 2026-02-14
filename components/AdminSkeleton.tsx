import Skeleton from '@/components/Skeleton'

/**
 * Skeleton for admin (protected) route loading.
 * Sidebar strip + header + content blocks.
 */
export default function AdminSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <div className="hidden lg:flex flex-col w-64 border-r border-gray-200 dark:border-gray-800 p-4 space-y-4">
        <Skeleton className="h-8 w-32" variant="rect" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-full" variant="rect" />
        ))}
      </div>
      <div className="flex-1">
        <div className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-6">
          <Skeleton className="h-8 w-48" variant="rect" />
        </div>
        <main className="p-6 space-y-6">
          <Skeleton className="h-8 w-64" variant="rect" />
          <Skeleton className="h-32 w-full" variant="rect" />
          <Skeleton className="h-32 w-full" variant="rect" />
        </main>
      </div>
    </div>
  )
}
