'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides = [
    {
      type: 'video',
      src: '/video/videopalm3-short.mp4',
      alt: 'Palmside lifestyle video',
      title: 'Start your journey',
      subtitle: 'Begin your adventure in style',
      description:
        'Your journey begins with comfort and elegance from the very first step.',
    },
    {
      type: 'image',
      src: '/heroimages/flugzeugfluegel-hero1.jpeg',
      alt: 'Start your journey',
      title: 'Start your journey',
      subtitle: 'Begin your adventure in style',
      description: 'Your journey begins with comfort and elegance from the very first step.',
    },
    {
      type: 'image',
      src: '/heroimages/flugzeuglandet-hero2.jpeg',
      alt: 'Seamless Transfer',
      title: 'Seamless Transfer',
      subtitle: 'From runway to relaxation',
      description: 'Your next chapter begins smoothly, transitioning effortlessly to the destination that awaits.',
    },
    {
      type: 'image',
      src: '/heroimages/beach6-hero3.jpeg',
      alt: 'Endless Coastlines',
      title: 'Endless Coastlines',
      subtitle: 'Relax by the Mediterranean sea',
      description: 'Soak up the sun and enjoy the turquoise waters.',
    },
    {
      type: 'image',
      src: '/heroimages/kathedrale-hero4.jpeg',
      alt: 'Cathedral Views',
      title: 'Historic Elegance',
      subtitle: 'Discover the timeless beauty of Mallorca',
      description: 'Immerse yourself in culture and architectural splendor.',
    },
    {
      type: 'image',
      src: '/heroimages/drinks-hero5.jpeg',
      alt: 'Sunset & Cocktails',
      title: 'Sunset & Cocktails',
      subtitle: 'Relax with a perfect view',
      description: 'Enjoy unforgettable evenings with vibrant sunsets and drinks.',
    },
    {
      type: 'image',
      src: '/heroimages/property5-hero6.jpeg',
      alt: 'Luxury Villa',
      title: 'Discover Your Dream Home',
      subtitle: 'Luxury properties in prime locations',
      description: 'Experience the perfect blend of comfort and elegance.',
    },
    {
      type: 'image',
      src: '/heroimages/pooloutside-hero7.jpeg',
      alt: 'Private Pool',
      title: 'Dive Into Relaxation',
      subtitle: 'Luxury living with your own pool',
      description: 'Refresh in style with exclusive poolside moments.',
    },
    {
      type: 'image',
      src: '/heroimages/terrasse-hero8.jpeg',
      alt: 'Terrace with Pool',
      title: 'Terrace with Pool',
      subtitle: 'Enjoy outdoor living',
      description: 'A perfect blend of comfort, style, and sunshine.',
    },
    {
      type: 'image',
      src: '/heroimages/dining-hero9.jpeg',
      alt: 'Modern Dining Spaces',
      title: 'Modern Dining Spaces',
      subtitle: 'Modern brightful rooms',
      description: 'Savor exquisite meals in a modern setting.',
    },
    {
      type: 'image',
      src: '/heroimages/wohnzimmer-hero10.jpeg',
      alt: 'Stylish Living Room',
      title: 'Stylish Living Room',
      subtitle: 'Elegant interiors for relaxed living',
      description: 'Comfort and luxury in perfect harmony.',
    },
    {
      type: 'image',
      src: '/heroimages/schlafzimmer3-hero11.jpeg',
      alt: 'Luxury Bedroom',
      title: 'Luxury Bedroom',
      subtitle: 'Rest in style and comfort',
      description: 'A sanctuary designed for relaxation and tranquility.',
    },
    {
      type: 'image',
      src: '/heroimages/kueche-hero12.jpeg',
      alt: 'Modern Kitchen',
      title: 'Modern Kitchen',
      subtitle: 'Enjoy cooking in modern, well-equipped kitchens',
      description: 'A kitchen designed for ease, style, and everyday living.',
    },
    {
      type: 'image',
      src: '/heroimages/glasboden2-hero13.jpeg',
      alt: 'Stylish Interior with Glass Floor',
      title: 'Stylish Interior',
      subtitle: 'Innovative designs for modern living',
      description: 'Unique interiors combining beauty and function.',
    },
    {
      type: 'image',
      src: '/heroimages/sauna-hero14.jpeg',
      alt: 'Wellness and Relaxation',
      title: 'Sauna & Wellness',
      subtitle: 'Relax your body and mind',
      description: 'The ultimate wellness experience in your private retreat.',
    },
    {
      type: 'image',
      src: '/heroimages/poolinside-hero15.jpeg',
      alt: 'Indoor Wellness Pool',
      title: 'Wellness',
      subtitle: 'Rejuvenate indoors',
      description: 'Luxury spa and wellness at your fingertips.',
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
          <div className='absolute inset-0 bg-gradient-to-r from-amber-700/50 to-green-700/50 z-10' />
          {slide.type === 'video' ? (
            <video
              className='w-full h-full object-cover'
              src={slide.src}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <div
              className='w-full h-full bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage: `url(${slide.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          )}

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
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center'>
                <button className='bg-gradient-to-r from-amber-700 to-green-700 hover:from-amber-800 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto'>
                  Explore Properties
                </button>
                <button className='border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto'>
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