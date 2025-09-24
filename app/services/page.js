import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ServicesPage() {
  const t = useTranslations('Services')

  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Hero */}
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

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-[#B08D57]/80 via-[#C5A880]/80 to-emerald-600/80' />

        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
            {t('hero.title')}
          </h1>
          <p className='text-lg md:text-xl text-blue-50 max-w-3xl'>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* 1. Property Search */}
          <div id='property-search' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t('sections.search.title')}</h2>
            <p className='text-gray-600 mb-4'>{t('sections.search.desc')}</p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>{t('sections.search.items.0')}</li>
              <li>{t('sections.search.items.1')}</li>
              <li>{t('sections.search.items.2')}</li>
              <li>{t('sections.search.items.3')}</li>
              <li>{t('sections.search.items.4')}</li>
            </ul>
          </div>

          {/* 2. Investment Consulting */}
          <div id='investment-consulting' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t('sections.invest.title')}</h2>
            <p className='text-gray-600 mb-4'>{t('sections.invest.desc')}</p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>{t('sections.invest.items.0')}</li>
              <li>{t('sections.invest.items.1')}</li>
              <li>{t('sections.invest.items.2')}</li>
              <li>{t('sections.invest.items.3')}</li>
            </ul>
          </div>

          {/* 5. Market Analysis */}
          <div id='market-analysis' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t('sections.market.title')}</h2>
            <p className='text-gray-600 mb-4'>{t('sections.market.desc')}</p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>{t('sections.market.items.0')}</li>
              <li>{t('sections.market.items.1')}</li>
              <li>{t('sections.market.items.2')}</li>
              <li>{t('sections.market.items.3')}</li>
            </ul>
          </div>

          {/* 6. Luxury Concierge */}
          <div id='luxury-concierge' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t('sections.concierge.title')}</h2>
            <p className='text-gray-600 mb-4'>{t('sections.concierge.desc')}</p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>{t('sections.concierge.items.0')}</li>
            </ul>
          </div>

          {/* 7. Construction & Renovation */}
          <div id='construction-renovation' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t('sections.renovation.title')}</h2>
            <p className='text-gray-600 mb-4'>{t('sections.renovation.desc')}</p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>{t('sections.renovation.items.0')}</li>
              <li>{t('sections.renovation.items.1')}</li>
              <li>{t('sections.renovation.items.2')}</li>
              <li>{t('sections.renovation.items.3')}</li>
            </ul>
          </div>

          {/* 8. Marketing & Presentation */}
          <div id='marketing-presentation' className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8'>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>{t('sections.marketing.title')}</h2>
            <p className='text-gray-600 mb-4'>{t('sections.marketing.desc')}</p>
            <ul className='list-disc pl-6 text-gray-700 space-y-2'>
              <li>{t('sections.marketing.items.0')}</li>
              <li>{t('sections.marketing.items.1')}</li>
              <li>{t('sections.marketing.items.2')}</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className='mt-16 bg-gradient-to-r from-gray-50 to-white border rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-1'>{t('cta.title')}</h3>
            <p className='text-gray-600 max-w-2xl'>{t('cta.desc')}</p>
          </div>
          <div className='flex items-center gap-3'>
            <Link
              href='/contact'
              className='border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3 rounded-lg font-semibold text-lg xl:text-xl transition-all duration-300 transform hover:scale-105 cursor-pointer'
            >
              {t('cta.primary')}
            </Link>
            <Link
              href='/contact'
              className='bg-gradient-to-r from-[#B08D57] via-[#C5A880] to-emerald-600 text-white hover:opacity-90 px-8 py-3 rounded-lg font-semibold text-lg xl:text-xl transition-colors duration-300 transform hover:scale-105 cursor-pointer'
            >
              {t('cta.secondary')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
