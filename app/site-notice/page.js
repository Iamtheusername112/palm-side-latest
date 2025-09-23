import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function SiteNoticePage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>Site Notice</h1>
        <p className='text-gray-600 mb-10'>
          This is a template page for your site notice (imprint). Replace the placeholder
          content below with your legal company details.
        </p>

        <section className='space-y-6 text-gray-800'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>Company Information</h2>
            <p>Palmside S.L.</p>
            <p>Carrer de Ametler 3 – 1B, ES-07609 Llucmajor, Mallorca – Illes Balears</p>
            <p>Email: info@palmside.es</p>
            <p>Phone: +34 609 06 93 67</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>Represented by</h2>
            <p>Management: —</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>VAT ID</h2>
            <p>VAT ID according to Sec. 27 a German VAT Act: —</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>EU Dispute Resolution</h2>
            <p>
              The European Commission provides a platform for online dispute resolution (ODR):
              <a className='text-[#B59A3D] hover:underline ml-1' href='https://ec.europa.eu/consumers/odr' target='_blank' rel='noopener noreferrer'>
                ec.europa.eu/consumers/odr
              </a>
            </p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>Liability for Contents</h2>
            <p>
              This is placeholder text. Insert your legal statement about responsibility for
              the content on this website.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


