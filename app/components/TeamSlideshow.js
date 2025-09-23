'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  { src: '/about/team6.jpeg', alt: 'Palmside Team 6', position: 'center 12%' },
  { src: '/about/team3.jpeg', alt: 'Palmside Team 3', position: 'center 18%' },
  { src: '/about/team7.jpeg', alt: 'Palmside Team 7', position: 'center 15%' },
]

export default function TeamSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <div className='relative w-full aspect-[4/3] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl'>
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes='(min-width: 1024px) 60vw, 100vw'
            className='object-cover'
            quality={95}
            priority={i === 0}
            style={{ objectPosition: s.position || 'center 15%' }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none' />
        </div>
      ))}

      {/* Arrows */}
      <button
        type='button'
        aria-label='Previous slide'
        onClick={prev}
        className='absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow focus:outline-none'
      >
        <ChevronLeft className='h-5 w-5' />
      </button>
      <button
        type='button'
        aria-label='Next slide'
        onClick={next}
        className='absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 p-2 rounded-full shadow focus:outline-none'
      >
        <ChevronRight className='h-5 w-5' />
      </button>

      {/* Dots */}
      <div className='absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? 'bg-white' : 'bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}


