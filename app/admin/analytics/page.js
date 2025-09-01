'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Mail,
  DollarSign,
  Calendar,
  MapPin,
  PieChart,
  LineChart,
  Activity,
  Target,
  Zap,
} from 'lucide-react'

const AdminAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('30d')
  const [loading, setLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalProperties: 0,
      activeListings: 0,
      totalContacts: 0,
      conversionRate: 0,
      avgResponseTime: 0,
      revenue: 0,
    },
    trends: {
      properties: [],
      contacts: [],
      revenue: [],
    },
    topLocations: [],
    propertyTypes: [],
    contactSources: [],
  })

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        `/api/admin/analytics?timeRange=${timeRange}`
      )

      console.log('Analytics response status:', response.status)

      if (response.ok) {
        const data = await response.json()
        console.log('Analytics data:', data)

        if (data.success) {
          setAnalyticsData(data)
        } else {
          console.error(
            'Analytics API returned error:',
            data.error,
            data.details
          )
          // Set empty data to show "no data available" messages
          setAnalyticsData({
            overview: {
              totalProperties: 0,
              activeListings: 0,
              totalContacts: 0,
              conversionRate: 0,
              avgResponseTime: 0,
              revenue: 0,
            },
            trends: {
              properties: [],
              contacts: [],
              revenue: [],
            },
            topLocations: [],
            propertyTypes: [],
            contactSources: [],
          })
        }
      } else {
        const errorData = await response.json().catch(() => ({}))
        console.error(
          'Failed to fetch analytics data:',
          response.status,
          errorData
        )

        // Show database connection error message
        if (response.status === 500) {
          toast.warning('Database connection required!', {
            description:
              'Please set up your DATABASE_URL in .env.local file to see real analytics data.',
            duration: 8000,
          })
        }

        // Set empty data to show "no data available" messages
        setAnalyticsData({
          overview: {
            totalProperties: 0,
            activeListings: 0,
            totalContacts: 0,
            conversionRate: 0,
            avgResponseTime: 0,
            revenue: 0,
          },
          trends: {
            properties: [],
            contacts: [],
            revenue: [],
          },
          topLocations: [],
          propertyTypes: [],
          contactSources: [],
        })
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error)

      // Show database connection error message
      toast.warning('Database connection required!', {
        description:
          'Please set up your DATABASE_URL in .env.local file to see real analytics data.',
        duration: 8000,
      })

      // Set empty data to show "no data available" messages
      setAnalyticsData({
        overview: {
          totalProperties: 0,
          activeListings: 0,
          totalContacts: 0,
          conversionRate: 0,
          avgResponseTime: 0,
          revenue: 0,
        },
        trends: {
          properties: [],
          contacts: [],
          revenue: [],
        },
        topLocations: [],
        propertyTypes: [],
        contactSources: [],
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  if (loading) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Analytics Dashboard
              </h1>
              <p className='text-gray-600 mt-1'>
                Track your business performance and insights
              </p>
            </div>

            <div className='flex items-center space-x-3'>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='7d'>Last 7 days</option>
                <option value='30d'>Last 30 days</option>
                <option value='90d'>Last 90 days</option>
                <option value='1y'>Last year</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto bg-gray-50'>
        <div className='px-6 py-6'>
          {/* Overview Stats */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8'>
            <div className='bg-white rounded-xl shadow-sm p-6 border'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Total Properties
                  </p>
                  <p className='text-2xl font-bold text-gray-900 mt-1'>
                    {formatNumber(analyticsData.overview.totalProperties)}
                  </p>
                </div>
                <div className='p-3 rounded-full bg-blue-100 text-blue-600'>
                  <Building2 className='h-6 w-6' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
                <span className='text-sm font-medium text-green-600'>+12%</span>
                <span className='text-sm text-gray-600 ml-1'>
                  from last month
                </span>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6 border'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Active Listings
                  </p>
                  <p className='text-2xl font-bold text-gray-900 mt-1'>
                    {formatNumber(analyticsData.overview.activeListings)}
                  </p>
                </div>
                <div className='p-3 rounded-full bg-green-100 text-green-600'>
                  <Target className='h-6 w-6' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
                <span className='text-sm font-medium text-green-600'>+8%</span>
                <span className='text-sm text-gray-600 ml-1'>
                  from last month
                </span>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6 border'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Total Contacts
                  </p>
                  <p className='text-2xl font-bold text-gray-900 mt-1'>
                    {formatNumber(analyticsData.overview.totalContacts)}
                  </p>
                </div>
                <div className='p-3 rounded-full bg-purple-100 text-purple-600'>
                  <Mail className='h-6 w-6' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
                <span className='text-sm font-medium text-green-600'>+15%</span>
                <span className='text-sm text-gray-600 ml-1'>
                  from last month
                </span>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6 border'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Conversion Rate
                  </p>
                  <p className='text-2xl font-bold text-gray-900 mt-1'>
                    {analyticsData.overview.conversionRate}%
                  </p>
                </div>
                <div className='p-3 rounded-full bg-yellow-100 text-yellow-600'>
                  <Activity className='h-6 w-6' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
                <span className='text-sm font-medium text-green-600'>
                  +2.1%
                </span>
                <span className='text-sm text-gray-600 ml-1'>
                  from last month
                </span>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6 border'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Avg Response Time
                  </p>
                  <p className='text-2xl font-bold text-gray-900 mt-1'>
                    {analyticsData.overview.avgResponseTime}h
                  </p>
                </div>
                <div className='p-3 rounded-full bg-red-100 text-red-600'>
                  <Zap className='h-6 w-6' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <TrendingDown className='h-4 w-4 text-green-500 mr-1' />
                <span className='text-sm font-medium text-green-600'>
                  -0.5h
                </span>
                <span className='text-sm text-gray-600 ml-1'>
                  from last month
                </span>
              </div>
            </div>

            <div className='bg-white rounded-xl shadow-sm p-6 border'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    Total Revenue
                  </p>
                  <p className='text-2xl font-bold text-gray-900 mt-1'>
                    {formatCurrency(analyticsData.overview.revenue)}
                  </p>
                </div>
                <div className='p-3 rounded-full bg-emerald-100 text-emerald-600'>
                  <DollarSign className='h-6 w-6' />
                </div>
              </div>
              <div className='mt-4 flex items-center'>
                <TrendingUp className='h-4 w-4 text-green-500 mr-1' />
                <span className='text-sm font-medium text-green-600'>+18%</span>
                <span className='text-sm text-gray-600 ml-1'>
                  from last month
                </span>
              </div>
            </div>
          </div>

          {/* Charts and Data */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            {/* Property Trends */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Property Trends
              </h3>
              <div className='space-y-4'>
                {analyticsData.trends.properties.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <span className='text-sm text-gray-600'>{item.date}</span>
                    <div className='flex items-center space-x-3'>
                      <div className='w-32 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full'
                          style={{ width: `${(item.value / 30) * 100}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8 text-right'>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Trends */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Contact Trends
              </h3>
              <div className='space-y-4'>
                {analyticsData.trends.contacts.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <span className='text-sm text-gray-600'>{item.date}</span>
                    <div className='flex items-center space-x-3'>
                      <div className='w-32 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-green-600 h-2 rounded-full'
                          style={{ width: `${(item.value / 70) * 100}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8 text-right'>
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Distribution Charts */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            {/* Top Locations */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Properties by Location
              </h3>
              <div className='space-y-4'>
                {analyticsData.topLocations.map((location, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center'>
                      <MapPin className='h-4 w-4 text-gray-400 mr-2' />
                      <span className='text-sm text-gray-600'>
                        {location.location}
                      </span>
                    </div>
                    <div className='flex items-center space-x-3'>
                      <div className='w-24 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-purple-600 h-2 rounded-full'
                          style={{ width: `${location.percentage}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8 text-right'>
                        {location.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Types */}
            <div className='bg-white rounded-xl shadow-sm border p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Properties by Type
              </h3>
              <div className='space-y-4'>
                {analyticsData.propertyTypes.map((type, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <span className='text-sm text-gray-600'>{type.type}</span>
                    <div className='flex items-center space-x-3'>
                      <div className='w-24 bg-gray-200 rounded-full h-2'>
                        <div
                          className='bg-blue-600 h-2 rounded-full'
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900 w-8 text-right'>
                        {type.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Sources */}
          <div className='bg-white rounded-xl shadow-sm border p-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Contact Sources
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {analyticsData.contactSources.map((source, index) => (
                <div
                  key={index}
                  className='text-center p-4 bg-gray-50 rounded-lg'
                >
                  <div className='text-2xl font-bold text-gray-900 mb-2'>
                    {formatNumber(source.count)}
                  </div>
                  <div className='text-sm text-gray-600 mb-1'>
                    {source.source}
                  </div>
                  <div className='text-xs text-gray-500'>
                    {source.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminAnalyticsPage
