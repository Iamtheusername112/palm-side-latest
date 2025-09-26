'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-green-50'>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-amber-700 to-green-700 py-20 pt-32'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            Privacy Policy
          </h1>
          <p className='text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto'>
            Your privacy is important to us. Learn how we collect, use, and
            protect your information.
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
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                1. Information We Collect
              </h2>
              <p className='text-gray-600 mb-4'>
                We collect information you provide directly to us, such as when
                you create an account, contact us, or use our services. This may
                include:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Name and contact information</li>
                <li>Email address and phone number</li>
                <li>Property preferences and requirements</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                2. How We Use Your Information
              </h2>
              <p className='text-gray-600 mb-4'>
                We use the information we collect to:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                3. Information Sharing
              </h2>
              <p className='text-gray-600 mb-4'>
                We do not sell, trade, or otherwise transfer your personal
                information to third parties without your consent, except as
                described in this policy. We may share your information:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  With service providers who assist us in operating our website
                </li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                4. Data Security
              </h2>
              <p className='text-gray-600 mb-4'>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the internet is 100% secure.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                5. Your Rights
              </h2>
              <p className='text-gray-600 mb-4'>You have the right to:</p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                6. Cookies and Tracking
              </h2>
              <p className='text-gray-600 mb-4'>
                We use cookies and similar tracking technologies to enhance your
                experience on our website. You can control cookie settings
                through your browser preferences.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                7. Contact Us
              </h2>
              <p className='text-gray-600 mb-4'>
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-600'>
                  <strong>Email:</strong> privacy@palmside.com
                  <br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                  <br />
                  <strong>Address:</strong> 123 Palm Street, Miami, FL 33101
                </p>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                8. Changes to This Policy
              </h2>
              <p className='text-gray-600'>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date.
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

export default PrivacyPolicy
