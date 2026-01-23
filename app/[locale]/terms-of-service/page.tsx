import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Xentio Digital. Please read these terms carefully before using our services.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function TermsOfServicePage() {
  return (
    <>
      <div className="section-padding bg-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-high-contrast mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none glass p-8 rounded-xl">
              <p className="text-sm text-muted-enhanced mb-8">Last updated: {new Date().toLocaleDateString()}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-enhanced mb-4">
                  By accessing or using the services of Xentio Digital (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), 
                  you agree to be bound by these Terms of Service. If you disagree with any part of these terms, 
                  then you may not access our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">2. Use of Services</h2>
                <p className="text-muted-enhanced mb-4">You agree to use our services only for lawful purposes and in accordance with these Terms.</p>
                <p className="text-muted-enhanced mb-4">You agree not to:</p>
                <ul className="list-disc list-inside text-muted-enhanced mb-4 space-y-2">
                  <li>Use our services in any way that violates any applicable law or regulation</li>
                  <li>Transmit any malicious code, viruses, or harmful data</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with or disrupt the integrity or performance of our services</li>
                  <li>Use our services to infringe upon the rights of others</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">3. Intellectual Property</h2>
                <p className="text-muted-enhanced mb-4">
                  All content, features, and functionality of our services, including but not limited to text, 
                  graphics, logos, and software, are owned by Xentio Digital and are protected by copyright, 
                  trademark, and other intellectual property laws.
                </p>
                <p className="text-muted-enhanced mb-4">
                  You may not reproduce, distribute, modify, or create derivative works of our content without 
                  our express written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">4. Service Availability</h2>
                <p className="text-muted-enhanced mb-4">
                  We strive to provide reliable and continuous access to our services. However, we do not 
                  guarantee that our services will be available at all times or that they will be free from 
                  errors, interruptions, or defects.
                </p>
                <p className="text-muted-enhanced mb-4">
                  We reserve the right to modify, suspend, or discontinue any part of our services at any 
                  time, with or without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">5. Client Projects</h2>
                <h3 className="text-xl font-semibold text-high-contrast mb-2">5.1 Project Scope</h3>
                <p className="text-muted-enhanced mb-4">
                  The scope of work for each project will be defined in a separate agreement or statement of work. 
                  Any changes to the scope may result in additional charges.
                </p>

                <h3 className="text-xl font-semibold text-high-contrast mb-2">5.2 Payment Terms</h3>
                <p className="text-muted-enhanced mb-4">
                  Payment terms will be specified in your project agreement. We typically require a deposit 
                  before work begins, with remaining payments due according to the agreed schedule.
                </p>

                <h3 className="text-xl font-semibold text-high-contrast mb-2">5.3 Ownership</h3>
                <p className="text-muted-enhanced mb-4">
                  Upon full payment, you will own the deliverables specified in your project agreement. 
                  We retain the right to use the work in our portfolio and for marketing purposes unless 
                  otherwise agreed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-enhanced mb-4">
                  To the maximum extent permitted by law, Xentio Digital shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
                  whether incurred directly or indirectly, or any loss of data, use, goodwill, or other 
                  intangible losses resulting from your use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">7. Indemnification</h2>
                <p className="text-muted-enhanced mb-4">
                  You agree to indemnify and hold harmless Xentio Digital from any claims, damages, losses, 
                  liabilities, and expenses (including legal fees) arising out of or related to your use of 
                  our services or violation of these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">8. Termination</h2>
                <p className="text-muted-enhanced mb-4">
                  We may terminate or suspend your access to our services immediately, without prior notice, 
                  for any breach of these Terms or for any other reason we deem necessary.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">9. Changes to Terms</h2>
                <p className="text-muted-enhanced mb-4">
                  We reserve the right to modify these Terms at any time. We will notify you of any material 
                  changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
                </p>
                <p className="text-muted-enhanced mb-4">
                  Your continued use of our services after any changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-high-contrast mb-4">10. Contact Information</h2>
                <p className="text-muted-enhanced mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <p className="text-muted-enhanced">
                  Email: <a href="mailto:legal@xentiodigital.com" className="text-primary-400 hover:underline">legal@xentiodigital.com</a><br />
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
