import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import { requireAdminOrRedirect } from '@/lib/admin-server-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side auth validation BEFORE render (real protection)
  await requireAdminOrRedirect()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

