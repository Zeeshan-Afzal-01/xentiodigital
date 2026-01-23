import { generateSEOMetadata } from '@/lib/seo'
import Link from 'next/link'

export const metadata = generateSEOMetadata({
  title: 'Portfolio - Our Work & Case Studies',
  description: 'Explore our portfolio of successful projects including web development, mobile apps, eCommerce solutions, and custom software development.',
  path: '/portfolio',
})

const projects = [
  {
    title: 'E-Commerce Platform for RetailPro',
    description: 'A comprehensive eCommerce solution with custom inventory management, payment integration, and analytics dashboard.',
    results: '300% increase in online sales, 50% reduction in cart abandonment',
    category: 'eCommerce',
    image: '/portfolio/retailpro.jpg',
  },
  {
    title: 'Mobile App for Fitness Tracker',
    description: 'Cross-platform mobile application with real-time tracking, social features, and personalized workout plans.',
    results: '100K+ downloads, 4.8-star rating, 40% user retention rate',
    category: 'Mobile Apps',
    image: '/portfolio/fitness-app.jpg',
  },
  {
    title: 'Corporate Website Redesign',
    description: 'Complete website redesign with modern UI/UX, improved performance, and SEO optimization.',
    results: '250% increase in organic traffic, 60% improvement in page load speed',
    category: 'Web Development',
    image: '/portfolio/corporate-site.jpg',
  },
  {
    title: 'Custom CRM System',
    description: 'Enterprise CRM solution with lead management, sales pipeline, and reporting features.',
    results: '35% increase in sales productivity, 50% reduction in manual data entry',
    category: 'Custom Software',
    image: '/portfolio/crm-system.jpg',
  },
  {
    title: 'Restaurant Ordering Platform',
    description: 'Online ordering system with menu management, payment processing, and delivery tracking.',
    results: '200% increase in online orders, 90% customer satisfaction rate',
    category: 'Web Development',
    image: '/portfolio/restaurant-platform.jpg',
  },
  {
    title: 'Healthcare Management App',
    description: 'HIPAA-compliant mobile app for patient management, appointment scheduling, and telemedicine.',
    results: 'Streamlined operations, improved patient satisfaction, 30% time savings',
    category: 'Mobile Apps',
    image: '/portfolio/healthcare-app.jpg',
  },
]

export default function PortfolioPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            Explore our successful projects and see how we&apos;ve helped businesses achieve their digital goals
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
                <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">{project.title.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary-600 font-semibold">{project.category}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-1">Results:</p>
                    <p className="text-sm text-gray-700">{project.results}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help you achieve similar results.
          </p>
          <Link href="/contact" className="btn-primary">
            Get Started
          </Link>
        </div>
      </section>
    </>
  )
}
