'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo and Company Info */}
          <div className='col-span-1 md:col-span-2'>
            <div className='flex items-center mb-4'>
              <div className='w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-2xl'>P</span>
              </div>
              <span className='ml-3 text-2xl font-bold'>Palmside</span>
            </div>
            <p className='text-gray-300 mb-6 max-w-md'>
              Your trusted partner in real estate services. We specialize in
              luxury properties, investment opportunities, and comprehensive
              real estate solutions.
            </p>
            <div className='flex space-x-4'>
              <a
                href='https://facebook.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300'
              >
                <Facebook className='h-5 w-5' />
              </a>
              <a
                href='https://instagram.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors duration-300'
              >
                <Instagram className='h-5 w-5' />
              </a>
              <a
                href='https://linkedin.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors duration-300'
              >
                <Linkedin className='h-5 w-5' />
              </a>
              <a
                href='https://tiktok.com'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-colors duration-300'
              >
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                >
                  <path d='M19.59 6.69a4.83 4.83 0 0 1-3.77-4.35V2h-3.45v13.67a2.54 2.54 0 0 1-5.05 0c0-1.4 1.12-2.53 2.5-2.53.7 0 1.36.28 1.85.74l.76-.76a4.47 4.47 0 0 0-2.61-.84 4.5 4.5 0 0 0-4.5 4.5c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5V9.4a8.16 8.16 0 0 0 4.3 1.1V6.69a4.85 4.85 0 0 1-1.05-.01z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-gray-300 hover:text-white transition-colors duration-300'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/properties'
                  className='text-gray-300 hover:text-white transition-colors duration-300'
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-gray-300 hover:text-white transition-colors duration-300'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/services'
                  className='text-gray-300 hover:text-white transition-colors duration-300'
                >
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <div className='space-y-3'>
              <div>
                <p className='text-gray-300'>123 Real Estate Ave</p>
                <p className='text-gray-300'>Luxury District, LD 12345</p>
              </div>
              <div>
                <p className='text-gray-300'>Phone: +1 (555) 123-4567</p>
                <p className='text-gray-300'>Email: info@palmside.com</p>
              </div>
              <div>
                <p className='text-gray-300'>Hours: Mon-Fri 9AM-6PM</p>
                <p className='text-gray-300'>Sat 10AM-4PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='border-t border-gray-800 mt-8 pt-8'>
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
