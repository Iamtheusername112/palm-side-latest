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
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>Who We Are (Data Controller)</h2>
              <p className='text-gray-600'>
                This Privacy Policy describes how Palmside S.L. ("we", "us", "our") collects and processes
                your personal data when you use our website and app or contact us. Palmside S.L. is the data
                controller responsible for your personal data.
              </p>
              <div className='bg-gray-50 rounded-lg p-4 mt-4'>
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
                1. Information We Collect
              </h2>
              <p className='text-gray-600 mb-4'>
                We collect information you provide directly to us when you submit the contact form, call us,
                or email us. This may include:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Name and surname</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Message content and subject of inquiry</li>
                <li>Optional property preferences or requirements you decide to share</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                2. How We Use Your Information
              </h2>
              <p className='text-gray-600 mb-4'>
                We use your information to:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Respond to your inquiries sent via the contact form, phone, or email</li>
                <li>Provide requested information about properties and services</li>
                <li>Improve our website/app and customer support</li>
                <li>Comply with legal and regulatory obligations</li>
              </ul>
              <p className='text-gray-600 mt-4'>
                We do not sell your personal data.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>3. Legal Bases (GDPR)</h2>
              <p className='text-gray-600 mb-4'>
                We process your personal data under the following legal bases (GDPR Art. 6):
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li><strong>Consent</strong> when you submit the contact form or request a call-back.</li>
                <li><strong>Legitimate interests</strong> to respond to your inquiries and operate our business.</li>
                <li><strong>Legal obligation</strong> where processing is necessary to comply with applicable laws.</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                4. Information Sharing
              </h2>
              <p className='text-gray-600 mb-4'>
                We do not sell your personal information. We may share your information only as necessary:
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>With trusted service providers (e.g., hosting, email delivery) acting as processors</li>
                <li>When required by law, court order, or public authority</li>
                <li>In connection with corporate transactions (merger, acquisition) subject to safeguards</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>5. Data Retention</h2>
              <p className='text-gray-600'>
                We retain your personal data only for as long as necessary to respond to your inquiry and for
                a reasonable period thereafter to maintain records and comply with legal obligations. We delete
                or anonymize data when it is no longer needed.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                6. Data Security
              </h2>
              <p className='text-gray-600 mb-4'>
                We implement appropriate security measures to protect your
                personal information against unauthorized access, alteration,
                disclosure, or destruction. However, no method of transmission
                over the internet is 100% secure.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>7. International Data Transfers</h2>
              <p className='text-gray-600'>
                If personal data is transferred outside the EU/EEA, we will ensure appropriate safeguards are
                in place (e.g., EU Standard Contractual Clauses) and that your rights remain protected.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                8. Your Rights (GDPR)
              </h2>
              <p className='text-gray-600 mb-4'>You have the right to:</p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>Access and update your personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Restrict or object to processing in certain circumstances</li>
              </ul>
              <p className='text-gray-600 mt-4'>
                To exercise your rights, contact us at <a href='mailto:info@palmside.es' className='text-yellow-700 hover:underline'>info@palmside.es</a>.
                You also have the right to lodge a complaint with your local data protection authority. In Spain,
                this is the Agencia Española de Protección de Datos (AEPD).
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                9. Cookies and Tracking
              </h2>
              <p className='text-gray-600 mb-4'>
                We use cookies and similar tracking technologies to enhance your
                experience on our website. You can control cookie settings
                through your browser preferences.
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                10. Contact Us
              </h2>
              <p className='text-gray-600 mb-4'>
                If you have any questions about this Privacy Policy, please
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
                11. Changes to This Policy
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
