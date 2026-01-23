'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Admin error</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Something went wrong while loading this admin page.
      </p>
      <button onClick={reset} className="btn-primary">
        Retry
      </button>
    </div>
  )
}

