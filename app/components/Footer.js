'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

const TikTokIcon = ({ className = '' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='currentColor'
    className={className}
    aria-hidden='true'
  >
    <path d='M12.03 2c.47.44.98.83 1.53 1.17 1.14.71 2.48 1.13 3.9 1.18v3.08c-1.85-.05-3.6-.6-5.1-1.5v7.65c0 3.54-2.86 6.41-6.41 6.41S-.26 17.12-.26 13.58C-.26 10.04 2.6 7.18 6.15 7.18c.35 0 .69.03 1.02.09v3.31c-.33-.08-.68-.12-1.02-.12-1.7 0-3.07 1.38-3.07 3.07s1.38 3.07 3.07 3.07 3.07-1.38 3.07-3.07V2h1.81z'/>
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
              <div className='w-12 h-12 bg-gradient-to-r from-amber-700 to-green-700 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-2xl'>P</span>
              </div>
              <span className='ml-3 text-2xl font-bold'>Palmside</span>
            </div>
            <p className='text-gray-300 mb-6'>
              Your trusted partner in real estate services. We specialize in
              luxury properties and investment opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            {/* Mobile Accordion Button */}
            <button
              onClick={() => toggleAccordion('quickLinks')}
              className='flex items-center justify-between w-full mb-4 md:hidden'
            >
              <h3 className='text-lg font-semibold'>Quick Links</h3>
              {openAccordions.quickLinks ? (
                <ChevronUp className='h-5 w-5' />
              ) : (
                <ChevronDown className='h-5 w-5' />
              )}
            </button>

            {/* Desktop Heading */}
            <h3 className='text-lg font-semibold mb-4 hidden md:block'>
              Quick Links
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
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href='/properties'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    Properties
                  </Link>
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href='/contact'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >
                    Contact Us
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
              <h3 className='text-lg font-semibold'>Our Services</h3>
              {openAccordions.services ? (
                <ChevronUp className='h-5 w-5' />
              ) : (
                <ChevronDown className='h-5 w-5' />
              )}
            </button>

            {/* Desktop Heading */}
            <h3 className='text-lg font-semibold mb-4 hidden md:block'>
              Our Services
            </h3>
            <div
              className={`md:block ${
                openAccordions.services ? 'block' : 'hidden'
              }`}
            >
              <ul className='space-y-2'>
                <li>
                  <span className='text-gray-300'>Property Sales</span>
                </li>
                <li>
                  <span className='text-gray-300'>Investment Consulting</span>
                </li>
                <li>
                  <span className='text-gray-300'>Property Management</span>
                </li>
                <li>
                  <span className='text-gray-300'>Market Analysis</span>
                </li>
                <li>
                  <span className='text-gray-300'>Legal Support</span>
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
              <h3 className='text-lg font-semibold'>Contact Us</h3>
              {openAccordions.contact ? (
                <ChevronUp className='h-5 w-5' />
              ) : (
                <ChevronDown className='h-5 w-5' />
              )}
            </button>

            {/* Desktop Heading */}
            <Link href='/contact' className='text-lg font-semibold mb-4 hidden md:block hover:text-amber-400 transition-colors duration-300'>
              Contact Us
            </Link>
            <div
              className={`md:block ${
                openAccordions.contact ? 'block' : 'hidden'
              }`}
            >
              <div className='space-y-3'>
                <div>
                  <a
                    href='https://www.google.com/maps/search/?api=1&query=Carrer%20de%20Ametler%203%20%E2%80%93%201B%2C%20ES-07609%20Llucmajor%20Mallorca%20%E2%80%93%20Illes%20Balears'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-gray-300 hover:text-amber-400 transition-colors duration-300'
                  >Carrer de Ametler 3 – 1B,
ES-07609 Llucmajor
Mallorca – Illes Balears</a>
                   
                </div>
                <div>
                  <p className='text-gray-300'>Phone: +49 176 534 85 055</p>
                  <p className='text-gray-300'>Phone: +34 609 06 93 67</p>
                  <p className='text-gray-300'>Email: <a href='mailto:info@palmside.es' className='hover:text-amber-400 transition-colors duration-300'>info@palmside.es</a></p>
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
              © {currentYear} Palmside Real Estate. All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='/privacy'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                Privacy Policy
              </Link>
              <Link
                href='/terms'
                className='text-gray-400 hover:text-white text-sm transition-colors duration-300'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
