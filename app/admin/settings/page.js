'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, User, Shield, Save, AlertCircle } from 'lucide-react'

const AdminSettings = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const adminData = await response.json()
          setAdmin(adminData)
          setFormData({
            firstName: adminData.firstName || '',
            lastName: adminData.lastName || '',
            email: adminData.email || '',
          })
        } else {
          router.push('/sign-in')
          return
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch admin data:', error)
        router.push('/sign-in')
      }
    }

    fetchAdminData()
  }, [router])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const response = await fetch('/api/admin/update-credentials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Credentials updated successfully!',
        })
        setAdmin((prev) => ({ ...prev, ...formData }))
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Failed to update credentials',
        })
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred while updating credentials',
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-xl'>P</span>
              </div>
              <span className='ml-3 text-xl font-bold text-gray-900'>
                Admin Settings
              </span>
            </div>
            <button
              onClick={() => router.push('/admin')}
              className='text-gray-600 hover:text-gray-800 transition-colors duration-300'
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Page Title */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Admin Settings</h1>
          <p className='text-gray-600 mt-2'>
            Manage your account credentials and security settings
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}
          >
            <div className='flex'>
              <div className='flex-shrink-0'>
                {message.type === 'success' ? (
                  <Settings className='h-5 w-5 text-green-400' />
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

        {/* Settings Form */}
        <div className='bg-white rounded-lg shadow-sm border'>
          <div className='px-6 py-4 border-b'>
            <h3 className='text-lg font-semibold text-gray-900 flex items-center'>
              <User className='h-5 w-5 mr-2' />
              Account Information
            </h3>
            <p className='text-sm text-gray-600 mt-1'>
              Update your personal information and email address
            </p>
          </div>

          <form onSubmit={handleSubmit} className='p-6 space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>

              <div>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
              <p className='text-sm text-gray-500 mt-1'>
                This email will be used for authentication with Kinde
              </p>
            </div>

            <div className='flex items-center justify-between pt-4 border-t'>
              <div className='flex items-center text-sm text-gray-600'>
                <Shield className='h-4 w-4 mr-2' />
                <span>Only you can modify these settings</span>
              </div>
              <button
                type='submit'
                disabled={isSaving}
                className='bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium transition-colors duration-300 flex items-center'
              >
                <Save className='h-4 w-4 mr-2' />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Security Information */}
        <div className='mt-8 bg-white rounded-lg shadow-sm border'>
          <div className='px-6 py-4 border-b'>
            <h3 className='text-lg font-semibold text-gray-900 flex items-center'>
              <Shield className='h-5 w-5 mr-2' />
              Security Information
            </h3>
          </div>
          <div className='p-6 space-y-4'>
            <div className='flex justify-between items-center py-3 border-b border-gray-100'>
              <span className='text-sm font-medium text-gray-700'>
                Last Login
              </span>
              <span className='text-sm text-gray-600'>
                {admin?.lastLoginAt
                  ? new Date(admin.lastLoginAt).toLocaleString()
                  : 'Never'}
              </span>
            </div>
            <div className='flex justify-between items-center py-3 border-b border-gray-100'>
              <span className='text-sm font-medium text-gray-700'>
                Account Status
              </span>
              <span className='text-sm text-green-600 font-medium'>Active</span>
            </div>
            <div className='flex justify-between items-center py-3'>
              <span className='text-sm font-medium text-gray-700'>Role</span>
              <span className='text-sm text-blue-600 font-medium'>
                Super Admin
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
