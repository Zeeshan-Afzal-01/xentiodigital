'use client'

import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

type Props = {
  value: string
  onChange: (url: string) => void
  disabled?: boolean
}

const ACCEPT = 'image/jpeg,image/png,image/webp,image/gif'

export default function CoverImageUpload({ value, onChange, disabled }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''

    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/admin/upload-cover', { method: 'POST', body: form })
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string }
      if (!res.ok) throw new Error(data?.error || 'Upload failed')
      onChange(data.url || '')
      toast.success('Cover image uploaded')
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-60 text-sm font-medium"
        >
          {uploading ? 'Uploading…' : 'Choose from computer'}
        </button>
        <span className="text-xs text-gray-500 dark:text-gray-400">JPEG, PNG, WebP or GIF, max 5MB</span>
      </div>
      {value ? (
        <div className="flex items-start gap-3">
          <img
            src={value}
            alt="Cover preview"
            className="h-20 w-32 object-cover rounded border border-gray-200 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            disabled={disabled}
            className="text-xs text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ) : null}
      <div>
        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Or paste image URL</label>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://… or /images/…"
          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 text-sm"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
