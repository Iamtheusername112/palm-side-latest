'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Building2,
  Users,
  Home,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
} from 'lucide-react'

const AdminDashboard = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from the server-side session
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          // If not authenticated, redirect to sign-in
          router.push('/sign-in')
          return
        }
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
        router.push('/sign-in')
      }
    }

    fetchUserData()
  }, [router])

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  const handleSignOut = async () => {
    if (isLoggingOut) return // Prevent multiple clicks

    setIsLoggingOut(true)
    try {
      const response = await fetch('/api/auth/logout')
      const data = await response.json()

      if (data.success) {
        // First redirect to Kinde logout to clear their session
        window.location.href = data.logoutUrl
      } else {
        // If logout failed, just redirect to home
        router.push('/')
      }
    } catch (error) {
      console.error('Logout failed:', error)
      // If there's an error, redirect to home
      router.push('/')
    } finally {
      setIsLoggingOut(false)
    }
  }

  const stats = [
    {
      title: 'Total Properties',
      value: '156',
      icon: Building2,
      change: '+12%',
      color: 'text-blue-600',
    },
    {
      title: 'Active Listings',
      value: '89',
      icon: Home,
      change: '+8%',
      color: 'text-green-600',
    },
    {
      title: 'Total Clients',
      value: '1,234',
      icon: Users,
      change: '+23%',
      color: 'text-purple-600',
    },
    {
      title: 'Revenue',
      value: '$2.4M',
      icon: DollarSign,
      change: '+15%',
      color: 'text-orange-600',
    },
  ]

  const recentActivities = [
    {
      id: 1,
      action: 'New property listed',
      property: 'Luxury Villa in Beverly Hills',
      time: '2 hours ago',
    },
    {
      id: 2,
      action: 'Property sold',
      property: 'Modern Apartment Downtown',
      time: '5 hours ago',
    },
    {
      id: 3,
      action: 'New client registered',
      property: 'John Smith',
      time: '1 day ago',
    },
    {
      id: 4,
      action: 'Property updated',
      property: 'Beachfront Condo',
      time: '2 days ago',
    },
  ]

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
                Palmside Admin
              </span>
            </div>

            <div className='flex items-center space-x-4'>
              <button className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center'>
                <Plus className='h-4 w-4 mr-2' />
                Add Property
              </button>

              {/* User Profile */}
              <div className='flex items-center space-x-3'>
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={`${user.firstName} ${user.lastName}`}
                    className='w-8 h-8 rounded-full'
                  />
                )}
                <div className='text-right'>
                  <p className='text-sm font-medium text-gray-900'>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className='text-xs text-gray-500'>{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className='text-gray-600 hover:text-gray-800 transition-colors duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <LogOut className='h-4 w-4 mr-2' />
                {isLoggingOut ? 'Signing Out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Welcome Section */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>
            Welcome back, {user?.firstName || 'Admin'}!
          </h1>
          <p className='text-gray-600 mt-2'>
            Here's what's happening with your real estate business today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          {stats.map((stat, index) => (
            <div
              key={index}
              className='bg-white rounded-lg shadow-sm p-6 border'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    {stat.title}
                  </p>
                  <p className='text-2xl font-bold text-gray-900 mt-1'>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className='h-6 w-6' />
                </div>
              </div>
              <div className='mt-4'>
                <span className='text-sm font-medium text-green-600'>
                  {stat.change}
                </span>
                <span className='text-sm text-gray-600 ml-1'>
                  from last month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Recent Activities */}
          <div className='lg:col-span-2'>
            <div className='bg-white rounded-lg shadow-sm border'>
              <div className='px-6 py-4 border-b'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Recent Activities
                </h3>
              </div>
              <div className='p-6'>
                <div className='space-y-4'>
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className='flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0'
                    >
                      <div>
                        <p className='font-medium text-gray-900'>
                          {activity.action}
                        </p>
                        <p className='text-sm text-gray-600'>
                          {activity.property}
                        </p>
                      </div>
                      <span className='text-sm text-gray-500'>
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
                <button className='w-full mt-4 text-blue-600 hover:text-blue-700 font-medium text-sm'>
                  View all activities
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className='space-y-6'>
            <div className='bg-white rounded-lg shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Quick Actions
              </h3>
              <div className='space-y-3'>
                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center'>
                  <Plus className='h-4 w-4 mr-2' />
                  Add New Property
                </button>
                <button className='w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center'>
                  <Users className='h-4 w-4 mr-2' />
                  Manage Clients
                </button>
                <button className='w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center'>
                  <BarChart3 className='h-4 w-4 mr-2' />
                  View Reports
                </button>
                <button className='w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center'>
                  <Settings className='h-4 w-4 mr-2' />
                  Settings
                </button>
              </div>
            </div>

            {/* Search Properties */}
            <div className='bg-white rounded-lg shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Search Properties
              </h3>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search properties...'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <Search className='absolute right-3 top-2.5 h-5 w-5 text-gray-400' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
