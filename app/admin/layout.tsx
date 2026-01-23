import AdminProviders from '@/components/admin/AdminProviders'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProviders>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
    </AdminProviders>
  )
}
