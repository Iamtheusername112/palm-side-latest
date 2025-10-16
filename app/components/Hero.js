'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Translate from '../../components/Translate'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  const slides = [
    {
      type: 'video',
      src: '/video/videopalm3-short.mp4',
      alt: 'Palmside lifestyle video',
      title: 'Welcome to Palmside',
      titleKey: 'hero.welcome',
      subtitle: 'Your trusted partner in real estates',
      subtitleKey: 'hero.subtitle',
      description:
        'Discover the perfect place to call home in Mallorca with us by your side.',
      descriptionKey: 'hero.description',
    },
    {
      type: 'image',
      src: '/heroimages/flugzeugfluegel-hero1.jpeg',
      alt: 'Start your journey',
      title: 'Start your journey',
      titleKey: 'hero.startJourney',
      subtitle: 'Begin your adventure in style',
      subtitleKey: 'hero.beginAdventure',
      description:
        'Your journey begins with comfort and elegance from the very first step.',
      descriptionKey: 'hero.journeyDescription',
    },
    {
      type: 'image',
      src: '/heroimages/flugzeuglandet-hero2.jpeg',
      alt: 'Seamless Transfer',
      title: 'Seamless Transfer',
      titleKey: 'hero.seamlessTransfer',
      subtitle: 'From runway to relaxation',
      subtitleKey: 'hero.runwayToRelaxation',
      description:
        'Your next chapter begins smoothly, transitioning effortlessly to the destination that awaits.',
      descriptionKey: 'hero.transferDescription',
    },
    {
      type: 'image',
      src: '/heroimages/beach6-hero3.jpeg',
      alt: 'Endless Coastlines',
      title: 'Endless Coastlines',
      titleKey: 'hero.endlessCoastlines',
      subtitle: 'Relax by the Mediterranean sea',
      subtitleKey: 'hero.mediterraneanSea',
      description: 'Soak up the sun and enjoy the turquoise waters.',
      descriptionKey: 'hero.coastlineDescription',
    },
    {
      type: 'image',
      src: '/heroimages/kathedrale-hero4.jpeg',
      alt: 'Cathedral Views',
      title: 'Historic Elegance',
      titleKey: 'hero.historicElegance',
      subtitle: 'Discover the timeless beauty of Mallorca',
      subtitleKey: 'hero.timelessBeauty',
      description: 'Immerse yourself in culture and architectural splendor.',
      descriptionKey: 'hero.eleganceDescription',
    },
    {
      type: 'image',
      src: '/heroimages/drinks-hero5.jpeg',
      alt: 'Sunset & Cocktails',
      title: 'Sunset & Drinks',
      titleKey: 'hero.sunsetDrinks',
      subtitle: 'Relax with a perfect view',
      subtitleKey: 'hero.perfectView',
      description:
        'Enjoy unforgettable evenings with vibrant sunsets and drinks.',
      descriptionKey: 'hero.drinksDescription',
    },
    {
      type: 'image',
      src: '/heroimages/property5-hero6.jpeg',
      alt: 'Luxury Villa',
      title: 'Discover Your Dream Home',
      titleKey: 'hero.dreamHome',
      subtitle: 'Luxury properties in prime locations',
      subtitleKey: 'hero.luxuryProperties',
      description: 'Experience the perfect blend of comfort and elegance.',
      descriptionKey: 'hero.homeDescription',
    },
    {
      type: 'image',
      src: '/heroimages/pooloutside-hero7.jpeg',
      alt: 'Private Pool',
      title: 'Dive Into Relaxation',
      titleKey: 'hero.diveRelaxation',
      subtitle: 'Luxury living with your own pool',
      subtitleKey: 'hero.ownPool',
      description: 'Refresh in style with exclusive poolside moments.',
      descriptionKey: 'hero.poolDescription',
    },
    {
      type: 'image',
      src: '/heroimages/terrasse-hero8.jpeg',
      alt: 'Terrace with Pool',
      title: 'Terrace with Pool',
      titleKey: 'hero.terracePool',
      subtitle: 'Enjoy outdoor living',
      subtitleKey: 'hero.outdoorLiving',
      description: 'A perfect blend of comfort, style, and sunshine.',
      descriptionKey: 'hero.terraceDescription',
    },
    {
      type: 'image',
      src: '/heroimages/dining-hero9.jpeg',
      alt: 'Modern Dining Spaces',
      title: 'Modern Dining Spaces',
      titleKey: 'hero.modernDining',
      subtitle: 'Modern brightful rooms',
      subtitleKey: 'hero.brightfulRooms',
      description: 'Savor exquisite meals in a modern setting.',
      descriptionKey: 'hero.diningDescription',
    },
    {
      type: 'image',
      src: '/heroimages/wohnzimmer-hero10.jpeg',
      alt: 'Stylish Living Room',
      title: 'Stylish Living Room',
      titleKey: 'hero.stylishLiving',
      subtitle: 'Elegant interiors for relaxed living',
      subtitleKey: 'hero.elegantInteriors',
      description: 'Comfort and luxury in perfect harmony.',
      descriptionKey: 'hero.livingDescription',
    },
    {
      type: 'image',
      src: '/heroimages/schlafzimmer3-hero11.jpeg',
      alt: 'Luxury Bedroom',
      title: 'Luxury Bedroom',
      titleKey: 'hero.luxuryBedroom',
      subtitle: 'Rest in style and comfort',
      subtitleKey: 'hero.restInStyle',
      description: 'A sanctuary designed for relaxation and tranquility.',
      descriptionKey: 'hero.bedroomDescription',
    },
    {
      type: 'image',
      src: '/heroimages/kueche-hero12.jpeg',
      alt: 'Modern Kitchen',
      title: 'Modern Kitchen',
      titleKey: 'hero.modernKitchen',
      subtitle: 'Enjoy cooking in modern, well-equipped kitchens',
      subtitleKey: 'hero.wellEquipped',
      description: 'A kitchen designed for ease, style, and everyday living.',
      descriptionKey: 'hero.kitchenDescription',
    },
    {
      type: 'image',
      src: '/heroimages/glasboden2-hero13.jpeg',
      alt: 'Stylish Interior with Glass Floor',
      title: 'Stylish Interior',
      titleKey: 'hero.stylishInterior',
      subtitle: 'Innovative designs for modern living',
      subtitleKey: 'hero.innovativeDesigns',
      description: 'Unique interiors combining beauty and function.',
      descriptionKey: 'hero.interiorDescription',
    },
    {
      type: 'image',
      src: '/heroimages/sauna-hero14.jpeg',
      alt: 'Wellness and Relaxation',
      title: 'Sauna & Wellness',
      titleKey: 'hero.saunaWellness',
      subtitle: 'Relax your body and mind',
      subtitleKey: 'hero.relaxBodyMind',
      description: 'The ultimate wellness experience in your private retreat.',
      descriptionKey: 'hero.wellnessDescription',
    },
    {
      type: 'image',
      src: '/heroimages/poolinside-hero15.jpeg',
      alt: 'Indoor Wellness Pool',
      title: 'Wellness',
      titleKey: 'hero.wellness',
      subtitle: 'Rejuvenate indoors',
      subtitleKey: 'hero.rejuvenateIndoors',
      description: 'Luxury spa and wellness at your fingertips.',
      descriptionKey: 'hero.wellnessIndoorsDescription',
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
          {!(index === 0 && slide.type === 'video') && (
            <div className='absolute inset-0 z-10 pointer-events-none'>
              <div className='absolute inset-0 bg-gradient-to-r from-[#704214]/35 via-[#8B5E3C]/25 to-[#B08D57]/20 mix-blend-multiply'></div>
              <div className='absolute inset-0 bg-amber-900/10'></div>
            </div>
          )}
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
                <Translate staticKey={slide.titleKey}>{slide.title}</Translate>
              </h1>
              <h2 className='text-2xl md:text-3xl font-semibold mb-4 text-amber-100'>
                <Translate staticKey={slide.subtitleKey}>
                  {slide.subtitle}
                </Translate>
              </h2>
              <p className='text-lg md:text-xl mb-8 text-gray-200'>
                <Translate staticKey={slide.descriptionKey}>
                  {slide.description}
                </Translate>
              </p>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center'>
                <Link
                  href='/properties'
                  className='inline-block text-center bg-[#B08D57] hover:bg-[#9C7C49] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto'
                >
                  <Translate staticKey='hero.exploreProperties'>
                    Explore Properties
                  </Translate>
                </Link>
                <Link
                  href='/services'
                  className='inline-block text-center border-2 border-white text-white hover:bg-white hover:text-amber-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto'
                >
                  <Translate staticKey='hero.learnMore'>Learn More</Translate>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className='absolute left-4 bottom-24 md:bottom-auto md:top-1/2 md:transform md:-translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300'
      >
        <ChevronLeft className='h-5 w-5 md:h-6 md:w-6' />
      </button>

      <button
        onClick={nextSlide}
        className='absolute right-4 bottom-24 md:bottom-auto md:top-1/2 md:transform md:-translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-all duration-300'
      >
        <ChevronRight className='h-5 w-5 md:h-6 md:w-6' />
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
