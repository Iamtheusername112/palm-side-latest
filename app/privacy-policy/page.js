import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>Privacy Policy</h1>
        <p className='text-gray-600 mb-10'>
          This is a template Privacy Policy. Replace this content with your actual data protection information.
        </p>

        <section className='space-y-8 text-gray-800'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>1. Controller</h2>
            <p>Palmside S.L., Carrer de Ametler 3 – 1B, ES-07609 Llucmajor, Mallorca – Illes Balears</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>2. Data We Collect</h2>
            <p>Contact details you submit, usage data, and technical data necessary to provide our services.</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>3. Purpose &amp; Legal Basis</h2>
            <p>We process data to answer inquiries, provide services, and improve our website (Art. 6(1) GDPR).</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>4. Retention</h2>
            <p>We store data only as long as necessary for the stated purposes or legal obligations.</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>5. Your Rights</h2>
            <p>You have rights of access, rectification, erasure, restriction, objection, and data portability.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


