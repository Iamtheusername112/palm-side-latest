'use client'

import {
  CheckCircle,
  Search,
  LineChart,
  Map,
  ConciergeBell,
  Hammer,
  Camera,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageBanner from '../components/PageBanner'
import Translate from '../../components/Translate'
import Link from 'next/link'

const ServicesPage = () => {
  const services = [
    {
      id: 'property-search',
      name: 'Property Search',
      nameKey: 'services.propertySearch',
      description:
        'Expert assistance in finding your dream property with personalized support for buying, selling, or renting.',
      descriptionKey: 'services.propertySearchDesc',
      icon: Search,
      features: [
        'Custom property matching',
        'Market analysis reports',
        'Vacation property brokerage',
        'Virtual property tours',
        'Neighborhood insights',
      ],
      featuresKeys: [
        'services.customPropertyMatching',
        'services.marketAnalysisReports',
        'services.vacationPropertyBrokerage',
        'services.virtualPropertyTours',
        'services.neighborhoodInsights',
      ],
      color: 'from-yellow-500 to-green-600',
    },
    {
      id: 'investment-consulting',
      name: 'Investment Consulting',
      nameKey: 'services.investmentConsulting',
      description:
        'Strategic advice to maximize returns and minimize risks across your portfolio.',
      descriptionKey: 'services.investmentConsultingDesc2',
      icon: LineChart,
      features: [
        'ROI analysis',
        'Market timing strategies',
        'Portfolio diversification',
        'Tax optimization',
      ],
      featuresKeys: [
        'services.roiAnalysis',
        'services.marketTimingStrategies',
        'services.portfolioDiversification',
        'services.taxOptimization',
      ],
      color: 'from-green-500 to-emerald-600',
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      nameKey: 'services.marketAnalysis',
      description:
        'In-depth research and trends to inform your real estate decisions.',
      descriptionKey: 'services.marketAnalysisDesc2',
      icon: Map,
      features: [
        'Price trend analysis',
        'Supply & demand insights',
        'Neighborhood growth',
        'Future projections',
      ],
      featuresKeys: [
        'services.priceTrendAnalysis',
        'services.supplyDemandInsights',
        'services.neighborhoodGrowth',
        'services.futureProjections',
      ],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'luxury-concierge',
      name: 'Luxury Concierge',
      nameKey: 'services.luxuryConcierge',
      description:
        'Premium concierge services for high-end property owners and clients.',
      descriptionKey: 'services.luxuryConciergeDesc2',
      icon: ConciergeBell,
      features: ['Personal property tours'],
      featuresKeys: ['services.personalPropertyTours'],
      color: 'from-purple-500 to-fuchsia-600',
    },
    {
      id: 'construction-renovation',
      name: 'Construction & Renovation',
      nameKey: 'services.constructionRenovation',
      description:
        'Complete support from planning to supervision and final delivery.',
      descriptionKey: 'services.constructionRenovationDesc2',
      icon: Hammer,
      features: [
        'Full-scale renovations or minor repairs',
        'Construction project management',
        'Supervision of all construction phases',
        'Quality control and follow-up',
      ],
      featuresKeys: [
        'services.fullScaleRenovations',
        'services.constructionProjectManagement',
        'services.supervisionConstructionPhases',
        'services.qualityControlFollowUp',
      ],
      color: 'from-orange-500 to-amber-600',
    },
    {
      id: 'marketing-presentation',
      name: 'Marketing & Presentation',
      nameKey: 'services.marketingPresentation',
      description:
        'Showcase your property with professional marketing and staging.',
      descriptionKey: 'services.marketingPresentationDesc2',
      icon: Camera,
      features: [
        'Professional home photography',
        'Contemporary home staging',
        'Property marketing for sale or rental',
      ],
      featuresKeys: [
        'services.professionalHomePhotography',
        'services.contemporaryHomeStaging',
        'services.propertyMarketingSaleRental',
      ],
      color: 'from-rose-500 to-pink-600',
    },
  ]

  return (
    <div className='min-h-screen bg-[#F5EFE6]'>
      <Navbar />

      <PageBanner
        title={<Translate staticKey='banner.services'>Our Services</Translate>}
        subtitle={
          <Translate staticKey='banner.servicesSubtitle'>
            We deliver comprehensive real estate services with tailored property
            solutions and personalized support, making life on Mallorca smooth
            and worry-free.
          </Translate>
        }
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-10'>
          {/* Sticky Quick Nav */}
          <aside className='lg:col-span-1'>
            <div className='lg:sticky lg:top-28 bg-white rounded-2xl shadow-md p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                <Translate staticKey='services.quickNavigation'>
                  Quick Navigation
                </Translate>
              </h3>
              <ul className='space-y-2 text-gray-700'>
                {services.map((s) => {
                  const IconComponent = s.icon
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className='flex items-center gap-2 hover:text-yellow-700'
                      >
                        <span className='inline-flex items-center justify-center w-6 h-6 rounded-md bg-white border border-[#B08D57]/50 text-[#B08D57]'>
                          <IconComponent className='h-3.5 w-3.5' strokeWidth={2.25} />
                        </span>
                        <span>
                          <Translate staticKey={s.nameKey}>{s.name}</Translate>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>

          {/* Detailed Sections */}
          <div className='lg:col-span-3 space-y-16'>
            {services.map((service, index) => {
              const IconComponent = service.icon
              const isEven = index % 2 === 0
              return (
                <section
                  id={service.id}
                  key={service.id}
                  className='scroll-mt-28'
                >
                  <div
                    className={`rounded-2xl overflow-hidden shadow-lg bg-white`}
                  >
                    <div className={`p-8 ${isEven ? '' : ''}`}>
                      <div className='flex items-center mb-4'>
                        <div className='w-12 h-12 bg-white border border-[#B08D57]/50 text-[#B08D57] rounded-xl flex items-center justify-center mr-4'>
                          <IconComponent className='h-6 w-6' strokeWidth={2.25} />
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900'>
                          <Translate staticKey={service.nameKey}>
                            {service.name}
                          </Translate>
                        </h3>
                      </div>
                      <p className='text-gray-600 text-lg mb-6'>
                        <Translate staticKey={service.descriptionKey}>
                          {service.description}
                        </Translate>
                      </p>
                      <div className='grid sm:grid-cols-2 gap-3'>
                        {service.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className='flex items-center text-gray-700'
                          >
                            <CheckCircle className='h-5 w-5 text-green-500 mr-3 flex-shrink-0' />
                            <Translate
                              staticKey={service.featuresKeys[featureIndex]}
                            >
                              {feature}
                            </Translate>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className='bg-[#B08D57] rounded-2xl p-12 text-center text-white mt-20'>
          <h2 className='text-3xl font-bold mb-4'>
            <Translate staticKey='services.readyToStart'>
              Ready to Get Started?
            </Translate>
          </h2>
          <p className='text-xl mb-8 text-yellow-100 max-w-2xl mx-auto'>
            <Translate staticKey='services.expertTeamReady'>
              Our team of experts is ready to provide the highest level of
              service and expertise. Have a different request? Feel free to
              contact us.
            </Translate>
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              href='/contact'
              className='bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105'
            >
              <Translate staticKey='services.scheduleConsultation'>
                Schedule Consultation
              </Translate>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ServicesPage
