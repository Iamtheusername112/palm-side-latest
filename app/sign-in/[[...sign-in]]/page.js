'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <div className='flex justify-center'>
            <div className='w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-3xl'>P</span>
            </div>
          </div>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>
            Admin Sign In
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Access your Palmside Real Estate admin dashboard
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-50 border border-red-200 rounded-md p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-red-800'>{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <div className='space-y-6'>
            <Link
              href='/api/auth/login'
              className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors'
            >
              Sign in with Kinde
            </Link>

            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Secure authentication powered by Kinde
              </p>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <p className='text-sm text-gray-600'>
            Only authorized administrators can access this area
          </p>
        </div>
      </div>
    </div>
  )
}
