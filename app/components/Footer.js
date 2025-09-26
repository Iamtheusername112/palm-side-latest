'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

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
            <h3 className='text-lg font-semibold mb-4 hidden md:block'>
              Contact Us
            </h3>
            <div
              className={`md:block ${
                openAccordions.contact ? 'block' : 'hidden'
              }`}
            >
              <div className='space-y-3'>
                <div>
                  <p className='text-gray-300'>123 Palm Street</p>
                  <p className='text-gray-300'>Miami, FL 33101</p>
                </div>
                <div>
                  <p className='text-gray-300'>Phone: +1 (555) 123-4567</p>
                  <p className='text-gray-300'>Email: info@palmside.com</p>
                </div>
                <div className='flex space-x-4 mt-4'>
                  <a
                    href='https://facebook.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                  >
                    <Facebook className='h-4 w-4' />
                  </a>
                  <a
                    href='https://instagram.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                  >
                    <Instagram className='h-4 w-4' />
                  </a>
                  <a
                    href='https://linkedin.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-8 h-8 bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110'
                  >
                    <Linkedin className='h-4 w-4' />
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
