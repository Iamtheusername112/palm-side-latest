import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import TeamSlideshow from '../components/TeamSlideshow'

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />

      {/* Hero */}
      <section className='relative overflow-hidden py-20'>
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
          <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>About Us</h1>
          <p className='text-lg md:text-xl text-blue-50 max-w-3xl'>
            Your trusted partner in finding the perfect property in Mallorca.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-center'>
          {/* Image (larger on desktop) */}
          <div className='lg:col-span-7 order-1 lg:order-1'>
            <TeamSlideshow />
          </div>

          {/* Copy */}
          <div className='lg:col-span-5 order-2 lg:order-2'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>Who We Are</h2>
            <p className='text-gray-700 leading-relaxed mb-4'>
              We're three real estate professionals united by our love for Mallorca and years of experience in the island's property market.
            </p>
            <p className='text-gray-700 leading-relaxed mb-4'>
              After years of helping people navigate the island's property market, we founded Palmside Mallorca to combine our professional expertise with our genuine love for this incredible place.
            </p>
            <p className='text-gray-700 leading-relaxed mb-4'>
              From your first visit to the island, we're here to guide you through finding, buying, and truly enjoying your perfect home in Mallorca. We know the process can feel overwhelming when you're dealing with a foreign market, different legal systems, and language barriers – that's exactly why we're here.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              Between the three of us, we speak English, German, Spanish, and French, so you'll never feel lost in translation during viewings, negotiations, or paperwork. Whether you're searching for your dream home, navigating the complexities of Spanish property law, managing an existing investment, or planning a renovation, we handle every detail from the legal maze to helping you find the best local property.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8'>Our Team</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {/* CEO / Founder - Jeanette Bakacak */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center'>
            <div className='mb-4 h-44 w-44 rounded-full overflow-hidden bg-white shadow-sm relative'>
              <Image src='/about/jeanette2.jpeg' alt='Jeanette Bakacak' fill sizes='176px' className='object-cover' priority quality={95} />
            </div>
            <h3 className='text-xl font-semibold text-gray-900'>Jeanette Bakacak</h3>
            <p className='text-base text-gray-600 mb-4'>Founder/CEO</p>
            <div className='space-y-1 text-base text-gray-700 mb-4'>
              <p><span className='font-medium'>Phone number(s):</span> —</p>
              <p>
                <span className='font-medium'>Email:</span>{' '}
                <a href='mailto:info@palmside.es' className='hover:text-[#B59A3D]'>
                  info@palmside.es
                </a>
              </p>
            </div>
            <p className='text-gray-700 leading-relaxed text-base'>
              I’m a bridge builder between people, markets, and opportunities – with over 30 years of experience in two worlds: international wholesale and the real estate industry.
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              I’ve built academies, served clients worldwide, coordinated construction projects, managed commercial properties, and managed homeowners’ associations and retirement communities.
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              My drive? Optimizing processes, connecting people, and making every project a success – with heart, mind, and a keen eye for detail.
            </p>
          </div>

          {/* Consultant - Claudia Launer */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center'>
            <div className='mb-4 h-44 w-44 rounded-full overflow-hidden bg-white shadow-sm relative'>
              <Image src='/about/claudia1.jpeg' alt='Claudia Launer' fill sizes='176px' className='object-cover' quality={95} />
            </div>
            <h3 className='text-xl font-semibold text-gray-900'>Claudia Launer</h3>
            <p className='text-base text-gray-600 mb-4'>Consulting</p>
            <div className='space-y-1 text-base text-gray-700 mb-4'>
              <p><span className='font-medium'>Phone:</span> +49 1573 4903876</p>
              <p>
                <span className='font-medium'>Email:</span>{' '}
                <a href='mailto:consulting@palmside.es' className='hover:text-[#B59A3D]'>
                  consulting@palmside.es
                </a>
              </p>
            </div>
            <p className='text-gray-700 leading-relaxed text-base'>
              With over 20 years of experience in the international real estate business, Claudia is a proven expert in the global real estate market. After many successful years as a real estate agent in New York and New Jersey – focusing on business and private clients – she has specialized in the DD/A/D region, mainland Spain, and Mallorca since 2016.
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              She works as a real estate consultant in these markets, supporting clients with their search, valuation, and brokerage.
            </p>
          </div>

          {/* Technical Director - Taner Bakacak */}
          <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 flex flex-col items-center text-center'>
            <div className='mb-4 h-44 w-44 rounded-full overflow-hidden bg-white shadow-sm relative'>
              <Image src='/about/taner3.jpeg' alt='Taner Bakacak' fill sizes='176px' className='object-cover' quality={95} />
            </div>
            <h3 className='text-xl font-semibold text-gray-900'>Taner Bakacak</h3>
            <p className='text-base text-gray-600 mb-4'>Technical Director</p>
            <div className='space-y-1 text-base text-gray-700 mb-4'>
              <p><span className='font-medium'>Phone number:</span> —</p>
              <p>
                <span className='font-medium'>Email:</span>{' '}
                <a href='mailto:info@palmside.es' className='hover:text-[#B59A3D]'>
                  info@palmside.es
                </a>
              </p>
            </div>
            <p className='text-gray-700 leading-relaxed text-base'>
              I´ve stood for technical excellence in skilled trades foro ver 30 years – as a senior electrician on large-scale construction sites, in high-end private residences, amd in complex industrial projects.
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              My expertise span moodern building technology, photovoltaic systems, and professional facility management. With a sharp focus on the best quality, efficiency, and practical solutions.
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              I most recently set new standards in facility management for a major European grocery retailer’s central operations.
            </p>
            <p className='text-gray-700 leading-relaxed text-base mt-3'>
              At Palmside S.L., I combine precisión, efficiency, and a problema-solving mindset to deliver top-tier technical results – reliably and at scale.
            </p>
          </div>
        </div>

        {/* CTA under team */}
        <div className='mt-12 flex justify-center'>
          <a
            href='/contact'
            className='border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105'
          >
            Schedule consultation
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}


