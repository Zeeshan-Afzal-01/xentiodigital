'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getCurrentAdmin } from '@/lib/admin-auth'

export default function AdminSettingsPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    getCurrentAdmin()
      .then((a) => {
        if (mounted) setEmail(a?.email || null)
      })
      .catch(() => {
        if (mounted) setEmail(null)
      })
    return () => {
      mounted = false
    }
  }, [])

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Settings saved')
      setLoading(false)
    }, 400)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Admin Account</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Signed in as</span>
            <span className="font-medium text-gray-900 dark:text-white">{email || '—'}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Admin access is controlled by Firebase Authentication + your Firestore `admins/{'{uid}'}` allowlist.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">System</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Environment</span>
            <span className="font-medium text-gray-900 dark:text-white">{process.env.NODE_ENV || 'development'}</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Blog Defaults</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Default Category</label>
            <select className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700">
              <option>SEO</option>
              <option>Digital Marketing</option>
              <option>Web Development</option>
              <option>E-commerce</option>
              <option>Business Growth</option>
              <option>AI & Automation</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Default Status</label>
            <select className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
            {loading ? 'Saving…' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  )
}

