// Server-safe loading component for Suspense boundaries
export default function LoadingFallback({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-h-[400px] gap-6">
      <div className="relative">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Xentio Digital
        </h1>
      </div>
      <div className="relative w-14 h-14 sm:w-16 sm:h-16">
        <div className="absolute inset-0 border-4 border-primary-500/20 rounded-full animate-spin" />
        <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin" style={{ animationDuration: '1s' }} />
      </div>
      {message && (
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium text-center max-w-md">
          {message}
        </p>
      )}
    </div>
  )
}
