'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Translate from '../../components/Translate'
import LanguageSwitcher from '../../components/LanguageSwitcher'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [underlineStyle, setUnderlineStyle] = useState({
    width: 0,
    left: 0,
    opacity: 0,
  })
  const pathname = usePathname()

  // Set active link position on pathname change
  useEffect(() => {
    const activeLink = document.querySelector(`a[href="${pathname}"]`)
    if (activeLink && !hoveredLink) {
      const rect = activeLink.getBoundingClientRect()
      const containerRect = activeLink.parentElement.getBoundingClientRect()
      const targetLeft = rect.left - containerRect.left + 24 // Add left padding (px-6 = 24px)
      const targetWidth = rect.width - 48 // Subtract both left and right padding (px-6 = 24px each)

      setUnderlineStyle({
        width: targetWidth,
        left: targetLeft,
        opacity: 1,
      })
    }
  }, [pathname, hoveredLink])

  const handleMouseEnter = (event) => {
    const linkElement = event.currentTarget
    const rect = linkElement.getBoundingClientRect()
    const containerRect = linkElement.parentElement.getBoundingClientRect()

    setHoveredLink(linkElement)

    // Calculate the target position - use text width only (subtract padding)
    const targetLeft = rect.left - containerRect.left + 24 // Add left padding (px-6 = 24px)
    const targetWidth = rect.width - 48 // Subtract both left and right padding (px-6 = 24px each)

    // Animate directly to target position from current position
    setUnderlineStyle({
      width: targetWidth,
      left: targetLeft,
      opacity: 1,
    })
  }

  const handleMouseLeave = (event) => {
    // Only hide underline if we're not moving to another link
    const relatedTarget = event.relatedTarget
    const movedToLink =
      relatedTarget &&
      typeof relatedTarget.closest === 'function' &&
      relatedTarget.closest('a')
    if (!movedToLink) {
      setHoveredLink(null)

      // Return to active link position
      const activeLink = document.querySelector(`a[href="${pathname}"]`)
      if (activeLink) {
        const rect = activeLink.getBoundingClientRect()
        const containerRect = activeLink.parentElement.getBoundingClientRect()
        const targetLeft = rect.left - containerRect.left + 24 // Add left padding (px-6 = 24px)
        const targetWidth = rect.width - 48 // Subtract both left and right padding (px-6 = 24px each)

        setUnderlineStyle({
          width: targetWidth,
          left: targetLeft,
          opacity: 1,
        })
      } else {
        setUnderlineStyle({ width: 0, left: 0, opacity: 0 })
      }
    }
  }

  return (
    <nav className='bg-white shadow-lg fixed w-full z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link href='/' className='flex items-center'>
              <Image
                src='/logo/palmside-logo-transparent.png'
                alt='Palmside logo'
                width={80}
                height={80}
                priority
                className='w-20 h-20 object-contain'
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:block'>
            <div
              className='ml-10 flex items-baseline space-x-12 relative'
              onMouseLeave={() => {
                setHoveredLink(null)

                // Return to active link position
                const activeLink = document.querySelector(
                  `a[href="${pathname}"]`
                )
                if (activeLink) {
                  const rect = activeLink.getBoundingClientRect()
                  const containerRect =
                    activeLink.parentElement.getBoundingClientRect()
                  const targetLeft = rect.left - containerRect.left + 24 // Add left padding (px-6 = 24px)
                  const targetWidth = rect.width - 48 // Subtract both left and right padding (px-6 = 24px each)

                  setUnderlineStyle({
                    width: targetWidth,
                    left: targetLeft,
                    opacity: 1,
                  })
                } else {
                  setUnderlineStyle({ width: 0, left: 0, opacity: 0 })
                }
              }}
            >
              {/* Animated Underline */}
              <div
                className='absolute bottom-0 h-1 bg-[#B08D57] transition-all duration-300 ease-in-out rounded-full'
                style={{
                  width: `${underlineStyle.width}px`,
                  left: `${underlineStyle.left}px`,
                  opacity: underlineStyle.opacity,
                }}
              ></div>

              <Link
                href='/'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Translate staticKey='nav.home'>Home</Translate>
              </Link>

              <Link
                href='/services'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Translate staticKey='nav.services'>Services</Translate>
              </Link>

              <Link
                href='/properties'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Translate staticKey='nav.properties'>Properties</Translate>
              </Link>
              <Link
                href='/about'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Translate staticKey='nav.about'>About Us</Translate>
              </Link>
              <Link
                href='/contact'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Translate staticKey='nav.contact'>Contact Us</Translate>
              </Link>
            </div>
          </div>

          {/* Language Switcher */}
          <div className='hidden md:block ml-4'>
            <LanguageSwitcher size='sm' />
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-700 hover:text-yellow-600 focus:outline-none focus:text-blue-600'
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
      <div
        className={`md:hidden fixed inset-y-0 right-0 z-50 w-80 max-w-sm transform transition-transform duration-700 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-500 ${
            isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div className='relative flex flex-col h-full bg-white shadow-xl'>
          {/* Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-200'>
            <h2 className='text-xl font-semibold text-gray-900'>
              <Translate staticKey='nav.menu'>Menu</Translate>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className='text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors'
            >
              <X className='h-6 w-6' />
            </button>
          </div>

          {/* Navigation Links */}
          <div className='flex-1 px-6 py-4 space-y-2'>
            <Link
              href='/'
              onClick={() => setIsOpen(false)}
              className='text-gray-700 hover:text-yellow-600 hover:bg-gray-50 block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-gray-50'
            >
              <Translate staticKey='nav.home'>Home</Translate>
            </Link>
            <Link
              href='/services'
              onClick={() => setIsOpen(false)}
              className='text-gray-700 hover:text-yellow-600 hover:bg-gray-50 block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-gray-50'
            >
              <Translate staticKey='nav.services'>Services</Translate>
            </Link>
            <Link
              href='/properties'
              onClick={() => setIsOpen(false)}
              className='text-gray-700 hover:text-yellow-600 hover:bg-gray-50 block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-gray-50'
            >
              <Translate staticKey='nav.properties'>Properties</Translate>
            </Link>
            <Link
              href='/about'
              onClick={() => setIsOpen(false)}
              className='text-gray-700 hover:text-yellow-600 hover:bg-gray-50 block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-gray-50'
            >
              <Translate staticKey='nav.about'>About Us</Translate>
            </Link>
            <Link
              href='/contact'
              onClick={() => setIsOpen(false)}
              className='text-gray-700 hover:text-yellow-600 hover:bg-gray-50 block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:bg-gray-50'
            >
              <Translate staticKey='nav.contact'>Contact Us</Translate>
            </Link>
          </div>

          {/* Mobile Language Switcher */}
          <div className='px-4 py-4 border-t border-gray-200'>
            <LanguageSwitcher
              variant='buttons'
              size='sm'
              className='[&>div]:gap-1 [&_button]:text-xs [&_button]:px-2 [&_button]:py-1 [&_span]:text-sm'
              onLanguageChange={() => setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
