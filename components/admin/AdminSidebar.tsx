'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentAdmin, signOut } from '@/lib/admin-auth'
import { Icon, IconName } from '@/components/icons'

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'Dashboard' as IconName },
  { href: '/admin/blogs', label: 'Blogs', icon: 'Blog' as IconName },
  { href: '/admin/blogs/new', label: 'Add New Blog', icon: 'Add' as IconName },
  { href: '/admin/settings', label: 'Settings', icon: 'Settings' as IconName },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

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
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold gradient-text">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon name={item.icon} className="w-5 h-5" strokeWidth={2} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
            {email || 'Admin'}
          </div>
          <button
            onClick={async () => {
              await signOut()
              router.push('/admin/login')
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <Icon name="Logout" className="w-5 h-5" strokeWidth={2} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
