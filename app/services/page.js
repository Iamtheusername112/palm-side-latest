'use client'

import {
  Building2,
  TrendingUp,
  Sparkles,
  Briefcase,
  Globe,
  CheckCircle,
  ArrowRight,
  Users,
  Award,
  Clock,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ServicesPage = () => {
  const services = [
    {
      name: 'Property Management',
      description:
        'Comprehensive property management services for residential and commercial properties',
      icon: Building2,
      features: [
        '24/7 tenant support',
        'Rent collection and accounting',
        'Property maintenance coordination',
        'Legal compliance management',
        'Financial reporting',
        'Marketing and tenant screening',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Real Estate Investment',
      description:
        'Strategic investment opportunities and portfolio management',
      icon: TrendingUp,
      features: [
        'Market analysis and research',
        'Investment property sourcing',
        'Due diligence and evaluation',
        'Portfolio diversification strategies',
        'Risk assessment and mitigation',
        'Investment performance tracking',
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      name: 'Property Development',
      description: 'Custom development solutions from concept to completion',
      icon: Sparkles,
      features: [
        'Land acquisition and zoning',
        'Architectural design coordination',
        'Construction project management',
        'Permit and regulatory compliance',
        'Budget planning and cost control',
        'Timeline management and delivery',
      ],
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Consulting Services',
      description:
        'Expert real estate consulting for strategic decision making',
      icon: Briefcase,
      features: [
        'Market feasibility studies',
        'Property valuation and appraisal',
        'Investment strategy development',
        'Due diligence consulting',
        'Legal and regulatory guidance',
        'Exit strategy planning',
      ],
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'Legal Services',
      description: 'Real estate legal expertise and transaction support',
      icon: Globe,
      features: [
        'Contract drafting and review',
        'Transaction documentation',
        'Title search and insurance',
        'Closing coordination',
        'Dispute resolution',
        'Regulatory compliance',
      ],
      color: 'from-red-500 to-red-600',
    },
  ]

  const stats = [
    {
      number: '500+',
      label: 'Properties Managed',
      icon: Building2,
    },
    {
      number: '$2.5B+',
      label: 'Assets Under Management',
      icon: TrendingUp,
    },
    {
      number: '50+',
      label: 'Successful Developments',
      icon: Sparkles,
    },
    {
      number: '98%',
      label: 'Client Satisfaction',
      icon: Award,
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: 'Consultation',
      description:
        'We start with a comprehensive consultation to understand your needs and objectives.',
      icon: Users,
    },
    {
      step: '02',
      title: 'Strategy Development',
      description:
        'Our team develops a customized strategy tailored to your specific requirements.',
      icon: Briefcase,
    },
    {
      step: '03',
      title: 'Implementation',
      description:
        'We execute the plan with precision, keeping you informed throughout the process.',
      icon: Clock,
    },
    {
      step: '04',
      title: 'Ongoing Support',
      description:
        'Continuous monitoring and support to ensure optimal results and client satisfaction.',
      icon: CheckCircle,
    },
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-green-50'>
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-yellow-500 to-green-600 py-20'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in'>
            Our Services
          </h1>
          <p className='text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto'>
            Comprehensive real estate solutions tailored to meet your unique
            needs and investment goals.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Services Grid */}
        <div className='grid lg:grid-cols-2 gap-12 mb-20'>
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'
              >
                <div className='p-8'>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className='h-8 w-8' />
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                    {service.name}
                  </h3>
                  <p className='text-gray-600 text-lg mb-6'>
                    {service.description}
                  </p>
                  <ul className='space-y-3 mb-8'>
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className='flex items-center text-gray-700'
                      >
                        <CheckCircle className='h-5 w-5 text-green-500 mr-3 flex-shrink-0' />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className='w-full bg-gradient-to-r from-yellow-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2'>
                    <span>Learn More</span>
                    <ArrowRight className='h-4 w-4' />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className='bg-white rounded-2xl shadow-lg p-8 mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Track Record
            </h2>
            <p className='text-gray-600 text-lg'>
              Numbers that speak to our commitment to excellence
            </p>
          </div>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className='text-center'>
                  <div className='w-16 h-16 bg-gradient-to-r from-yellow-500 to-green-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4'>
                    <IconComponent className='h-8 w-8' />
                  </div>
                  <div className='text-3xl font-bold text-gray-900 mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-gray-600'>{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Our Process
            </h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              A systematic approach to delivering exceptional results for every
              client
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {processSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className='text-center group'>
                  <div className='relative mb-6'>
                    <div className='w-20 h-20 bg-gradient-to-r from-yellow-500 to-green-500 rounded-full flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300'>
                      <IconComponent className='h-10 w-10' />
                    </div>
                    <div className='absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-yellow-500 rounded-full flex items-center justify-center'>
                      <span className='text-yellow-600 font-bold text-sm'>
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-3'>
                    {step.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-gradient-to-r from-yellow-500 to-green-600 rounded-2xl p-12 text-center text-white'>
          <h2 className='text-3xl font-bold mb-4'>Ready to Get Started?</h2>
          <p className='text-xl mb-8 text-yellow-100 max-w-2xl mx-auto'>
            Let's discuss how our services can help you achieve your real estate
            goals.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105'>
              Schedule Consultation
            </button>
            <button className='border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-600 transition-all duration-300 transform hover:scale-105'>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ServicesPage
