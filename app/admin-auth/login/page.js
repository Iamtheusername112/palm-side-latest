'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react'

const AdminLogin = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Login successful! Redirecting...',
        })

        // Redirect to admin dashboard
        setTimeout(() => {
          router.push('/admin')
        }, 1000)
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Login failed',
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred during login',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='max-w-md w-full space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <div className='mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center'>
            <span className='text-white text-3xl font-bold'>P</span>
          </div>
          <h2 className='mt-6 text-3xl font-bold text-gray-900'>
            Admin Dashboard
          </h2>
          <p className='mt-2 text-sm text-gray-600'>
            Sign in to access the admin panel
          </p>
        </div>

        {/* Login Form */}
        <div className='bg-white rounded-lg shadow-xl p-8'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Message Display */}
            {message.text && (
              <div
                className={`p-4 rounded-md ${
                  message.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    {message.type === 'success' ? (
                      <CheckCircle className='h-5 w-5 text-green-400' />
                    ) : (
                      <AlertCircle className='h-5 w-5 text-red-400' />
                    )}
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium'>{message.text}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email Address
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className='block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  placeholder='Enter your email address'
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='h-5 w-5 text-gray-400' />
                </div>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className='block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 pr-3 flex items-center'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                  ) : (
                    <Eye className='h-5 w-5 text-gray-400 hover:text-gray-600' />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200'
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>

          {/* Security Note */}
          <div className='mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md'>
            <div className='flex'>
              <Lock className='h-5 w-5 text-blue-400 mt-0.5' />
              <div className='ml-3'>
                <h4 className='text-sm font-medium text-blue-800'>
                  Security Notice
                </h4>
                <p className='text-sm text-blue-700 mt-1'>
                  This admin dashboard is restricted to authorized personnel
                  only. All login attempts are logged and monitored for security
                  purposes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='text-center'>
          <p className='text-xs text-gray-500'>
            © 2024 Palm Side. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
