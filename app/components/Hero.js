'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('Hero')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides = [
    {
      type: 'image',
      src: ' /hero/property5.jpeg',
      alt: 'Luxury Villa',
      title: t('slides.0.title'),
      subtitle: t('slides.0.subtitle'),
      description: t('slides.0.description'),
    },
    {
      type: 'image',
      src: ' /hero/property1.jpeg',
      alt: 'Modern Apartment',
      title: t('slides.1.title'),
      subtitle: t('slides.1.subtitle'),
      description: t('slides.1.description'),
    },
    /*
    {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      alt: 'Beachfront Property',
      title: 'Beachfront Paradise',
      subtitle: 'Exclusive beachfront properties',
      description: 'Your gateway to coastal luxury',
    },
    */
    {
      type: 'image',
      src: ' /hero/property6.jpeg',
      alt: 'Exclusive Villa in Mallorca',
      title: t('slides.2.title'),
      subtitle: t('slides.2.subtitle'),
      description: t('slides.2.description'),
    },
    {
      type: 'image',
      src: '/hero/flugzeug.jpg',
      alt: 'Arrival by Plane',
      title: t('slides.3.title'),
      subtitle: t('slides.3.subtitle'),
      description: t('slides.3.description'),
    },
    {
      type: 'image',
      src: '/hero/Flugzeuglandung.jpg',
      alt: 'Airplane Landing in Mallorca',
      title: t('slides.4.title'),
      subtitle: t('slides.4.subtitle'),
      description: t('slides.4.description'),
    },
  
    {
      type: 'image',
      src: '/hero/beach6.jpeg',
      alt: 'Endless Coastlines',
      title: t('slides.5.title'),
      subtitle: t('slides.5.subtitle'),
      description: t('slides.5.description'),
    },
    
    {
      type: 'image',
      src: '/hero/beach4.jpeg',
      alt: 'Mallorca sunset',
      title: t('slides.6.title'),
      subtitle: t('slides.6.subtitle'),
      description: t('slides.6.description'),
    },
    /*
    {
      type: 'image',
      src: '/hero/sunset3.jpeg',
      alt: 'Mallorca Sunset',
      title: 'Unforgettable Evenings',
      subtitle: 'Moments that belong to you',
      description: 'Enjoy sunsets, fine dining, and vibrant nightlife in Mallorca.',
    },
    */
  ]

  useEffect(() => {
    if (!isPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className='relative h-screen overflow-hidden'>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className='absolute inset-0 bg-black/40 z-10' />
          <div
            className='w-full h-full bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Content Overlay */}
          <div className='absolute inset-0 z-20 flex items-center justify-center'>
            <div className='text-center text-white max-w-4xl mx-auto px-4'>
              <h1 className='text-5xl md:text-7xl font-bold mb-4 animate-fade-in'>
                {slide.title}
              </h1>
              <h2 className='text-2xl md:text-3xl font-semibold mb-4 text-blue-200'>
                {slide.subtitle}
              </h2>
              <p className='text-lg md:text-xl mb-8 text-gray-200'>
                {slide.description}
              </p>
              <div className='flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4'>
                <Link
                  href='/properties'
                  className='bg-gradient-to-r from-[#B08D57] via-[#C5A880] to-emerald-600 text-white hover:opacity-90 px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105 cursor-pointer'
                >
                  {t('cta.explore')}
                </Link>
                <Link
                  href='/services'
                  className='border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer'
                >
                  {t('cta.learn')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300'
      >
        <ChevronRight className='h-6 w-6' />
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className='absolute top-4 right-4 z-30 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300'
      >
        {isPlaying ? (
          <Pause className='h-5 w-5' />
        ) : (
          <Play className='h-5 w-5' />
        )}
      </button>

      {/* Dots Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2'>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30'>
        <div className='w-6 h-10 border-2 border-white/50 rounded-full flex justify-center'>
          <div className='w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce' />
        </div>
      </div>
    </section>
  )
}

export default Hero
