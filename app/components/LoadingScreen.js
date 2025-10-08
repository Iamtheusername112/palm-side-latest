'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    // Minimum loading time of 1 second for smooth experience
    const minLoadTime = setTimeout(() => {
      setIsFadingOut(true)
      // Remove from DOM after fade animation completes
      setTimeout(() => {
        setIsLoading(false)
      }, 500) // Match the fade-out duration
    }, 1000)

    return () => clearTimeout(minLoadTime)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50 to-yellow-50 transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className='flex flex-col items-center space-y-8'>
        {/* Logo with pulse animation */}
        <div className='relative'>
          {/* Glowing background effect */}
          <div className='absolute inset-0 -m-4 animate-ping opacity-75'>
            <div className='h-40 w-40 rounded-full bg-gradient-to-r from-amber-400 to-green-500 blur-2xl'></div>
          </div>
          
          {/* Logo */}
          <div className='relative animate-pulse'>
            <Image
              src='/logo/palmside-logo-transparent.png'
              alt='Palmside Logo'
              width={200}
              height={200}
              priority
              className='drop-shadow-2xl'
            />
          </div>
        </div>

        {/* Loading text and animated dots */}
        <div className='flex flex-col items-center space-y-4'>
          {/* Bouncing dots */}
          <div className='flex items-center space-x-3'>
            <div className='h-3 w-3 animate-bounce rounded-full bg-amber-600 shadow-lg [animation-delay:-0.3s]'></div>
            <div className='h-3 w-3 animate-bounce rounded-full bg-green-600 shadow-lg [animation-delay:-0.15s]'></div>
            <div className='h-3 w-3 animate-bounce rounded-full bg-amber-600 shadow-lg'></div>
          </div>
          
          {/* Loading text */}
          <p className='text-lg font-semibold text-gray-700 animate-pulse'>
            Loading Palmside...
          </p>
        </div>
      </div>
    </div>
  )
}
