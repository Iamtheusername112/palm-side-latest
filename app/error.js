'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-green-50 flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <div className='w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <AlertTriangle className='h-10 w-10 text-red-600' />
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Something went wrong!
          </h1>
          <p className='text-gray-600 mb-8'>
            An unexpected error occurred. Please try again or go back to the
            home page.
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={reset}
            className='inline-flex items-center px-6 py-3 bg-[#B08D57] text-white rounded-lg hover:bg-[#9C7C49] transition-all duration-200'
          >
            <RefreshCw className='h-5 w-5 mr-2' />
            Try Again
          </button>
          <Link
            href='/'
            className='inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200'
          >
            <Home className='h-5 w-5 mr-2' />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}
