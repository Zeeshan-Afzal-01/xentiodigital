import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center section-padding">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-high-contrast mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-muted-enhanced mb-6">
          Blog Post Not Found
        </h2>
        <p className="text-muted-enhanced mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/blog"
          className="btn-primary"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  )
}
