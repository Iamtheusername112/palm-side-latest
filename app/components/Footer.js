'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Translate from '../../components/Translate'

const TikTokIcon = ({ className = '' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
    aria-hidden='true'
  >
    <path d='M12.03 2c.47.44.98.83 1.53 1.17 1.14.71 2.48 1.13 3.9 1.18v3.08c-1.85-.05-3.6-.6-5.1-1.5v7.65c0 3.54-2.86 6.41-6.41 6.41S-.26 17.12-.26 13.58C-.26 10.04 2.6 7.18 6.15 7.18c.35 0 .69.03 1.02.09v3.31c-.33-.08-.68-.12-1.02-.12-1.7 0-3.07 1.38-3.07 3.07s1.38 3.07 3.07 3.07 3.07-1.38 3.07-3.07V2h1.81z' />
  </svg>
)

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [openAccordions, setOpenAccordions] = useState({})

  const toggleAccordion = (section) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <footer className='bg-gray-600 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <div className='flex items-center mb-4'>
              <Image
                src='/logo/palmside-logo-transparent.png'
                alt='Palmside logo'
                width={96}
                height={96}
                className='w-24 h-24 object-contain'
                priority
              />
            </div>
            <p className='text-gray-300 mb-6'>
              <Translate staticKey='footer.companyDescription'>
                Your trusted partner in real estate services. We specialize in
                luxury properties and investment opportunities.
              </Translate>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            {/* Mobile Accordion Button */}
            <button
              onClick={() => toggleAccordion('quickLinks')}
              className='flex items-center justify-between w-full mb-4 md:hidden'
            >
              <h3 className='text-lg font-semibold'>
                <Translate staticKey='footer.quickLinks'>Quick Links</Translate>
              </h3>
              {openAccordions.quickLinks ? (
                <ChevronUp className='h-5 w-5' />
              ) : (
                <ChevronDown className='h-5 w-5' />
              )}
            </button>

            {/* Desktop Heading */}
            <h3 className='text-lg font-semibold mb-4 hidden md:block'>
              <Translate staticKey='footer.quickLinks'>Quick Links</Translate>
            </h3>
            <div
              className={`md:block ${
                openAccordions.quickLinks ? 'block' : 'hidden'
              }`}
            >
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='nav.home'>Home</Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/properties'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='nav.properties'>Properties</Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='nav.about'>About Us</Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='nav.services'>Services</Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='nav.contact'>Contact Us</Translate>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Services */}
          <div>
            {/* Mobile Accordion Button */}
            <button
              onClick={() => toggleAccordion('services')}
              className='flex items-center justify-between w-full mb-4 md:hidden'
            >
              <h3 className='text-lg font-semibold'>
                <Translate staticKey='footer.ourServices'>
                  Our Services
                </Translate>
              </h3>
              {openAccordions.services ? (
                <ChevronUp className='h-5 w-5' />
              ) : (
                <ChevronDown className='h-5 w-5' />
              )}
            </button>

            {/* Desktop Heading */}
            <h3 className='text-lg font-semibold mb-4 hidden md:block'>
              <Translate staticKey='footer.ourServices'>Our Services</Translate>
            </h3>
            <div
              className={`md:block ${
                openAccordions.services ? 'block' : 'hidden'
              }`}
            >
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/services#property-search'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='footer.propertySearch'>
                      Property Search
                    </Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services#investment-consulting'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='footer.investmentConsulting'>
                      Investment Consulting
                    </Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services#market-analysis'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='footer.marketAnalysis'>
                      Market Analysis
                    </Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services#luxury-concierge'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='footer.luxuryConcierge'>
                      Luxury Concierge
                    </Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services#construction-renovation'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='footer.constructionRenovation'>
                      Construction & Renovation
                    </Translate>
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services#marketing-presentation'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='footer.marketingPresentation'>
                      Marketing & Presentation
                    </Translate>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            {/* Mobile Accordion Button */}
            <button
              onClick={() => toggleAccordion('contact')}
              className='flex items-center justify-between w-full mb-4 md:hidden'
            >
              <h3 className='text-lg font-semibold'>
                <Translate staticKey='nav.contact'>Contact Us</Translate>
              </h3>
              {openAccordions.contact ? (
                <ChevronUp className='h-5 w-5' />
              ) : (
                <ChevronDown className='h-5 w-5' />
              )}
            </button>

            {/* Desktop Heading */}
            <Link
              href='/contact'
              className='text-lg font-semibold mb-4 hidden md:block hover:text-amber-400 transition-colors duration-300'
            >
              <Translate staticKey='nav.contact'>Contact Us</Translate>
            </Link>
            <div
              className={`md:block ${
                openAccordions.contact ? 'block' : 'hidden'
              }`}
            >
              <div className='space-y-3'>
                <div>
                  <a
                    href='https://www.google.com/maps/search/?api=1&query=Carrer%20de%20Ametler%203%20-1B%2C%20ES-07609%20Son%20Veri%20Nou%2C%20Islas%20Baleares'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    <Translate staticKey='footer.address'>
                      Carrer de Ametler 3 -1B, ES-07609 Son Veri Nou, Islas
                      Baleares
                    </Translate>
                  </a>
                </div>
                <div>
                  <p className='text-gray-300'>
                    <Translate staticKey='footer.phone'>Phone:</Translate> +49
                    176 534 85 055
                  </p>
                  <p className='text-gray-300'>
                    <Translate staticKey='footer.phone'>Phone:</Translate> +34
                    609 06 93 67
                  </p>
                  <p className='text-gray-300'>
                    <Translate staticKey='footer.email'>Email:</Translate>{' '}
                    <a
                      href='mailto:info@palmside.es'
                      className='hover:text-amber-400 transition-colors duration-300'
                    >
                      info@palmside.es
                    </a>
                  </p>
                </div>
                <div className='flex space-x-4 mt-4'>
                  <a
                    href='https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.instagram.com%2Fpalmside.es&h=AT0L6ugT3TGX2KEzBI_r1Q81ZQhJQBOqw9RNIRvcma46p6ThMezzYcCLUFIZBLjecL3ADuza_tDxo03_aHdJtjfNlRd9jUuYzQidaVRyhxGqVTB7olgT8ZO5N2G1oTCT&s=1'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                  >
                    <Facebook className='h-4 w-4' />
                  </a>
                  <a
                    href='https://www.instagram.com/palmside.es'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                  >
                    <Instagram className='h-4 w-4' />
                  </a>
                  <a
                    href='https://www.linkedin.com/in/jeanette-bakacak-50b965376/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                  >
                    <Linkedin className='h-4 w-4' />
                  </a>
                  <a
                    href='https://www.tiktok.com/@palmside.sl'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                  >
                    <TikTokIcon className='h-4 w-4' />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-500 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-400 text-sm'>
              © {currentYear}{' '}
              <Translate staticKey='footer.copyright'>
                Palmside S.L. All rights reserved.
              </Translate>
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='/site-notice'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                <Translate staticKey='Legal Notice'>Legal Notice</Translate>
              </Link>
              <Link
                href='/privacy'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                <Translate staticKey='footer.privacy'>Privacy Policy</Translate>
              </Link>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                <Translate staticKey='footer.terms'>Terms of Service</Translate>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
