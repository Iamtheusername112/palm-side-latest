import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import TeamSlideshow from '../components/TeamSlideshow'
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('About')
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Hero */}
      <section className='relative overflow-hidden py-8'>
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
            {t('hero.title')}
          </h1>
          <p className='text-lg md:text-xl text-blue-50 max-w-3xl'>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 gap-12 items-center'>
          {/* Copy */}
          <div className='lg:col-span-5 order-2 lg:order-2'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>{t('story.title')}</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              {t('story.p1').replace(/'/g, "&apos;").replace(/"/g, "&quot;")}
            </p>
            <p className='text-gray-700 leading-relaxed mb-4'>
              {t('story.p2').replace(/'/g, "&apos;").replace(/"/g, "&quot;")}
            </p>
            <p className='text-gray-700 leading-relaxed mb-4'>
              {t('story.p3').replace(/'/g, "&apos;").replace(/"/g, "&quot;")}
            </p>
            <p className='text-gray-700 leading-relaxed'>
              {t('story.p4').replace(/'/g, "&apos;").replace(/"/g, "&quot;")}
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>{t('team.title')}</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* CEO / Founder - Jeanette Bakacak */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center'>
            <div className='mb-4 h-44 w-44 rounded-full overflow-hidden bg-white shadow-sm relative'>
              <Image src='/about/jeanette2.jpeg' alt='Jeanette Bakacak' fill sizes='176px' className='object-cover' priority quality={95} />
            </div>
            <h3 className='text-xl font-semibold text-gray-900'>Jeanette Bakacak</h3>
            <p className='text-base text-gray-600 mb-4'>{t('team.jeanette.role')}</p>
            <div className='space-y-1 text-base text-gray-700 mb-4'>
              <p><span className='font-medium'>{t('team.labels.phone')}</span> —</p>
              <p>
                <span className='font-medium'>{t('team.labels.email')}</span>{' '}
                <a href='mailto:info@palmside.es' className='hover:text-[#B59A3D]'>
                  info@palmside.es
                </a>
              </p>
            </div>
            <p className='text-gray-700 leading-relaxed text-base'>
              {t('team.jeanette.bio1').replace(/'/g, "&apos;")}
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              {t('team.jeanette.bio2').replace(/'/g, "&apos;")}
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              {t('team.jeanette.bio3').replace(/'/g, "&apos;")}
            </p>
          </div>

          {/* Consultant - Claudia Launer */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center'>
            <div className='mb-4 h-44 w-44 rounded-full overflow-hidden bg-white shadow-sm relative'>
              <Image src='/about/Claudia_neu.jpeg' alt='Claudia Launer' fill sizes='176px' className='object-cover' quality={95} />
            </div>
            <h3 className='text-xl font-semibold text-gray-900'>Claudia Launer</h3>
            <p className='text-base text-gray-600 mb-4'>{t('team.claudia.role')}</p>
            <div className='space-y-1 text-base text-gray-700 mb-4'>
              <p><span className='font-medium'>{t('team.labels.phone')}</span> +49 1573 4903876</p>
              <p>
                <span className='font-medium'>{t('team.labels.email')}</span>{' '}
                <a href='mailto:consulting@palmside.es' className='hover:text-[#B59A3D]'>
                  consulting@palmside.es
                </a>
              </p>
            </div>
            <p className='text-gray-700 leading-relaxed text-base'>
              {t('team.claudia.bio1').replace(/'/g, "&apos;")}
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              {t('team.claudia.bio2').replace(/'/g, "&apos;")}
            </p>
          </div>

          {/* Technical Director - Taner Bakacak */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center'>
            <div className='mb-4 h-44 w-44 rounded-full overflow-hidden bg-white shadow-sm relative'>
              <Image src='/about/taner3.jpeg' alt='Taner Bakacak' fill sizes='176px' className='object-cover' quality={95} />
            </div>
            <h3 className='text-xl font-semibold text-gray-900'>Taner Bakacak</h3>
            <p className='text-base text-gray-600 mb-4'>{t('team.taner.role')}</p>
            <div className='space-y-1 text-base text-gray-700 mb-4'>
              <p><span className='font-medium'>{t('team.labels.phone')}</span> —</p>
              <p>
                <span className='font-medium'>{t('team.labels.email')}</span>{' '}
                <a href='mailto:info@palmside.es' className='hover:text-[#B59A3D]'>
                  info@palmside.es
                </a>
              </p>
            </div>
            <p className='text-gray-700 leading-relaxed text-base'>
              {t('team.taner.bio1').replace(/'/g, "&apos;")}
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              {t('team.taner.bio2').replace(/'/g, "&apos;")}
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              {t('team.taner.bio3').replace(/'/g, "&apos;")}
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              {t('team.taner.bio4').replace(/'/g, "&apos;")}
            </p>
          </div>
        </div>

        {/* CTA under team */}
        <div className='mt-12 flex justify-center'>
          <a
            href='/contact'
            className='border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3 rounded-lg font-semibold text-lg xl:text-xl transition-all duration-300 transform hover:scale-105'
          >
            Schedule consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
