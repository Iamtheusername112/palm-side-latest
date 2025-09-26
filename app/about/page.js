'use client'

import {
  Users,
  Award,
  Target,
  Heart,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Building2,
  Globe,
  CheckCircle,
  Star,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Jeanette Bakacak',
      position: 'Founder/CEO',
      image: '/aboutusimages/jeanette_neu.jpeg',
      email: 'ceo@palmside.es',
      phone: '+34 600 000 000',
      bio: "I'm a bridge builder between people, markets, and opportunities – with over 30 years of experience in two worlds: international wholesale and the real estate industry. I've built academies, served clients worldwide, coordinated construction projects, managed commercial properties, and managed homeowners’ associations and retirement communities. My drive? Optimizing processes, connecting people, and making every project a success – with heart, mind, and a keen eye for detail.",
    },
    {
      name: 'Claudia Launer',
      position: 'Consulting',
      image: '/aboutusimages/Claudia_neu.jpeg',
      email: 'consulting@palmside.es',
      phone: '+49 1573 4903876',
      bio: 'With over 20 years of experience in the international real estate business, Claudia is a proven expert in the global real estate market. After many successful years as a real estate agent in New York and New Jersey – focusing on business and private clients – she has specialized in the DD/A/D region, mainland Spain, and Mallorca since 2016. She works as a real estate consultant in these markets, supporting clients with their search, valuation, and brokerage.',
    },
    {
      name: 'Taner Bakacak',
      position: 'Technical Director',
      image: '/aboutusimages/taner_neu.jpeg',
      email: 'technical@palmside.es',
      phone: '+34 600 000 001',
      bio: "I've stood for technical excellence in skilled trades for over 30 years – as a senior electrician on large-scale construction sites, in high-end private residences, and in complex industrial projects. My expertise spans modern building technology, photovoltaic systems, and professional facility management, with a focus on quality, efficiency, and practical solutions. At Palmside S.L., I combine precision, efficiency, and a problem-solving mindset to deliver top-tier technical results – reliably and at scale.",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Client-Centric Approach',
      description:
        "Every decision we make is guided by what's best for our clients and their long-term success.",
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      icon: Target,
      title: 'Excellence in Execution',
      description:
        'We set high standards and consistently deliver exceptional results that exceed expectations.',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description:
        'We believe in building lasting relationships based on trust, transparency, and mutual success.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: TrendingUp,
      title: 'Innovation & Growth',
      description:
        'We continuously evolve our services and embrace new technologies to stay ahead of the market.',
      color: 'from-yellow-500 to-green-500',
    },
  ]

  

  const certifications = [
    'Certified Commercial Investment Member (CCIM)',
    'Real Estate Broker License',
    'Property Management Certification',
    'Investment Advisor Representative',
    'Certified Property Manager (CPM)',
    'Green Building Professional',
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-green-50'>
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-amber-700 to-green-700 py-20'>
        <div className='absolute inset-0 bg-gradient-to-r from-amber-700/50 to-green-700/50 z-10'></div>
        <video
          className='absolute inset-0 w-full h-full object-cover'
          src='/video/videopalm3.mp4'
          autoPlay
          loop
          muted
          playsInline
        />
        <div className='relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in'>
            About Palmside Mallorca
          </h1>
          <p className='text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto'>
            Local expertise, multilingual guidance, and end-to-end support in Mallorca.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Company Story Section */}
        <div className='grid lg:grid-cols-2 gap-12 mb-20'>
          <div>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Story</h2>
            <div className='space-y-4 text-gray-600 leading-relaxed'>
              <p>
                We're three real estate professionals united by our love for Mallorca and years of experience in the island's property market.
              </p>
              <p>
                After years of helping people navigate the island's property market, we founded Palmside Mallorca to combine our professional expertise with our genuine love for this incredible place.
              </p>
              <p>
                From your first visit to the island, we're here to guide you through finding, buying, and truly enjoying your perfect home in Mallorca. We know the process can feel overwhelming when you're dealing with a foreign market, different legal systems, and language barriers – that's exactly why we're here.
              </p>
              <p>
                Between the three of us, we speak English, German, Spanish, and French, so you'll never feel lost in translation during viewings, negotiations, or paperwork. Whether you're searching for your dream home, navigating the complexities of Spanish property law, managing an existing investment, or planning a renovation, we handle every detail from the legal maze to helping you find the best local property.
              </p>
            </div>
          </div>
          <div className='relative'>
            <div className='bg-white rounded-2xl p-8 h-full flex flex-col justify-center shadow-lg'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Languages & Support</h3>
              <div className='grid grid-cols-2 gap-4 text-gray-700'>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-green-600 mr-2'/>English</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-green-600 mr-2'/>German</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-green-600 mr-2'/>Spanish</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-green-600 mr-2'/>French</div>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mt-8 mb-4'>How We Help</h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700'>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-yellow-600 mr-2'/>Home search & viewings</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-yellow-600 mr-2'/>Negotiations & offers</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-yellow-600 mr-2'/>Legal & notary coordination</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-yellow-600 mr-2'/>Due diligence & valuation</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-yellow-600 mr-2'/>Renovation planning</div>
                <div className='flex items-center'><CheckCircle className='h-4 w-4 text-yellow-600 mr-2'/>Property management</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className='grid md:grid-cols-2 gap-8 mb-20'>
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-amber-700 to-green-700 rounded-xl flex items-center justify-center text-white mb-6'>
              <Target className='h-8 w-8' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Our Mission
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              To empower our clients with innovative real estate solutions that
              maximize returns, minimize risks, and create lasting value. We
              strive to be the most trusted partner in every client's real
              estate journey.
            </p>
          </div>
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-amber-700 to-green-700 rounded-xl flex items-center justify-center text-white mb-6'>
              <Globe className='h-8 w-8' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
              Our Vision
            </h3>
            <p className='text-gray-600 leading-relaxed'>
              To be the leading real estate company in South Florida, recognized
              for our innovation, integrity, and exceptional client outcomes. We
              envision a future where real estate investment is accessible,
              profitable, and rewarding for everyone.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Core Values
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              The principles that guide everything we do and every decision we
              make
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className='text-center group'>
                  <div
                    className={`w-20 h-20 bg-gradient-to-r from-amber-700 to-green-700 rounded-xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className='h-10 w-10' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                    {value.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Meet the Team
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Local experts in Mallorca guiding you every step of the way
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className='bg-white rounded-2xl shadow-lg overflow-hidden group'
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>
                    {member.name}
                  </h3>
                  <p className='text-yellow-600 font-medium mb-3'>
                    {member.position}
                  </p>
                  <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
                    {member.bio}
                  </p>
                  {(member.email || member.phone) && (
                    <div className='flex flex-col gap-2 mb-4 text-sm'>
                      {member.email && (
                        <div className='flex items-center text-gray-600'>
                          <Mail className='h-4 w-4 mr-2 text-yellow-600' />
                          <a href={`mailto:${member.email}`} className='hover:text-yellow-700'>
                            {member.email}
                          </a>
                        </div>
                      )}
                      {member.phone && (
                        <div className='flex items-center text-gray-600'>
                          <Phone className='h-4 w-4 mr-2 text-green-600' />
                          <a href={`tel:${member.phone}`} className='hover:text-yellow-700'>
                            {member.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  {member.specialties && member.specialties.length > 0 && (
                    <div className='space-y-1'>
                      {member.specialties.map((specialty, specIndex) => (
                        <div
                          key={specIndex}
                          className='flex items-center text-xs text-gray-500'
                        >
                          <CheckCircle className='h-3 w-3 text-green-500 mr-2' />
                          {specialty}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        

        

        {/* CTA Section */}
        <div className='bg-gradient-to-r from-amber-700 to-green-700 rounded-2xl p-12 text-center text-white'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Work With Us?</h2>
          <p className='text-xl mb-8 text-yellow-100 max-w-2xl mx-auto'>
            Join hundreds of satisfied clients who trust us with their real
            estate investments.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105'>
              Get Started Today
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-700 transition-all duration-300 transform hover:scale-105'>
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AboutPage
