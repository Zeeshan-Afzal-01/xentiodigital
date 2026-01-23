import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Xentio Digital. Learn how we collect, use, and protect your personal information.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="section-padding bg-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-high-contrast mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none glass p-8 rounded-xl">
              <p className="text-sm text-muted-enhanced mb-8">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">1. Introduction</h2>
                <p className="text-muted-enhanced mb-4">
                  Xentio Digital (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-high-contrast mb-2">2.1 Personal Information</h3>
                <p className="text-muted-enhanced mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-muted-enhanced mb-4 space-y-2">
                  <li>Fill out contact forms or request information</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Use our services</li>
                  <li>Communicate with us via email or phone</li>
                </ul>
                <p className="text-muted-enhanced mb-4">
                  This information may include your name, email address, phone number, company name, and any other 
                  information you choose to provide.
                </p>

                <h3 className="text-xl font-semibold text-high-contrast mb-2">2.2 Automatically Collected Information</h3>
                <p className="text-muted-enhanced mb-4">
                  When you visit our website, we may automatically collect certain information about your device, 
                  including information about your web browser, IP address, time zone, and some of the cookies 
                  that are installed on your device.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-enhanced mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside text-muted-enhanced mb-4 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you marketing communications (with your consent)</li>
                  <li>Monitor and analyze usage patterns and trends</li>
                  <li>Detect, prevent, and address technical issues</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-muted-enhanced mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your 
                  information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-enhanced mb-4 space-y-2">
                  <li>With service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">5. Data Security</h2>
                <p className="text-muted-enhanced mb-4">
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information. However, no method of transmission over the Internet or electronic storage is 100% 
                  secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">6. Your Rights</h2>
                <p className="text-muted-enhanced mb-4">You have the right to:</p>
                <ul className="list-disc list-inside text-muted-enhanced mb-4 space-y-2">
                  <li>Access and receive a copy of your personal information</li>
                  <li>Rectify inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request restriction of processing</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">7. Cookies</h2>
                <p className="text-muted-enhanced mb-4">
                  We use cookies and similar tracking technologies to track activity on our website and store 
                  certain information. You can instruct your browser to refuse all cookies or to indicate when 
                  a cookie is being sent.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">8. Changes to This Privacy Policy</h2>
                <p className="text-muted-enhanced mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by 
                  posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">9. Contact Us</h2>
                <p className="text-muted-enhanced mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-muted-enhanced">
                  Email: <a href="mailto:privacy@xentiodigital.com" className="text-primary-400 hover:underline">privacy@xentiodigital.com</a><br />
                  Phone: <a href="tel:+1234567890" className="text-primary-400 hover:underline">+1 (234) 567-890</a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
