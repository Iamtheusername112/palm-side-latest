'use client'

import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Generate particle positions - memoized to prevent regeneration
  const particles = useMemo(() => {
    if (!isMounted) return []
    
    return Array.from({ length: 20 }, (_, i) => {
      const angle = (i * 360) / 20
      const distance = 150 + Math.random() * 100
      const tx = Math.cos((angle * Math.PI) / 180) * distance
      const ty = Math.sin((angle * Math.PI) / 180) * distance
      const delay = Math.random() * 0.5
      const color = i % 2 === 0 ? '#d97706' : '#10b981'
      
      return { tx, ty, delay, color, id: i }
    })
  }, [isMounted])

  useEffect(() => {
    // Set mounted to true after component mounts
    setIsMounted(true)

    // Minimum loading time of 2 seconds to see full particle animation
    const minLoadTime = setTimeout(() => {
      setIsFadingOut(true)
      // Remove from DOM after fade animation completes
      setTimeout(() => {
        setIsLoading(false)
      }, 500) // Match the fade-out duration
    }, 2000)

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
        {/* Logo with particle formation */}
        <div className='relative w-[200px] h-[200px]'>
          {/* Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className='particle absolute top-1/2 left-1/2 w-3 h-3 rounded-full -ml-1.5 -mt-1.5'
              style={{
                '--tx-start': `${particle.tx}px`,
                '--ty-start': `${particle.ty}px`,
                '--tx-end': `${-particle.tx}px`,
                '--ty-end': `${-particle.ty}px`,
                backgroundColor: particle.color,
                animationDelay: `${particle.delay}s`,
                boxShadow: `0 0 10px ${particle.color}`,
              }}
            />
          ))}

          {/* Logo with reveal animation */}
          <div className='absolute inset-0 animate-logo-reveal'>
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

        {/* Loading text */}
        <p className='text-lg font-semibold text-gray-700 animate-pulse'>
          Loading Palmside...
        </p>
      </div>
    </div>
  )
}
