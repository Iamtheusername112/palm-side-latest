'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides = [
    {
      type: 'image',
      src: '/heroimages/flugzeugfluegel-hero1.jpeg',
      alt: 'Flugzeugfluegel',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/flugzeuglandet-hero2.jpeg',
      alt: 'Flugzeug landet',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/beach6-hero3.jpeg',
      alt: 'Beach',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/kathedrale-hero4.jpeg',
      alt: 'Kathedrale',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/drinks-hero5.jpeg',
      alt: 'Drinks',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/property5-hero6.jpeg',
      alt: 'Property exterior',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/pooloutside-hero7.jpeg',
      alt: 'Pool outside',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/terrasse-hero8.jpeg',
      alt: 'Terrasse',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/dining-hero9.jpeg',
      alt: 'Dining room',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/wohnzimmer-hero10.jpeg',
      alt: 'Wohnzimmer',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/schlafzimmer3-hero11.jpeg',
      alt: 'Schlafzimmer',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/kueche-hero12.jpeg',
      alt: 'Kueche',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/glasboden2-hero13.jpeg',
      alt: 'Glasboden',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/sauna-hero14.jpeg',
      alt: 'Sauna',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/poolinside-hero15.jpeg',
      alt: 'Pool inside',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
    {
      type: 'image',
      src: '/heroimages/gitarrenzimmer.jpeg',
      alt: 'Gitarrenzimmer',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance',
    },
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
              <h2 className='text-2xl md:text-3xl font-semibold mb-4 text-amber-100'>
                {slide.subtitle}
              </h2>
              <p className='text-lg md:text-xl mb-8 text-gray-200'>
                {slide.description}
              </p>
              <div className='space-x-4'>
                <button className='bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105'>
                  Explore Properties
                </button>
                <button className='border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105'>
                  Learn More
                </button>
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