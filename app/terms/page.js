'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Translate from '../../components/Translate'

const TermsOfService = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-green-50'>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-[#B08D57] py-20 pt-32'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            <Translate staticKey='terms.termsOfService'>
              Terms of Service
            </Translate>
          </h1>
          <p className='text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto'>
            <Translate staticKey='terms.termsDescription'>
              Please read these terms carefully before using our services.
            </Translate>
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
              <strong>
                <Translate staticKey='terms.lastUpdated'>
                  Last updated:
                </Translate>
              </strong>{' '}
              {new Date().toLocaleDateString()}
            </p>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.companyDetails'>
                  Company Details
                </Translate>
              </h2>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-600'>
                  <strong>
                    <Translate staticKey='terms.company'>Company:</Translate>
                  </strong>{' '}
                  Palmside S.L.
                  <br />
                  <strong>
                    <Translate staticKey='terms.registeredAddress'>
                      Registered address:
                    </Translate>
                  </strong>{' '}
                  Carrer de Ametler 3 -1B, ES-07609 Son Verí Nou, Islas Baleares
                  <br />
                  <strong>
                    <Translate staticKey='terms.phone'>Phone:</Translate>
                  </strong>{' '}
                  +49 176 534 85 055 / +34 609 06 93 67
                  <br />
                  <strong>
                    <Translate staticKey='terms.email'>Email:</Translate>
                  </strong>{' '}
                  <a
                    href='mailto:info@palmside.es'
                    className='text-yellow-700 hover:underline'
                  >
                    info@palmside.es
                  </a>
                </p>
              </div>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.acceptanceOfTerms'>
                  1. Acceptance of Terms
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.acceptanceDescription'>
                  By accessing and using Palmside S.L. services, you accept and
                  agree to be bound by the terms and provision of this
                  agreement. If you do not agree to abide by the above, please
                  do not use this service.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.descriptionOfService'>
                  2. Description of Service
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.descriptionOfServiceText'>
                  Palmside S.L. provides real estate services including but not
                  limited to:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='terms.propertySales'>
                    Property sales and purchases
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.investmentConsulting'>
                    Investment consulting
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.propertyManagement'>
                    Property management
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.marketAnalysis'>
                    Market analysis
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.legalSupport'>
                    Legal support and guidance
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.userResponsibilities'>
                  3. User Responsibilities
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.userResponsibilitiesText'>
                  As a user of our services, you agree to:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='terms.provideAccurateInfo'>
                    Provide accurate and complete information
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.lawfulPurposes'>
                    Use our services only for lawful purposes
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.respectRights'>
                    Respect the rights of other users
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.noFraudulent'>
                    Not engage in fraudulent or deceptive practices
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.complyLaws'>
                    Comply with all applicable laws and regulations
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.propertyInformation'>
                  4. Property Information
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.propertyInformationText'>
                  While we strive to provide accurate property information, we
                  cannot guarantee the completeness or accuracy of all property
                  details. Property information is subject to change without
                  notice. We recommend:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='terms.verifyDetails'>
                    Verifying all property details independently
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.conductInspections'>
                    Conducting your own inspections
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.consultAdvisors'>
                    Consulting with legal and financial advisors
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.reviewContracts'>
                    Reviewing all contracts carefully
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.limitationOfLiability'>
                  5. Limitation of Liability
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.limitationDescription'>
                  Palmside S.L. shall not be liable for any direct, indirect,
                  incidental, special, or consequential damages resulting from
                  the use or inability to use our services, including but not
                  limited to:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='terms.propertyValueFluctuations'>
                    Property value fluctuations
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.marketConditions'>
                    Market conditions
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.thirdPartyActions'>
                    Third-party actions or omissions
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.technicalIssues'>
                    Technical issues or service interruptions
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.intellectualProperty'>
                  6. Intellectual Property
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.intellectualPropertyText'>
                  All content, trademarks, and intellectual property on this
                  website are owned by Palmside S.L. or our licensors. You may
                  not:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='terms.noCopyContent'>
                    Copy, modify, or distribute our content without permission
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.noUseTrademarks'>
                    Use our trademarks or logos without authorization
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.noReverseEngineer'>
                    Reverse engineer or attempt to extract source code
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='terms.noRemoveNotices'>
                    Remove copyright or proprietary notices
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.privacyDataProtection'>
                  7. Privacy and Data Protection
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.privacyDataProtectionText'>
                  Your privacy is important to us. Our collection and use of
                  personal information is governed by our Privacy Policy, which
                  is incorporated into these Terms of Service by reference and
                  complies with the EU General Data Protection Regulation
                  (GDPR).
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.termination'>
                  8. Termination
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.terminationText'>
                  We reserve the right to terminate or suspend your access to
                  our services at any time, with or without notice, for any
                  reason, including violation of these terms.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.governingLaw'>
                  9. Governing Law
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.governingLawText'>
                  These Terms of Service are governed by and construed in
                  accordance with the laws of Spain and applicable European
                  Union law. Any disputes shall be subject to the exclusive
                  jurisdiction of the courts of Palma de Mallorca, Spain.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.contactInformation'>
                  10. Contact Information
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='terms.contactInformationText'>
                  If you have any questions about these Terms of Service, please
                  contact us:
                </Translate>
              </p>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-600'>
                  <strong>
                    <Translate staticKey='terms.company'>Company:</Translate>
                  </strong>{' '}
                  Palmside S.L.
                  <br />
                  <strong>
                    <Translate staticKey='terms.email'>Email:</Translate>
                  </strong>{' '}
                  <a
                    href='mailto:info@palmside.es'
                    className='text-yellow-700 hover:underline'
                  >
                    info@palmside.es
                  </a>
                  <br />
                  <strong>
                    <Translate staticKey='terms.phone'>Phone:</Translate>
                  </strong>{' '}
                  +49 176 534 85 055 / +34 609 06 93 67
                  <br />
                  <strong>
                    <Translate staticKey='terms.address'>Address:</Translate>
                  </strong>{' '}
                  Carrer de Ametler 3 -1B, ES-07609 Son Verí Nou, Islas Baleares
                </p>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='terms.changesToTerms'>
                  11. Changes to Terms
                </Translate>
              </h2>
              <p className='text-gray-600'>
                <Translate staticKey='terms.changesToTermsText'>
                  We reserve the right to modify these Terms of Service at any
                  time. We will notify users of any material changes by posting
                  the updated terms on this page and updating the "Last updated"
                  date.
                </Translate>
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
