import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-high-contrast mb-4">Service Not Found</h1>
        <p className="text-muted-enhanced mb-8">The service you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/services" className="btn-primary">
          Back to Services
        </Link>
      </div>
    </div>
  )
}
