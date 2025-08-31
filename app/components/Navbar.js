'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X, Home, Building2, TrendingUp, Briefcase, Globe, Waves, Sparkles } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const services = [
    {
      name: 'Property Management',
      description: 'Comprehensive property management services',
      icon: Building2,
      href: '/services/property-management'
    },
    {
      name: 'Real Estate Investment',
      description: 'Strategic investment opportunities',
      icon: TrendingUp,
      href: '/services/real-estate-investment'
    },
    {
      name: 'Property Development',
      description: 'Custom development solutions',
      icon: Sparkles,
      href: '/services/property-development'
    },
    {
      name: 'Consulting Services',
      description: 'Expert real estate consulting',
      icon: Briefcase,
      href: '/services/consulting-services'
    },
    {
      name: 'Legal Services',
      description: 'Real estate legal expertise',
      icon: Globe,
      href: '/services/legal-services'
    },
  ]

  const properties = [
    'Luxury Homes',
    'Investment Properties',
    'Commercial Real Estate',
    'Beachfront Properties',
    'New Developments',
    'International Properties',
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

                                   <div
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className={`absolute left-0 mt-2 w-80 bg-white border border-gray-200 shadow-xl rounded-lg z-50 transition-all duration-300 ease-out transform ${
                      isServicesOpen 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
                    }`}
                  >
                     <div className="p-3 border-b border-gray-200">
                       <h3 className="text-gray-900 font-semibold text-sm">
                         Our Services
                       </h3>
                     </div>
                     <div className="p-1">
                       {services.map((service, index) => {
                         const IconComponent = service.icon
                         return (
                           <Link
                             key={index}
                             href={service.href}
                             className="flex items-start gap-3 px-3 py-3 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                           >
                             <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                               <IconComponent className="h-4 w-4 text-white" />
                             </div>
                             <div className="flex-1 min-w-0">
                               <p className="text-sm font-medium text-gray-900 leading-none">
                                 {service.name}
                               </p>
                               <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                 {service.description}
                               </p>
                             </div>
                           </Link>
                         )
                       })}
                     </div>
                   </div>
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
              <Link
                href='/contact'
                className='text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors'
              >
                Contact Us
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
              {services.map((service, index) => {
                const IconComponent = service.icon
                return (
                  <Link
                    key={index}
                    href={service.href}
                    className='text-gray-600 hover:text-blue-600 block px-6 py-2 rounded-md text-sm flex items-center gap-2'
                  >
                    <IconComponent className="h-4 w-4" />
                    {service.name}
                  </Link>
                )
              })}
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
            <Link
              href='/contact'
              className='text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium'
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
