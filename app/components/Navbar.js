'use client'

import { ChevronDown, Globe, Menu, X } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '../../components/ui/dropdown-menu'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const langCloseTimerRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const openLang = () => {
    if (langCloseTimerRef.current) {
      clearTimeout(langCloseTimerRef.current)
      langCloseTimerRef.current = null
    }
    setIsLangOpen(true)
  }

  const scheduleLangClose = () => {
    if (langCloseTimerRef.current) {
      clearTimeout(langCloseTimerRef.current)
    }
    langCloseTimerRef.current = setTimeout(() => {
      setIsLangOpen(false)
      langCloseTimerRef.current = null
    }, 150)
  }

  return (
    <header className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='w-full px-0'>
        <div className='flex h-20 items-center justify-between pt-1 px-2 sm:px-3 lg:px-4'>
          {/* Logo */}
          <Link
            href='/'
            className='flex items-center space-x-2 hover:opacity-80 transition-opacity mt-1 cursor-pointer'
          >
            <Image
              src={'/palmside-logo-transparent-black.png'}
              alt='PalmSide logo'
              width={150}
              height={28}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className='text-sm font-medium transition-colors hover:text-[#D4AF37] cursor-pointer'
            >
              Home
            </Link>
            <Link
              href='/about'
              className='text-sm font-medium transition-colors hover:text-[#D4AF37] cursor-pointer'
            >
              About us
            </Link>

            {/* Services Dropdown */}
            <div className='relative group'>
              <Link
                href='/services'
                className='flex items-center space-x-1 text-sm font-medium transition-colors hover:text-[#D4AF37] cursor-pointer'
              >
                <span>Services</span>
                <ChevronDown className='h-4 w-4' />
              </Link>
              <div className='absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                <div className='py-2'>
                  <Link
                    href='/services#property-search'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] cursor-pointer'
                  >
                    Property Search
                  </Link>
                  <Link
                    href='/services#investment-consulting'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] cursor-pointer'
                  >
                    Investment Consulting
                  </Link>
                  <Link
                    href='/services#market-analysis'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] cursor-pointer'
                  >
                    Market Analysis
                  </Link>
                  <Link
                    href='/services#luxury-concierge'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] cursor-pointer'
                  >
                    Luxury Concierge
                  </Link>
                  <Link
                    href='/services#construction-renovation'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] cursor-pointer'
                  >
                    Construction & Renovation
                  </Link>
                  <Link
                    href='/services#marketing-presentation'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] cursor-pointer'
                  >
                    Marketing & Presentation
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href='/properties'
              className='text-sm font-medium transition-colors hover:text-[#D4AF37] cursor-pointer'
            >
              Properties
            </Link>
            <Link
              href='/contact'
              className='text-sm font-medium transition-colors hover:text-[#D4AF37] cursor-pointer'
            >
              Contact
            </Link>
            <div>
              {isClient && (
                <DropdownMenu open={isLangOpen} onOpenChange={setIsLangOpen} modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type='button'
                      aria-label='Change language'
                      className='p-2 rounded transition-colors hover:text-[#D4AF37] data-[state=open]:text-[#D4AF37] cursor-pointer'
                      title='Language'
                      onPointerDown={(e) => e.preventDefault()}
                      onClick={(e) => e.preventDefault()}
                      onMouseEnter={openLang}
                      onMouseLeave={scheduleLangClose}
                      suppressHydrationWarning
                    >
                      <Globe className='h-5 w-5' />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align='end'
                    sideOffset={8}
                    onMouseEnter={openLang}
                    onMouseLeave={scheduleLangClose}
                    className='bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48'
                  >
                    <DropdownMenuItem className='px-4 py-2 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 data-[highlighted]:text-[#D4AF37] data-[highlighted]:bg-gray-50 cursor-pointer'>English</DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 data-[highlighted]:text-[#D4AF37] data-[highlighted]:bg-gray-50 cursor-pointer'>Español</DropdownMenuItem>
                    <DropdownMenuItem className='px-4 py-2 text-sm text-gray-700 hover:text-[#D4AF37] hover:bg-gray-50 data-[highlighted]:text-[#D4AF37] data-[highlighted]:bg-gray-50 cursor-pointer'>Deutsch</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <Link
              href='/admin'
              className='text-sm font-medium text-primary hover:text-primary/80 cursor-pointer'
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className='h-4 w-4' />
            ) : (
              <Menu className='h-4 w-4' />
            )}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className='md:hidden border-t border-gray-200 bg-white'>
            <nav className='py-4 space-y-4'>
              <Link
                href='/'
                className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary cursor-pointer'
              >
                Home
              </Link>
              <Link
                href='/about'
                className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary cursor-pointer'
              >
                About us
              </Link>
              <div className='px-4'>
                <Link
                  href='/services'
                  className='block text-sm font-medium text-gray-700 mb-2 hover:text-primary cursor-pointer'
                >
                  Services
                </Link>
                <div className='pl-4 space-y-2'>
                  <Link
                    href='/services#property-search'
                    className='block py-1 text-sm text-gray-600 hover:text-primary cursor-pointer'
                  >
                    Property Search
                  </Link>
                  <Link
                    href='/services#investment-consulting'
                    className='block py-1 text-sm text-gray-600 hover:text-primary cursor-pointer'
                  >
                    Investment Consulting
                  </Link>
                  <Link
                    href='/services#market-analysis'
                    className='block py-1 text-sm text-gray-600 hover:text-primary cursor-pointer'
                  >
                    Market Analysis
                  </Link>
                  <Link
                    href='/services#luxury-concierge'
                    className='block py-1 text-sm text-gray-600 hover:text-primary cursor-pointer'
                  >
                    Luxury Concierge
                  </Link>
                  <Link
                    href='/services#construction-renovation'
                    className='block py-1 text-sm text-gray-600 hover:text-primary cursor-pointer'
                  >
                    Construction & Renovation
                  </Link>
                  <Link
                    href='/services#marketing-presentation'
                    className='block py-1 text-sm text-gray-600 hover:text-primary cursor-pointer'
                  >
                    Marketing & Presentation
                  </Link>
                </div>
              </div>
              <Link
                href='/properties'
                className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary cursor-pointer'
              >
                Properties
              </Link>
              <Link
                href='/contact'
                className='block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary cursor-pointer'
              >
                Contact
              </Link>
              <Link
                href='/admin'
                className='block px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 cursor-pointer'
              >
                Admin
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
