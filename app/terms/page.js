import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function TermsPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>Terms &amp; Conditions</h1>
        <p className='text-gray-600 mb-10'>
          This is a template page for your Terms &amp; Conditions. Replace the sections
          below with your actual terms.
        </p>

        <section className='space-y-8 text-gray-800'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>1. Introduction</h2>
            <p>Welcome to Palmside S.L. These Terms govern your use of our website and services.</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>2. Use of the Website</h2>
            <p>Please use the website responsibly. Do not engage in prohibited or unlawful activities.</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>3. Intellectual Property</h2>
            <p>All content is owned by or licensed to Palmside S.L. and protected by law.</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>4. Liability</h2>
            <p>We are not liable for indirect or consequential damages arising from use of the site.</p>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>5. Changes</h2>
            <p>We may modify these Terms at any time. Continued use signifies acceptance.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}


