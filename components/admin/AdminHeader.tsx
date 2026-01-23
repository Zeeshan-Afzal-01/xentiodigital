'use client'

import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/ThemeToggle'
import { getCurrentAdmin, signOut } from '@/lib/admin-auth'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/icons'

export default function AdminHeader() {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    getCurrentAdmin()
      .then((admin) => {
        if (mounted) setEmail(admin?.email || null)
      })
      .catch(() => {
        if (mounted) setEmail(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Admin Dashboard
        </h2>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button
            type="button"
            onClick={async () => {
              await signOut()
              router.push('/admin/login')
            }}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon name="Logout" className="w-4 h-4" strokeWidth={2} />
            <span className="text-sm font-medium">Logout</span>
          </button>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {email || ''}
          </div>
        </div>
      </div>
    </header>
  )
}
