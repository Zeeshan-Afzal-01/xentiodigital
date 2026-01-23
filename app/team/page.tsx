import { generateSEOMetadata } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'Our Team - Meet the Experts',
  description: 'Meet the talented team of developers, designers, and digital experts behind Xentio Digital.',
  path: '/team',
})

const teamMembers = [
  {
    name: 'John Smith',
    role: 'CEO & Founder',
    bio: 'With over 15 years of experience in digital services, John leads our team with a vision for innovation and client success.',
    photo: '/team/john-smith.jpg',
  },
  {
    name: 'Sarah Williams',
    role: 'Head of Development',
    bio: 'Sarah brings expertise in modern web technologies and leads our development team in creating cutting-edge solutions.',
    photo: '/team/sarah-williams.jpg',
  },
  {
    name: 'Michael Brown',
    role: 'Lead Designer',
    bio: 'Michael is passionate about creating beautiful, user-centered designs that solve real business problems.',
    photo: '/team/michael-brown.jpg',
  },
  {
    name: 'Emily Davis',
    role: 'Marketing Director',
    bio: 'Emily specializes in SEO and digital marketing strategies that drive measurable results for our clients.',
    photo: '/team/emily-davis.jpg',
  },
  {
    name: 'David Martinez',
    role: 'Mobile App Lead',
    bio: 'David is an expert in mobile app development, creating native and cross-platform solutions for iOS and Android.',
    photo: '/team/david-martinez.jpg',
  },
  {
    name: 'Jessica Taylor',
    role: 'Project Manager',
    bio: 'Jessica ensures smooth project delivery, keeping clients informed and projects on track from start to finish.',
    photo: '/team/jessica-taylor.jpg',
  },
]

export default function TeamPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white section-padding">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            Talented professionals dedicated to delivering exceptional digital solutions
          </p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                <div className="h-64 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-600">{member.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want to Join Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join our growing team.
          </p>
          <a href="/careers" className="btn-primary">
            View Open Positions
          </a>
        </div>
      </section>
    </>
  )
}
