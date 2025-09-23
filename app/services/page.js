import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { Search, TrendingUp, PieChart, Crown, Hammer, Megaphone } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Hero (video banner like About page, same height as current) */}
      <section className='relative overflow-hidden py-3'>
        {/* Background video */}
        <video
          className='absolute inset-0 h-full w-full object-cover motion-reduce:hidden'
          autoPlay
          muted
          loop
          playsInline
        >
          <source src='/about/videopalm3.mp4' type='video/mp4' />
        </video>

        {/* Gradient overlay for readability */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#B08D57]/80 via-[#C5A880]/80 to-emerald-600/80' />

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            Our Services
          </h1>
          <p className='text-lg xl:text-xl text-blue-50 max-w-3xl'>
            We deliver comprehensive real estate services with tailored property solutions and personalized support, making life on Mallorca smooth and worry-free.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* 1. Property Search */}
          <div id='property-search' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-3 rounded-xl bg-[#B59A3D]/10 text-[#B59A3D]'>
                <Search className='h-6 w-6' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900'>1. Property Search</h2>
            </div>
            <p className='text-gray-700 mb-4 text-lg xl:text-xl'>
              Expert assistance in finding your dream property with personalized search criteria, market insights, and support for buying, selling, or renting.
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2 text-lg xl:text-xl'>
              <li>Custom property matching</li>
              <li>Market analysis reports</li>
              <li>Vacation property brokerage</li>
              <li>Virtual property tours</li>
              <li>Neighborhood insights</li>
            </ul>
          </div>

          {/* 2. Investment Consulting */}
          <div id='investment-consulting' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-3 rounded-xl bg-[#B59A3D]/10 text-[#B59A3D]'>
                <TrendingUp className='h-6 w-6' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900'>2. Investment Consulting</h2>
            </div>
            <p className='text-gray-700 mb-4 text-lg xl:text-xl'>
              Strategic advice to maximize returns and minimize risks across your real estate portfolio.
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2 text-lg xl:text-xl'>
              <li>ROI analysis</li>
              <li>Market timing strategies</li>
              <li>Portfolio diversification</li>
              <li>Tax optimization</li>
            </ul>
          </div>

          {/* 5. Market Analysis */}
          <div id='market-analysis' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-3 rounded-xl bg-[#B59A3D]/10 text-[#B59A3D]'>
                <PieChart className='h-6 w-6' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900'>5. Market Analysis</h2>
            </div>
            <p className='text-gray-700 mb-4 text-lg xl:text-xl'>
              In-depth market research and trend analysis to inform your real estate decisions.
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2 text-lg xl:text-xl'>
              <li>Price trend analysis</li>
              <li>Supply & demand insights</li>
              <li>Neighborhood growth</li>
              <li>Future projections</li>
            </ul>
          </div>

          {/* 6. Luxury Concierge */}
          <div id='luxury-concierge' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-3 rounded-xl bg-[#B59A3D]/10 text-[#B59A3D]'>
                <Crown className='h-6 w-6' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900'>6. Luxury Concierge</h2>
            </div>
            <p className='text-gray-700 mb-4 text-lg xl:text-xl'>
              Premium concierge services for high-end property owners and luxury real estate clients.
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2 text-lg xl:text-xl'>
              <li>Personal property tours</li>
            </ul>
          </div>

          {/* 7. Construction & Renovation */}
          <div id='construction-renovation' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-3 rounded-xl bg-[#B59A3D]/10 text-[#B59A3D]'>
                <Hammer className='h-6 w-6' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900'>7. Construction & Renovation</h2>
            </div>
            <p className='text-gray-700 mb-4 text-lg xl:text-xl'>
              Complete support for construction projects and property renovations, from planning to supervision and final delivery.
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2 text-lg xl:text-xl'>
              <li>Full-scale renovations or minor repairs</li>
              <li>Construction project management</li>
              <li>Supervision of all construction phases</li>
              <li>Quality control and follow-up</li>
            </ul>
          </div>

          {/* 8. Marketing & Presentation */}
          <div id='marketing-presentation' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='p-3 rounded-xl bg-[#B59A3D]/10 text-[#B59A3D]'>
                <Megaphone className='h-6 w-6' />
              </div>
              <h2 className='text-3xl font-bold text-gray-900'>8. Marketing & Presentation</h2>
            </div>
            <p className='text-gray-700 mb-4 text-lg xl:text-xl'>
              Showcase your property professionally with marketing, photography, and home staging.
            </p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2 text-lg xl:text-xl'>
              <li>Professional home photography</li>
              <li>Contemporary home staging</li>
              <li>Property marketing for sale or rental</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className='mt-16 bg-gradient-to-r from-gray-50 to-white border rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
          <div>
            <h3 className='text-3xl font-bold text-gray-900 mb-1'>Ready to Get Started?</h3>
            <p className='text-gray-700 max-w-2xl text-lg xl:text-xl'>
              Our team of experts is ready to provide you with the highest level of service and expertise in real estate. Have a different request? Feel free to contact us.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <Link
              href='/contact'
              className='border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3 rounded-lg font-semibold text-lg xl:text-xl transition-all duration-300 transform hover:scale-105 cursor-pointer'
            >
              Schedule Consultation
            </Link>
            <Link
              href='/contact'
              className='bg-gradient-to-r from-[#B08D57] via-[#C5A880] to-emerald-600 text-white hover:opacity-90 px-8 py-3 rounded-lg font-semibold text-lg xl:text-xl transition-colors duration-300 transform hover:scale-105 cursor-pointer'
            >
              Download Brochure
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}


