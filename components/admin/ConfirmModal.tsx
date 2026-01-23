'use client'

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
  loading,
}: {
  open: boolean
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  confirmVariant?: 'danger' | 'primary'
  onConfirm: () => void | Promise<void>
  onCancel: () => void
  loading?: boolean
}) {
  if (!open) return null

  const confirmClass =
    confirmVariant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 text-white'
      : 'bg-primary-600 hover:bg-primary-700 text-white'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative w-full max-w-md rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        {description ? (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
        ) : null}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg ${confirmClass} disabled:opacity-60`}
            disabled={loading}
          >
            {loading ? 'Please wait…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

