import { generateSEOMetadata } from '@/lib/seo'
import Link from 'next/link'

export const metadata = generateSEOMetadata({
  title: 'Careers - Join Our Team',
  description: 'Explore career opportunities at Xentio Digital. Join our team of talented developers, designers, and digital experts.',
  path: '/careers',
})

const openPositions = [
  {
    title: 'Senior Full-Stack Developer',
    department: 'Development',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    description: 'We are looking for an experienced full-stack developer to join our development team. You will work on exciting projects using modern technologies like React, Next.js, Node.js, and more.',
    requirements: [
      '5+ years of experience in full-stack development',
      'Strong knowledge of React, Next.js, and Node.js',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Familiarity with cloud platforms (AWS, Vercel)',
      'Excellent problem-solving and communication skills',
    ],
  },
  {
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    description: 'Join our design team to create beautiful, user-centered interfaces. You will work closely with clients and developers to bring designs to life.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Adobe XD, or similar tools',
      'Strong portfolio demonstrating user-centered design',
      'Understanding of responsive design principles',
      'Excellent collaboration and presentation skills',
    ],
  },
  {
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Help our clients grow their online presence through SEO, content marketing, and digital advertising strategies.',
    requirements: [
      '3+ years of digital marketing experience',
      'Strong SEO and SEM knowledge',
      'Experience with Google Analytics and marketing tools',
      'Content creation and copywriting skills',
      'Data-driven approach to marketing',
    ],
  },
  {
    title: 'Mobile App Developer',
    department: 'Development',
    location: 'Remote / Hybrid',
    type: 'Full-time',
    description: 'Develop native and cross-platform mobile applications for iOS and Android. Work on exciting projects that reach millions of users.',
    requirements: [
      '4+ years of mobile app development experience',
      'Proficiency in React Native, Swift, or Kotlin',
      'Experience with app store submission and deployment',
      'Understanding of mobile UI/UX best practices',
      'Strong debugging and problem-solving skills',
    ],
  },
]

export default function CareersPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our Team
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            Build your career with us and help shape the future of digital services
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Growth Opportunities</h3>
                  <p className="text-gray-600">Continuous learning and career development</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Work</h3>
                  <p className="text-gray-600">Remote and hybrid work options</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Great Culture</h3>
                  <p className="text-gray-600">Collaborative and supportive team environment</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-8">Open Positions</h2>
            <div className="space-y-6">
              {openPositions.map((position, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{position.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {position.requirements.map((req, reqIndex) => (
                        <li key={reqIndex}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href="/contact"
                    className="btn-primary inline-block"
                  >
                    Apply Now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Don&apos;t See a Position That Fits?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals. Send us your resume and we&apos;ll keep you in mind for future opportunities.
          </p>
          <Link href="/contact" className="btn-primary">
            Send Your Resume
          </Link>
        </div>
      </section>
    </>
  )
}
