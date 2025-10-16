'use client'

import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <h1 className='text-9xl font-bold text-amber-600 mb-4'>404</h1>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>
            Page Not Found
          </h2>
          <p className='text-gray-600 mb-8'>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/'
            className='inline-flex items-center px-6 py-3 bg-[#B08D57] text-white rounded-lg hover:bg-[#9C7C49] transition-all duration-200'
          >
            <Home className='h-5 w-5 mr-2' />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className='inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200'
          >
            <ArrowLeft className='h-5 w-5 mr-2' />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
