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
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'With over 15 years in real estate, Sarah leads our vision of transforming how people invest in property.',
      specialties: [
        'Strategic Planning',
        'Investment Analysis',
        'Team Leadership',
      ],
    },
    {
      name: 'Michael Chen',
      position: 'Head of Property Management',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Michael ensures every property under our management operates at peak efficiency and profitability.',
      specialties: [
        'Operations Management',
        'Tenant Relations',
        'Cost Optimization',
      ],
    },
    {
      name: 'Emily Rodriguez',
      position: 'Senior Investment Advisor',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Emily helps clients build wealth through strategic real estate investments and portfolio diversification.',
      specialties: [
        'Market Analysis',
        'Investment Strategy',
        'Risk Assessment',
      ],
    },
    {
      name: 'David Thompson',
      position: 'Legal Counsel',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'David provides expert legal guidance ensuring all transactions are compliant and protected.',
      specialties: [
        'Real Estate Law',
        'Contract Negotiation',
        'Regulatory Compliance',
      ],
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

  const milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description:
        'Started with a vision to revolutionize real estate services in South Florida.',
    },
    {
      year: '2015',
      title: '100 Properties Managed',
      description:
        'Reached our first major milestone in property management services.',
    },
    {
      year: '2018',
      title: '$1B Assets Under Management',
      description:
        'Crossed the billion-dollar threshold in total assets under management.',
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description:
        'Launched comprehensive digital platforms for enhanced client experience.',
    },
    {
      year: '2023',
      title: 'International Expansion',
      description:
        'Extended services to international markets and luxury properties.',
    },
    {
      year: '2024',
      title: 'Industry Recognition',
      description:
        'Received multiple awards for excellence in real estate services.',
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
      <div className='relative overflow-hidden bg-gradient-to-r from-yellow-500 to-green-600 py-20'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in'>
            About Palmside Real Estate
          </h1>
          <p className='text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto'>
            Your trusted partner in real estate excellence, delivering
            exceptional results for over a decade.
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
                Founded in 2010, Palmside Real Estate began with a simple yet
                powerful vision: to transform the real estate industry through
                innovation, integrity, and exceptional service. What started as
                a small team of passionate professionals has grown into one of
                South Florida's most trusted real estate companies.
              </p>
              <p>
                Our journey began when our founder, Sarah Johnson, recognized a
                gap in the market for comprehensive, client-focused real estate
                services. She envisioned a company that would not just
                facilitate transactions, but would become a true partner in our
                clients' success stories.
              </p>
              <p>
                Today, we manage over 500 properties, oversee $2.5 billion in
                assets, and have helped thousands of clients achieve their real
                estate goals. Our success is built on the foundation of trust,
                transparency, and an unwavering commitment to excellence.
              </p>
            </div>
          </div>
          <div className='relative'>
            <div className='bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl p-8 text-white h-full flex flex-col justify-center'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='text-center'>
                  <div className='text-3xl font-bold mb-2'>500+</div>
                  <div className='text-yellow-100'>Properties Managed</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold mb-2'>$2.5B+</div>
                  <div className='text-yellow-100'>Assets Under Management</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold mb-2'>15+</div>
                  <div className='text-yellow-100'>Years of Experience</div>
                </div>
                <div className='text-center'>
                  <div className='text-3xl font-bold mb-2'>98%</div>
                  <div className='text-yellow-100'>Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className='grid md:grid-cols-2 gap-8 mb-20'>
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <div className='w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-white mb-6'>
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
            <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white mb-6'>
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
                    className={`w-20 h-20 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
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
              Meet Our Leadership Team
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Experienced professionals dedicated to your success
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Journey
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Key milestones that shaped our growth and success
            </p>
          </div>
          <div className='relative'>
            <div className='absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-500 to-green-500'></div>
            <div className='space-y-12'>
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'
                    }`}
                  >
                    <div className='bg-white rounded-xl shadow-lg p-6'>
                      <div className='text-2xl font-bold text-yellow-600 mb-2'>
                        {milestone.year}
                      </div>
                      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                        {milestone.title}
                      </h3>
                      <p className='text-gray-600'>{milestone.description}</p>
                    </div>
                  </div>
                  <div className='w-8 h-8 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full border-4 border-white shadow-lg z-10'></div>
                  <div className='w-1/2'></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className='mb-20'>
          <div className='bg-white rounded-2xl shadow-lg p-8'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                Certifications & Credentials
              </h2>
              <p className='text-gray-600 text-lg'>
                Professional certifications that demonstrate our expertise and
                commitment to excellence
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className='flex items-center p-4 bg-gray-50 rounded-lg'
                >
                  <Award className='h-5 w-5 text-yellow-600 mr-3 flex-shrink-0' />
                  <span className='text-gray-700 font-medium'>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-gradient-to-r from-yellow-500 to-green-600 rounded-2xl p-12 text-center text-white'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Work With Us?</h2>
          <p className='text-xl mb-8 text-yellow-100 max-w-2xl mx-auto'>
            Join hundreds of satisfied clients who trust us with their real
            estate investments.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105'>
              Get Started Today
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-all duration-300 transform hover:scale-105'>
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
