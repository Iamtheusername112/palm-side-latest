'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TermsOfService = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-green-50'>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-amber-700 to-green-700 py-20 pt-32'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            Terms of Service
          </h1>
          <p className='text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto'>
            Please read these terms carefully before using our services.
          </p>
        </div>
        {/* Decorative Elements */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48'></div>
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <div className='prose prose-lg max-w-none'>
            <p className='text-gray-600 mb-6'>
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Company Details</h2>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-600'>
                  <strong>Company:</strong> Palmside S.L.<br />
                  <strong>Registered address:</strong> Carrer de Ametler 3 -1B, ES-07609 Son Verí Nou, Islas Baleares<br />
                  <strong>Phone:</strong> +49 176 534 85 055 / +34 609 06 93 67<br />
                  <strong>Email:</strong> <a href='mailto:info@palmside.es' className='text-yellow-700 hover:underline'>info@palmside.es</a>
                </p>
              </div>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                1. Acceptance of Terms
              </h2>
              <p className='text-gray-600 mb-4'>
                By accessing and using Palmside Real Estate services, you accept
                and agree to be bound by the terms and provision of this
                agreement. If you do not agree to abide by the above, please do
                not use this service.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                2. Description of Service
              </h2>
              <p className='text-gray-600 mb-4'>
                Palmside Real Estate provides real estate services including but
                not limited to:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Property sales and purchases</li>
                <li>Investment consulting</li>
                <li>Property management</li>
                <li>Market analysis</li>
                <li>Legal support and guidance</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                3. User Responsibilities
              </h2>
              <p className='text-gray-600 mb-4'>
                As a user of our services, you agree to:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Provide accurate and complete information</li>
                <li>Use our services only for lawful purposes</li>
                <li>Respect the rights of other users</li>
                <li>Not engage in fraudulent or deceptive practices</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                4. Property Information
              </h2>
              <p className='text-gray-600 mb-4'>
                While we strive to provide accurate property information, we
                cannot guarantee the completeness or accuracy of all property
                details. Property information is subject to change without
                notice. We recommend:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Verifying all property details independently</li>
                <li>Conducting your own inspections</li>
                <li>Consulting with legal and financial advisors</li>
                <li>Reviewing all contracts carefully</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                5. Limitation of Liability
              </h2>
              <p className='text-gray-600 mb-4'>
                Palmside Real Estate shall not be liable for any direct,
                indirect, incidental, special, or consequential damages
                resulting from the use or inability to use our services,
                including but not limited to:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Property value fluctuations</li>
                <li>Market conditions</li>
                <li>Third-party actions or omissions</li>
                <li>Technical issues or service interruptions</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                6. Intellectual Property
              </h2>
              <p className='text-gray-600 mb-4'>
                All content, trademarks, and intellectual property on this
                website are owned by Palmside Real Estate or our licensors. You
                may not:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  Copy, modify, or distribute our content without permission
                </li>
                <li>Use our trademarks or logos without authorization</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Remove copyright or proprietary notices</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                7. Privacy and Data Protection
              </h2>
              <p className='text-gray-600 mb-4'>
                Your privacy is important to us. Our collection and use of personal information is governed by
                our Privacy Policy, which is incorporated into these Terms of Service by reference and complies
                with the EU General Data Protection Regulation (GDPR).
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                8. Termination
              </h2>
              <p className='text-gray-600 mb-4'>
                We reserve the right to terminate or suspend your access to our
                services at any time, with or without notice, for any reason,
                including violation of these terms.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                9. Governing Law
              </h2>
              <p className='text-gray-600 mb-4'>
                These Terms of Service are governed by and construed in accordance with the laws of Spain and
                applicable European Union law. Any disputes shall be subject to the exclusive jurisdiction of
                the courts of Palma de Mallorca, Spain.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                10. Contact Information
              </h2>
              <p className='text-gray-600 mb-4'>
                If you have any questions about these Terms of Service, please
                contact us:
              </p>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-600'>
                  <strong>Company:</strong> Palmside S.L.<br />
                  <strong>Email:</strong> <a href='mailto:info@palmside.es' className='text-yellow-700 hover:underline'>info@palmside.es</a><br />
                  <strong>Phone:</strong> +49 176 534 85 055 / +34 609 06 93 67<br />
                  <strong>Address:</strong> Carrer de Ametler 3 -1B, ES-07609 Son Verí Nou, Islas Baleares
                </p>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                11. Changes to Terms
              </h2>
              <p className='text-gray-600'>
                We reserve the right to modify these Terms of Service at any
                time. We will notify users of any material changes by posting
                the updated terms on this page and updating the "Last updated"
                date.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default TermsOfService
