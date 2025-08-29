'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const services = [
    'Property Management',
    'Real Estate Investment',
    'Property Development',
    'Consulting Services',
    'Legal Services',
  ]

  return (
    <nav className='bg-white shadow-lg fixed w-full z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>P</span>
              </div>
              <span className='ml-2 text-xl font-bold text-gray-900'>
                Palmside
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              <Link
                href='/'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div className='relative'>
                <button
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                  className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center'
                >
                  Services
                  <ChevronDown className='ml-1 h-4 w-4' />
                </button>

                {isServicesOpen && (
                  <div
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className='absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50'
                  >
                    {services.map((service, index) => (
                      <Link
                        key={index}
                        href={`/services/${service
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors'
                      >
                        {service}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href='/properties'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                Properties
              </Link>
              <Link
                href='/about'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600'
            >
              {isOpen ? (
                <X className='h-6 w-6' />
              ) : (
                <Menu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg'>
            <Link
              href='/'
              className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Home
            </Link>
            <div className='space-y-1'>
              <div className='text-gray-700 px-3 py-2 text-base font-medium'>
                Services
              </div>
              {services.map((service, index) => (
                <Link
                  key={index}
                  href={`/services/${service
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  className='text-gray-600 hover:text-blue-600 block px-6 py-2 rounded-md text-sm'
                >
                  {service}
                </Link>
              ))}
            </div>
            <Link
              href='/properties'
              className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Properties
            </Link>
            <Link
              href='/about'
              className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
