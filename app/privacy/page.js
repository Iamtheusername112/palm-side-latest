'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Translate from '../../components/Translate'

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-green-50'>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-[#B08D57] py-20 pt-32'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            <Translate staticKey='privacy.privacyPolicy'>
              Privacy Policy
            </Translate>
          </h1>
          <p className='text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto'>
            <Translate staticKey='privacy.privacyDescription'>
              Your privacy is important to us. Learn how we collect, use, and
              protect your information.
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
                <Translate staticKey='privacy.lastUpdated'>
                  Last updated:
                </Translate>
              </strong>{' '}
              {new Date().toLocaleDateString()}
            </p>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.dataController'>
                  Who We Are (Data Controller)
                </Translate>
              </h2>
              <p className='text-gray-600'>
                <Translate staticKey='privacy.dataControllerDescription'>
                  This Privacy Policy describes how Palmside S.L. ("we", "us",
                  "our") collects and processes your personal data when you use
                  our website and app or contact us. Palmside S.L. is the data
                  controller responsible for your personal data.
                </Translate>
              </p>
              <div className='bg-gray-50 rounded-lg p-4 mt-4'>
                <p className='text-gray-600'>
                  <strong>
                    <Translate staticKey='privacy.company'>Company:</Translate>
                  </strong>{' '}
                  Palmside S.L.
                  <br />
                  <strong>
                    <Translate staticKey='privacy.registeredAddress'>
                      Registered address:
                    </Translate>
                  </strong>{' '}
                  Carrer de Ametler 3 -1B, ES-07609 Son Verí Nou, Islas Baleares
                  <br />
                  <strong>
                    <Translate staticKey='privacy.phone'>Phone:</Translate>
                  </strong>{' '}
                  +49 176 534 85 055 / +34 609 06 93 67
                  <br />
                  <strong>
                    <Translate staticKey='privacy.email'>Email:</Translate>
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
                <Translate staticKey='privacy.informationWeCollect'>
                  1. Information We Collect
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.informationWeCollectDescription'>
                  We collect information you provide directly to us when you
                  submit the contact form, call us, or email us. This may
                  include:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='privacy.nameSurname'>
                    Name and surname
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.emailAddress'>
                    Email address
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.phoneNumber'>
                    Phone number
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.messageContent'>
                    Message content and subject of inquiry
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.propertyPreferences'>
                    Optional property preferences or requirements you decide to
                    share
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.howWeUseInformation'>
                  2. How We Use Your Information
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.weUseInformationTo'>
                  We use your information to:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='privacy.respondToInquiries'>
                    Respond to your inquiries sent via the contact form, phone,
                    or email
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.provideInformation'>
                    Provide requested information about properties and services
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.improveWebsite'>
                    Improve our website/app and customer support
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.complyLegal'>
                    Comply with legal and regulatory obligations
                  </Translate>
                </li>
              </ul>
              <p className='text-gray-600 mt-4'>
                <Translate staticKey='privacy.doNotSell'>
                  We do not sell your personal data.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.legalBases'>
                  3. Legal Bases (GDPR)
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.legalBasesDescription'>
                  We process your personal data under the following legal bases
                  (GDPR Art. 6):
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <strong>
                    <Translate staticKey='privacy.consent'>Consent</Translate>
                  </strong>{' '}
                  <Translate staticKey='privacy.consentDescription'>
                    when you submit the contact form or request a call-back.
                  </Translate>
                </li>
                <li>
                  <strong>
                    <Translate staticKey='privacy.legitimateInterests'>
                      Legitimate interests
                    </Translate>
                  </strong>{' '}
                  <Translate staticKey='privacy.legitimateInterestsDescription'>
                    to respond to your inquiries and operate our business.
                  </Translate>
                </li>
                <li>
                  <strong>
                    <Translate staticKey='privacy.legalObligation'>
                      Legal obligation
                    </Translate>
                  </strong>{' '}
                  <Translate staticKey='privacy.legalObligationDescription'>
                    where processing is necessary to comply with applicable
                    laws.
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.informationSharing'>
                  4. Information Sharing
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.informationSharingDescription'>
                  We do not sell your personal information. We may share your
                  information only as necessary:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='privacy.serviceProviders'>
                    With trusted service providers (e.g., hosting, email
                    delivery) acting as processors
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.requiredByLaw'>
                    When required by law, court order, or public authority
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.corporateTransactions'>
                    In connection with corporate transactions (merger,
                    acquisition) subject to safeguards
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.explicitConsent'>
                    With your explicit consent
                  </Translate>
                </li>
              </ul>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.dataRetention'>
                  5. Data Retention
                </Translate>
              </h2>
              <p className='text-gray-600'>
                <Translate staticKey='privacy.dataRetentionDescription'>
                  We retain your personal data only for as long as necessary to
                  respond to your inquiry and for a reasonable period thereafter
                  to maintain records and comply with legal obligations. We
                  delete or anonymize data when it is no longer needed.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.dataSecurity'>
                  6. Data Security
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.dataSecurityDescription'>
                  We implement appropriate security measures to protect your
                  personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission
                  over the internet is 100% secure.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.internationalTransfers'>
                  7. International Data Transfers
                </Translate>
              </h2>
              <p className='text-gray-600'>
                <Translate staticKey='privacy.internationalTransfersDescription'>
                  If personal data is transferred outside the EU/EEA, we will
                  ensure appropriate safeguards are in place (e.g., EU Standard
                  Contractual Clauses) and that your rights remain protected.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.yourRights'>
                  8. Your Rights (GDPR)
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.youHaveRightTo'>
                  You have the right to:
                </Translate>
              </p>
              <ul className='list-disc list-inside text-gray-600 space-y-2'>
                <li>
                  <Translate staticKey='privacy.accessUpdate'>
                    Access and update your personal information
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.requestDeletion'>
                    Request deletion of your personal information
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.optOutMarketing'>
                    Opt-out of marketing communications
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.requestCopy'>
                    Request a copy of your data
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.withdrawConsent'>
                    Withdraw consent at any time
                  </Translate>
                </li>
                <li>
                  <Translate staticKey='privacy.restrictObject'>
                    Restrict or object to processing in certain circumstances
                  </Translate>
                </li>
              </ul>
              <p className='text-gray-600 mt-4'>
                <Translate staticKey='privacy.exerciseRights'>
                  To exercise your rights, contact us at
                </Translate>{' '}
                <a
                  href='mailto:info@palmside.es'
                  className='text-yellow-700 hover:underline'
                >
                  info@palmside.es
                </a>
                .{' '}
                <Translate staticKey='privacy.lodgeComplaint'>
                  You also have the right to lodge a complaint with your local
                  data protection authority. In Spain, this is the Agencia
                  Española de Protección de Datos (AEPD).
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.cookiesTracking'>
                  9. Cookies and Tracking
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.cookiesTrackingDescription'>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website. You can control cookie
                  settings through your browser preferences.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.contactUs'>
                  10. Contact Us
                </Translate>
              </h2>
              <p className='text-gray-600 mb-4'>
                <Translate staticKey='privacy.contactUsDescription'>
                  If you have any questions about this Privacy Policy, please
                  contact us:
                </Translate>
              </p>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-600'>
                  <strong>
                    <Translate staticKey='privacy.company'>Company:</Translate>
                  </strong>{' '}
                  Palmside S.L.
                  <br />
                  <strong>
                    <Translate staticKey='privacy.email'>Email:</Translate>
                  </strong>{' '}
                  <a
                    href='mailto:info@palmside.es'
                    className='text-yellow-700 hover:underline'
                  >
                    info@palmside.es
                  </a>
                  <br />
                  <strong>
                    <Translate staticKey='privacy.phone'>Phone:</Translate>
                  </strong>{' '}
                  +49 176 534 85 055 / +34 609 06 93 67
                  <br />
                  <strong>
                    <Translate staticKey='privacy.address'>Address:</Translate>
                  </strong>{' '}
                  Carrer de Ametler 3 -1B, ES-07609 Son Verí Nou, Islas Baleares
                </p>
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='privacy.changesToPolicy'>
                  11. Changes to This Policy
                </Translate>
              </h2>
              <p className='text-gray-600'>
                <Translate staticKey='privacy.changesToPolicyDescription'>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last updated" date.
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

export default PrivacyPolicy
