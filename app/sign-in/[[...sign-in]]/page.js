'use client'

import Link from 'next/link'

export default function SignInPage() {
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
