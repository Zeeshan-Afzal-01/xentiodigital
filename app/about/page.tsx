import { generateSEOMetadata } from '@/lib/seo'
import Hero from '@/components/Hero'

export const metadata = generateSEOMetadata({
  title: 'About Us - Your Trusted Digital Partner',
  description: 'Learn about Xentio Digital - our mission, vision, and commitment to delivering exceptional digital solutions that drive business growth.',
  path: '/about',
})

const values = [
  {
    title: 'Innovation',
    description: 'We stay ahead of the curve by embracing new technologies and creative solutions.',
  },
  {
    title: 'Excellence',
    description: 'We strive for perfection in every project, ensuring the highest quality deliverables.',
  },
  {
    title: 'Integrity',
    description: 'We build trust through transparency, honesty, and ethical business practices.',
  },
  {
    title: 'Partnership',
    description: 'We view every client relationship as a long-term partnership, not just a transaction.',
  },
]

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Xentio Digital"
        subtitle="We're a team of passionate digital experts dedicated to helping businesses succeed online"
      />

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To empower businesses of all sizes with cutting-edge digital solutions that drive growth, 
                enhance customer experiences, and create lasting value. We believe that every business 
                deserves access to world-class digital services, regardless of their size or industry.
              </p>
              <p className="text-lg text-gray-700">
                Our mission is to bridge the gap between complex technology and business success, 
                making digital transformation accessible, understandable, and achievable for everyone.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-lg text-gray-700 mb-6">
                To become the most trusted digital services partner globally, recognized for our 
                innovation, reliability, and unwavering commitment to client success. We envision 
                a future where every business can leverage digital technology to its full potential.
              </p>
              <p className="text-lg text-gray-700">
                Through continuous innovation, exceptional service delivery, and strategic partnerships, 
                we aim to shape the future of digital business solutions and set new industry standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-700 mb-4">
                Xentio Digital was founded in 2015 with a simple yet powerful vision: to make 
                enterprise-grade digital solutions accessible to businesses of all sizes. What 
                started as a small team of passionate developers and designers has grown into 
                a full-service digital agency serving clients across multiple industries.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Over the years, we&apos;ve completed hundreds of successful projects, from 
                small business websites to complex enterprise applications. Our commitment to 
                quality, innovation, and client satisfaction has earned us a reputation as a 
                trusted partner in digital transformation.
              </p>
              <p className="text-lg text-gray-700">
                Today, we continue to evolve, staying at the forefront of technology trends 
                while maintaining our core values of integrity, excellence, and partnership. 
                We&apos;re not just service providers—we&apos;re your digital growth partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Xentio Digital?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-xl mb-2">Projects Completed</div>
              <p className="text-primary-100">Successfully delivered projects across various industries</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-xl mb-2">Client Satisfaction</div>
              <p className="text-primary-100">Our clients consistently rate us highly for quality and service</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-xl mb-2">Expert Team Members</div>
              <p className="text-primary-100">Dedicated professionals with diverse expertise</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
