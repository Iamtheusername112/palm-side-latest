'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

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
      relatedTarget && typeof relatedTarget.closest === 'function' && relatedTarget.closest('a')
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
              <div className='w-10 h-10 bg-gradient-to-r from-yellow-500 to-green-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>P</span>
              </div>
              <span className='ml-2 text-xl font-bold text-gray-900'>
                Palmside
              </span>
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
                className='absolute bottom-0 h-1 bg-gradient-to-r from-yellow-500 to-green-600 transition-all duration-300 ease-in-out rounded-full'
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
                Home
              </Link>

              <Link
                href='/services'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Services
              </Link>

              <Link
                href='/properties'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Properties
              </Link>
              <Link
                href='/about'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                About Us
              </Link>
              <Link
                href='/contact'
                className='text-gray-700 hover:text-yellow-600 px-6 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-0 focus:bg-transparent active:bg-transparent visited:bg-transparent'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Contact Us
              </Link>
            </div>
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
      {isOpen && (
        <div className='md:hidden'>
          <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg'>
            <Link
              href='/'
              className='text-gray-700 hover:text-yellow-600 block px-6 py-4 text-xl font-medium focus:outline-none focus:ring-0 focus:bg-transparent'
            >
              Home
            </Link>
            <Link
              href='/services'
              className='text-gray-700 hover:text-yellow-600 block px-6 py-4 text-xl font-medium focus:outline-none focus:ring-0 focus:bg-transparent'
            >
              Services
            </Link>
            <Link
              href='/properties'
              className='text-gray-700 hover:text-yellow-600 block px-6 py-4 text-xl font-medium focus:outline-none focus:ring-0 focus:bg-transparent'
            >
              Properties
            </Link>
            <Link
              href='/about'
              className='text-gray-700 hover:text-yellow-600 block px-6 py-4 text-xl font-medium focus:outline-none focus:ring-0 focus:bg-transparent'
            >
              About Us
            </Link>
            <Link
              href='/contact'
              className='text-gray-700 hover:text-yellow-600 block px-6 py-4 text-xl font-medium focus:outline-none focus:ring-0 focus:bg-transparent'
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
