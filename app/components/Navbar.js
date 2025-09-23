'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X, Home, Building2, TrendingUp, Briefcase, Waves, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const t = useTranslations('Navbar')

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
      icon: Waves,
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
    <>
    <nav className='bg-white shadow-lg fixed w-full z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-24'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <div className='relative h-24 w-72 md:h-24 md:w-80'>
                <Image
                  src='/palmside-logo-transparent.png'
                  alt='Palmside Logo'
                  fill
                  priority
                  quality={100}
                  sizes='(max-width: 768px) 288px, 320px'
                  className='object-contain'
                />
              </div>
               
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
            <Link href='/' className='text-gray-700 hover:text-[#D4AF37] px-3 py-2 rounded-md text-lg xl:text-xl font-medium transition-colors'>
  {t('home')}
</Link>

<Link
  href='/services'
  className='text-gray-700 hover:text-[#D4AF37] px-3 py-2 rounded-md text-lg xl:text-xl font-medium transition-colors'
>
  {t('services')}
</Link>

                             <Link
                href='/properties'
                className='text-gray-700 hover:text-[#D4AF37] px-3 py-2 rounded-md text-lg xl:text-xl font-medium transition-colors'
               >
                 {t('properties')}
               </Link>
              <Link
                href='/about'
                className='text-gray-700 hover:text-[#D4AF37] px-3 py-2 rounded-md text-lg xl:text-xl font-medium transition-colors'
              >
                {t('about')}
              </Link>
              <Link
                href='/contact'
                className='text-gray-700 hover:text-[#D4AF37] px-3 py-2 rounded-md text-lg xl:text-xl font-medium transition-colors'
              >
                {t('contact')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-700 hover:text-[#D4AF37] focus:outline-none focus:text-blue-600'
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
              className='text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md text-xl font-medium'
            >
              {t('home')}
            </Link>
            <Link
              href='/services'
              className='text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md text-xl font-medium'
            >
              {t('services')}
            </Link>
            <Link
              href='/properties'
              className='text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md text-xl font-medium'
            >
              {t('properties')}
            </Link>
            <Link
              href='/about'
              className='text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md text-xl font-medium'
            >
              {t('about')}
            </Link>
            
            <Link
              href='/contact'
              className='text-gray-700 hover:text-[#D4AF37] block px-3 py-2 rounded-md text-xl font-medium'
            >
              {t('contact')}
            </Link>
            <div className='px-3 py-2'>
              <LanguageSwitcher compact />
            </div>
          </div>
        </div>
      )}
    </nav>
    <div aria-hidden className='h-24'></div>
    </>
  )
}

export default Navbar

