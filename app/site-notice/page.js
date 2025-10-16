'use client'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Translate from '../../components/Translate'

const SiteNotice = () => {
  const lastUpdated = (() => {
    const now = new Date()
    const yyyy = now.getUTCFullYear()
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0')
    const dd = String(now.getUTCDate()).padStart(2, '0')
    return `${dd}.${mm}.${yyyy}`
  })()
  return (
    <div className='min-h-screen bg-gradient-to-br from-amber-50 to-green-50'>
      <Navbar />

      <div className='relative overflow-hidden bg-[#B08D57] py-20 pt-32'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            <Translate staticKey='legal.legalNotice'>Legal Notice</Translate>
          </h1>
          <p className='text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto'>
            <Translate staticKey='legal.complianceDescription'>
              Company identification and legal information in compliance with
              LSSI-CE.
            </Translate>
          </p>
        </div>
        <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48'></div>
      </div>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='bg-white rounded-xl shadow-lg p-8'>
          <div className='prose prose-lg max-w-none'>
            <p className='text-gray-600 mb-6'>
              <strong>
                <Translate staticKey='legal.lastUpdated'>
                  Last updated:
                </Translate>
            </strong>{' '}
              {lastUpdated}
            </p>

            <section className='mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4'>
                <Translate staticKey='legal.lssiCompliance'>
                  In compliance with LSSI-CE
                </Translate>
              </h2>
              <p className='text-gray-600'>
                <Translate staticKey='legal.lssiDescription'>
                  In compliance with Law 34/2002, of July 11, on Services of the
                  Information Society and Electronic Commerce (LSSI-CE), the
                  following information is provided.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                <Translate staticKey='legal.companyIdentification'>
                  1. Company Identification
                </Translate>
              </h3>
              <p className='text-gray-600'>
                <strong>
                  <Translate staticKey='legal.companyName'>
                    Company name:
                  </Translate>
                </strong>{' '}
                Palmside S.L.
                <br />
                <strong>
                  <Translate staticKey='legal.registeredOffice'>
                    Registered office:
                  </Translate>
                </strong>{' '}
                Calle Ametler, Otr 3, Puerta B, 07609 Llucmajor (Illes Balears), Spain
                <br />
                <strong>
                  <Translate staticKey='legal.taxId'>
                    Tax Identification Number (NIF):
                  </Translate>
                </strong>{' '}
                B21804570
                <br />
                <strong>
                  <Translate staticKey='legal.commercialRegistry'>
                    Commercial Registry:
                  </Translate>
                </strong>{' '}
                Registered in the Commercial Registry of Palma de Mallorca, Page (Hoja) PM-103580, Inscription 1
                <br />
                <strong>
                  <Translate staticKey='legal.managingDirector'>
                    Managing Director:
                  </Translate>
                </strong>{' '}
                Jeanette Bakacak
                <br />
                <strong>
                  <Translate staticKey='legal.phone'>Phone:</Translate>
                </strong>{' '}
                +49 176 534 85 055 / +34 609 06 93 67
                <br />
                <strong>
                  <Translate staticKey='legal.email'>Email:</Translate>
                </strong>{' '}
                <a
                  href='mailto:info@palmside.es'
                  className='text-yellow-700 hover:underline'
                >
                  info@palmside.es
                </a>
              </p>
            </section>

            <section className='mb-8'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                <Translate staticKey='legal.intellectualProperty'>
                  2. Intellectual Property
                </Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate staticKey='legal.intellectualPropertyDescription'>
                  All content on this website (texts, images, logos, designs,
                  software, etc.) is the exclusive property of Palmside S.L. or
                  its legitimate owners. The reproduction, distribution, or
                  modification of such content without prior written
                  authorization is strictly prohibited.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                <Translate staticKey='legal.useOfWebsite'>
                  3. Use of the Website
                </Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate staticKey='legal.useOfWebsiteDescription'>
                  Users agree to use this website in accordance with the law,
                  this Legal Notice, and good faith. The use of the website for
                  purposes that may damage the rights or interests of third
                  parties, or that may in any way harm or impede its normal
                  operation, is strictly prohibited.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                <Translate staticKey='legal.liability'>4. Liability</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate staticKey='legal.liabilityDescription'>
                  Palmside S.L. is not responsible for the misuse of the
                  contents of its website, nor for damages or losses arising
                  from access, use, or misuse of the information. The company is
                  also not responsible for the legality of other third-party
                  websites that may be accessed from this site.
                </Translate>
              </p>
            </section>

            <section className='mb-8'>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                <Translate staticKey='legal.applicableLaw'>
                  5. Applicable Law and Jurisdiction
                </Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate staticKey='legal.applicableLawDescription'>
                  This Legal Notice is governed by Spanish law. Any dispute
                  related to this website will be submitted to the Courts and
                  Tribunals of Palma de Mallorca, with the express waiver of any
                  other jurisdiction that may apply.
                </Translate>
              </p>
            </section>

            <section>
              <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                <Translate staticKey='legal.contact'>6. Contact</Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate staticKey='legal.contactDescription'>
                  For any questions or legal inquiries, you can contact us at:
                </Translate>
                <br />
                <strong>
                  <Translate staticKey='legal.phone'>Phone:</Translate>
                </strong>{' '}
                +49 176 534 85 055 / +34 609 06 93 67
                <br />
                <strong>
                  <Translate staticKey='legal.email'>Email:</Translate>
                </strong>{' '}
                <a
                  href='mailto:info@palmside.es'
                  className='text-yellow-700 hover:underline'
                >
                  info@palmside.es
                </a>
                <br />
                <strong>
                  <Translate staticKey='legal.address'>Address:</Translate>
                </strong>{' '}
                Carrer de Ametler 3 -1B, ES-07609 Son Verí Nou, Islas Baleares,
                Spain
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default SiteNotice
