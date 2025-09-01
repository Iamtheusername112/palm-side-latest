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
  Mail,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Heart,
  MessageSquare,
  Phone,
  Globe,
  Target,
  Zap,
  Shield,
  Database,
  Activity,
  PieChart,
  LineChart,
} from 'lucide-react'

const AdminDashboard = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState([
    {
      title: 'Total Properties',
      value: '0',
      icon: Building2,
      change: '0%',
      color: 'text-blue-600',
      trend: 'up',
    },
    {
      title: 'Active Listings',
      value: '0',
      icon: Home,
      change: '0%',
      color: 'text-green-600',
      trend: 'up',
    },
    {
      title: 'Total Clients',
      value: '0',
      icon: Users,
      change: '0%',
      color: 'text-purple-600',
      trend: 'up',
    },
    {
      title: 'New Contacts',
      value: '0',
      icon: Mail,
      change: '0%',
      color: 'text-orange-600',
      trend: 'up',
    },
    {
      title: 'Total Revenue',
      value: '$0',
      icon: DollarSign,
      change: '0%',
      color: 'text-emerald-600',
      trend: 'up',
    },
    {
      title: 'Avg. Response Time',
      value: '0h',
      icon: Clock,
      change: '0%',
      color: 'text-red-600',
      trend: 'down',
    },
  ])

  const [recentProperties, setRecentProperties] = useState([])
  const [recentContacts, setRecentContacts] = useState([])
  const [recentActivities, setRecentActivities] = useState([])
  const [propertyStats, setPropertyStats] = useState({
    byType: [],
    byLocation: [],
    byStatus: [],
  })
  const [contactStats, setContactStats] = useState({
    byStatus: [],
    byPriority: [],
    bySource: [],
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Fetch user data
      const userResponse = await fetch('/api/admin/me')
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData)
      } else {
        router.push('/admin-auth/login')
        return
      }

      // Fetch all dashboard data in parallel
      await Promise.all([
        fetchStats(),
        fetchRecentProperties(),
        fetchRecentContacts(),
        fetchPropertyStats(),
        fetchContactStats(),
        fetchRecentActivities(),
      ])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      // Fetch properties count
      const propertiesResponse = await fetch('/api/admin/properties?limit=1')
      const propertiesData = (await propertiesResponse.ok)
        ? await propertiesResponse.json()
        : { pagination: { total: 0 } }

      // Fetch contacts count
      const contactsResponse = await fetch('/api/admin/contacts?limit=1')
      const contactsData = (await contactsResponse.ok)
        ? await contactsResponse.json()
        : { pagination: { total: 0 } }

      // Fetch new contacts count
      const newContactsResponse = await fetch(
        '/api/admin/contacts?status=new&limit=1'
      )
      const newContactsData = newContactsResponse.ok
        ? await newContactsResponse.json()
        : { pagination: { total: 0 } }

      setStats((prev) =>
        prev.map((stat) => {
          switch (stat.title) {
            case 'Total Properties':
              return {
                ...stat,
                value: propertiesData.pagination?.total?.toString() || '0',
              }
            case 'Active Listings':
              return {
                ...stat,
                value: propertiesData.pagination?.total?.toString() || '0',
              }
            case 'Total Clients':
              return { ...stat, value: '0' } // Will implement when clients API is ready
            case 'New Contacts':
              return {
                ...stat,
                value: newContactsData.pagination?.total?.toString() || '0',
              }
            case 'Total Revenue':
              return { ...stat, value: '$0' } // Will implement when revenue tracking is ready
            case 'Avg. Response Time':
              return { ...stat, value: '2h' } // Will implement when response time tracking is ready
            default:
              return stat
          }
        })
      )
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const fetchRecentProperties = async () => {
    try {
      const response = await fetch('/api/admin/properties?limit=5')
      if (response.ok) {
        const data = await response.json()
        setRecentProperties(data.properties || [])
      }
    } catch (error) {
      console.error('Failed to fetch recent properties:', error)
    }
  }

  const fetchRecentContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts?limit=5')
      if (response.ok) {
        const data = await response.json()
        setRecentContacts(data.contacts || [])
      }
    } catch (error) {
      console.error('Failed to fetch recent contacts:', error)
    }
  }

  const fetchPropertyStats = async () => {
    try {
      // This will be implemented when we have the full properties API
      setPropertyStats({
        byType: [
          { type: 'Luxury Homes', count: 12, percentage: 30 },
          { type: 'Investment Properties', count: 8, percentage: 20 },
          { type: 'Commercial Real Estate', count: 6, percentage: 15 },
          { type: 'Property Development', count: 4, percentage: 10 },
        ],
        byLocation: [
          { location: 'Miami Beach', count: 15, percentage: 35 },
          { location: 'Downtown Miami', count: 10, percentage: 25 },
          { location: 'Coral Gables', count: 8, percentage: 20 },
          { location: 'Brickell', count: 5, percentage: 12 },
        ],
        byStatus: [
          { status: 'For Sale', count: 25, percentage: 60 },
          { status: 'For Lease', count: 10, percentage: 25 },
          { status: 'Pre-Construction', count: 5, percentage: 12 },
          { status: 'Under Construction', count: 2, percentage: 3 },
        ],
      })
    } catch (error) {
      console.error('Failed to fetch property stats:', error)
    }
  }

  const fetchContactStats = async () => {
    try {
      // This will be implemented when we have the full contacts API
      setContactStats({
        byStatus: [
          { status: 'New', count: 8, percentage: 40, color: 'bg-blue-500' },
          { status: 'Read', count: 6, percentage: 30, color: 'bg-yellow-500' },
          {
            status: 'Responded',
            count: 4,
            percentage: 20,
            color: 'bg-green-500',
          },
          { status: 'Closed', count: 2, percentage: 10, color: 'bg-gray-500' },
        ],
        byPriority: [
          { priority: 'Urgent', count: 3, percentage: 15, color: 'bg-red-500' },
          {
            priority: 'High',
            count: 5,
            percentage: 25,
            color: 'bg-orange-500',
          },
          {
            priority: 'Normal',
            count: 10,
            percentage: 50,
            color: 'bg-blue-500',
          },
          { priority: 'Low', count: 2, percentage: 10, color: 'bg-gray-500' },
        ],
        bySource: [
          {
            source: 'Website',
            count: 15,
            percentage: 75,
            color: 'bg-blue-500',
          },
          { source: 'Phone', count: 3, percentage: 15, color: 'bg-green-500' },
          { source: 'Email', count: 2, percentage: 10, color: 'bg-purple-500' },
        ],
      })
    } catch (error) {
      console.error('Failed to fetch contact stats:', error)
    }
  }

  const fetchRecentActivities = async () => {
    try {
      // This will be implemented when we have activity logging
      setRecentActivities([
        {
          id: 1,
          action: 'New property listed',
          property: 'Luxury Villa in Miami Beach',
          time: '2 hours ago',
          type: 'property',
          icon: Building2,
          color: 'text-blue-600',
        },
        {
          id: 2,
          action: 'Contact form submitted',
          contact: 'John Smith - Property Investment',
          time: '3 hours ago',
          type: 'contact',
          icon: Mail,
          color: 'text-green-600',
        },
        {
          id: 3,
          action: 'Property status updated',
          property: 'Downtown Penthouse',
          time: '5 hours ago',
          type: 'property',
          icon: Edit,
          color: 'text-purple-600',
        },
        {
          id: 4,
          action: 'New inquiry received',
          contact: 'Sarah Johnson - Consulting Services',
          time: '1 day ago',
          type: 'contact',
          icon: MessageSquare,
          color: 'text-orange-600',
        },
      ])
    } catch (error) {
      console.error('Failed to fetch recent activities:', error)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return '1 day ago'
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'read':
        return 'bg-yellow-100 text-yellow-800'
      case 'responded':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {/* Top Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Welcome back, {user?.firstName || 'Admin'}! 👋
              </h1>
              <p className='text-gray-600 mt-1'>
                Here's what's happening with your real estate business today.
              </p>
            </div>

            <div className='flex items-center space-x-3'>
              <button
                onClick={fetchDashboardData}
                className='p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg hover:bg-gray-100'
                title='Refresh Dashboard'
              >
                <RefreshCw className='h-5 w-5' />
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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto bg-gray-50'>
        <div className='px-6 py-6'>
          {/* Stats Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8'>
            {stats.map((stat, index) => (
              <div
                key={index}
                className='bg-white rounded-xl shadow-sm p-6 border hover:shadow-md transition-shadow duration-200'
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
                <div className='mt-4 flex items-center'>
                  {stat.trend === 'up' ? (
                    <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
                  ) : (
                    <TrendingDown className='h-4 w-4 text-red-500 mr-1' />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
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
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8'>
            {/* Recent Activities */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-xl shadow-sm border'>
                <div className='px-6 py-4 border-b flex items-center justify-between'>
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
                        <div className='flex items-center'>
                          <div
                            className={`p-2 rounded-full bg-gray-100 ${activity.color} mr-3`}
                          >
                            <activity.icon className='h-4 w-4' />
                          </div>
                          <div>
                            <p className='font-medium text-gray-900'>
                              {activity.action}
                            </p>
                            <p className='text-sm text-gray-600'>
                              {activity.property || activity.contact}
                            </p>
                          </div>
                        </div>
                        <span className='text-sm text-gray-500'>
                          {activity.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='space-y-6'>
              <div className='bg-white rounded-xl shadow-sm border p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Quick Actions
                </h3>
                <div className='space-y-3'>
                  <button
                    onClick={() => router.push('/admin/clients')}
                    className='w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center'
                  >
                    <Users className='h-4 w-4 mr-2' />
                    Manage Clients
                  </button>
                  <button
                    onClick={() => router.push('/admin/contacts')}
                    className='w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center'
                  >
                    <Mail className='h-4 w-4 mr-2' />
                    View Contact Submissions
                  </button>
                  <button
                    onClick={() => router.push('/admin/analytics')}
                    className='w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center'
                  >
                    <BarChart3 className='h-4 w-4 mr-2' />
                    View Reports
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Data Overview Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            {/* Recent Properties */}
            <div className='bg-white rounded-xl shadow-sm border'>
              <div className='px-6 py-4 border-b flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Recent Properties
                </h3>
                <button
                  onClick={() => router.push('/admin/properties')}
                  className='text-blue-600 hover:text-blue-700 font-medium text-sm'
                >
                  View all
                </button>
              </div>
              <div className='p-6'>
                {recentProperties.length > 0 ? (
                  <div className='space-y-4'>
                    {recentProperties.map((property) => (
                      <div
                        key={property.id}
                        className='flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0'
                      >
                        <div className='flex items-center'>
                          <div className='w-12 h-12 bg-gray-200 rounded-lg mr-3'></div>
                          <div>
                            <p className='font-medium text-gray-900'>
                              {property.title}
                            </p>
                            <p className='text-sm text-gray-600'>
                              {property.location}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <p className='font-medium text-gray-900'>
                            ${property.price?.toLocaleString()}
                          </p>
                          <p className='text-sm text-gray-600'>
                            {property.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <Building2 className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-gray-600'>No properties found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Contacts */}
            <div className='bg-white rounded-xl shadow-sm border'>
              <div className='px-6 py-4 border-b flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Recent Contacts
                </h3>
                <button
                  onClick={() => router.push('/admin/contacts')}
                  className='text-blue-600 hover:text-blue-700 font-medium text-sm'
                >
                  View all
                </button>
              </div>
              <div className='p-6'>
                {recentContacts.length > 0 ? (
                  <div className='space-y-4'>
                    {recentContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className='flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0'
                      >
                        <div className='flex items-center'>
                          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                            <span className='text-blue-600 font-medium text-sm'>
                              {contact.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className='font-medium text-gray-900'>
                              {contact.name}
                            </p>
                            <p className='text-sm text-gray-600'>
                              {contact.subject}
                            </p>
                          </div>
                        </div>
                        <div className='text-right'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              contact.status
                            )}`}
                          >
                            {contact.status}
                          </span>
                          <p className='text-sm text-gray-600 mt-1'>
                            {formatDate(contact.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='text-center py-8'>
                    <Mail className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                    <p className='text-gray-600'>No contacts found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analytics Charts */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            {/* Property Distribution */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Property Distribution by Type
              </h3>
              <div className='space-y-3'>
                {propertyStats.byType.map((stat, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <span className='text-sm text-gray-600'>{stat.type}</span>
                    <div className='flex items-center space-x-3'>
                      <div className='w-24 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full'
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8 text-right'>
                        {stat.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Status Distribution */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Contact Status Distribution
              </h3>
              <div className='space-y-3'>
                {contactStats.byStatus.map((stat, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <span className='text-sm text-gray-600'>{stat.status}</span>
                    <div className='flex items-center space-x-3'>
                      <div className='w-24 bg-gray-200 rounded-full h-2'>
                        <div
                          className={`h-2 rounded-full ${stat.color}`}
                          style={{ width: `${stat.percentage}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8 text-right'>
                        {stat.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard
