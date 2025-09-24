'use client'

import { useState, useEffect } from 'react'
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Heart,
  Eye,
  Share2,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useTranslations, useLocale } from 'next-intl'

const PropertiesPage = () => {
  const t = useTranslations('Properties')
  const [viewMode, setViewMode] = useState('grid')
  const [favorites, setFavorites] = useState(new Set())
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    location: 'all',
    featured: 'all',
  })

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)

        const queryParams = new URLSearchParams({
          page: '1',
          limit: '50',
          ...(filters.type !== 'all' && { type: filters.type }),
          ...(filters.status !== 'all' && { status: filters.status }),
          ...(filters.location !== 'all' && { location: filters.location }),
          ...(filters.featured === 'true' && { featured: 'true' }),
        })

        const response = await fetch(`/api/properties?${queryParams}`, {
          cache: 'no-store',
        })

        // Ensure we actually got JSON back
        const contentType = response.headers.get('content-type') || ''
        if (!response.ok) {
          const text = await response.text()
          throw new Error(`Request failed ${response.status}. ${text.slice(0, 200)}`)
        }
        if (!contentType.includes('application/json')) {
          const text = await response.text()
          throw new Error(`Unexpected response type: ${contentType}. ${text.slice(0, 200)}`)
        }

        let data
        try {
          data = await response.json()
        } catch (e) {
          const text = await response.text()
          throw new Error(`Invalid JSON: ${String(e)}. ${text.slice(0, 200)}`)
        }

        if (data && data.success) {
          setProperties(data.properties)
        } else {
          setError(data?.error || 'Failed to fetch properties')
        }
      } catch (err) {
        console.error('Error fetching properties:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to fetch properties'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [filters])

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId)
    } else {
      newFavorites.add(propertyId)
    }
    setFavorites(newFavorites)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      <Navbar />

      {/* Hero Section */}
      <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 py-20'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in'>
            {t('hero.title')}
          </h1>
          <p className='text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto'>
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-36 -translate-y-36'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48'></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Filters */}
        <div className='bg-white rounded-2xl shadow-lg p-6 mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {t('filters.type.label')}
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='all'>{t('filters.type.all')}</option>
                <option value='Luxury Homes'>{t('filters.type.options.luxuryHomes')}</option>
                <option value='Investment Properties'>
                  {t('filters.type.options.investment')}
                </option>
                <option value='Commercial Real Estate'>
                  {t('filters.type.options.commercial')}
                </option>
                <option value='Property Development'>
                  {t('filters.type.options.development')}
                </option>
                <option value='Residential'>{t('filters.type.options.residential')}</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {t('filters.status.label')}
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='all'>{t('filters.status.all')}</option>
                <option value='For Sale'>{t('filters.status.options.forSale')}</option>
                <option value='For Lease'>{t('filters.status.options.forLease')}</option>
                <option value='Sold'>{t('filters.status.options.sold')}</option>
                <option value='Leased'>{t('filters.status.options.leased')}</option>
                <option value='Pre-Construction'>{t('filters.status.options.preConstruction')}</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {t('filters.location.label')}
              </label>
              <input
                type='text'
                placeholder={t('filters.location.placeholder')}
                value={filters.location === 'all' ? '' : filters.location}
                onChange={(e) =>
                  handleFilterChange('location', e.target.value || 'all')
                }
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {t('filters.featured.label')}
              </label>
              <select
                value={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value='all'>{t('filters.featured.all')}</option>
                <option value='true'>{t('filters.featured.only')}</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle and Results Count */}
        <div className='flex justify-between items-center mb-8'>
          <div className='flex items-center space-x-4'>
            {loading ? (
              <div className='flex items-center space-x-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                <span className='text-gray-600'>{t('loading')}</span>
              </div>
            ) : (
              <span className='text-gray-600'>
                {t('resultCount', {count: properties.length})}
              </span>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <div className='grid grid-cols-2 gap-1 w-4 h-4'>
                <div className='bg-current rounded-sm'></div>
                <div className='bg-current rounded-sm'></div>
                <div className='bg-current rounded-sm'></div>
                <div className='bg-current rounded-sm'></div>
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
          <div className='space-y-1 w-4 h-4'>
                <div className='bg-current rounded-sm h-1'></div>
                <div className='bg-current rounded-sm h-1'></div>
                <div className='bg-current rounded-sm h-1'></div>
              </div>
            </button>
          </div>
        </div>

        {/* Properties Grid/List */}
        {loading ? (
          <div className='flex justify-center items-center py-20'>
            <div className='text-center'>
              <Loader2 className='h-12 w-12 animate-spin text-blue-600 mx-auto mb-4' />
              <p className='text-gray-600'>{t('loading')}</p>
            </div>
          </div>
        ) : error ? (
          <div className='flex justify-center items-center py-20'>
            <div className='text-center'>
              <div className='bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                <span className='text-red-600 text-2xl'>⚠</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                {t('errors.loadTitle')}
              </h3>
              <p className='text-gray-600 mb-4'>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
              >
                {t('errors.tryAgain')}
              </button>
            </div>
          </div>
        ) : properties.length === 0 ? (
          <div className='flex justify-center items-center py-20'>
            <div className='text-center'>
              <div className='bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                <span className='text-gray-600 text-2xl'>🏠</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                {t('errors.emptyTitle')}
              </h3>
              <p className='text-gray-600'>
                {t('errors.emptyDesc')}
              </p>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                viewMode='grid'
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
              />
            ))}
          </div>
        ) : (
          <div className='space-y-6'>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                viewMode='list'
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

const PropertyCard = ({ property, viewMode, isFavorite, onToggleFavorite }) => {
  const t = useTranslations('Properties')
  const locale = useLocale()
  const formatPrice = (price) => {
    if (price >= 1000000) {
      const value = (price / 1000000).toLocaleString(locale, { maximumFractionDigits: 1, minimumFractionDigits: 1 })
      return `$${value}M`
    } else if (price >= 1000) {
      const value = (price / 1000).toLocaleString(locale, { maximumFractionDigits: 0 })
      return `$${value}K`
    }
    return `$${price.toLocaleString(locale)}`
  }

  if (viewMode === 'list') {
    return (
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden'>
        <div className='flex flex-col lg:flex-row'>
          {/* Image */}
          <div className='lg:w-1/3 h-64 lg:h-auto'>
            <div className='relative h-full'>
              <img
                src={property.image}
                alt={property.title}
                className='w-full h-full object-cover'
              />
              {property.featured && (
                <div className='absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                  {t('labels.featured')}
                </div>
              )}
              <div
                className={`absolute ${
                  property.featured ? 'top-16' : 'top-4'
                } left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold`}
              >
                {property.status}
              </div>
              <button
                onClick={onToggleFavorite}
                className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
                  isFavorite
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-600 hover:bg-white'
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
                />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='lg:w-2/3 p-6'>
            <div className='flex justify-between items-start mb-4'>
              <div>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                  {property.title}
                </h3>
                <div className='flex items-center text-gray-600 mb-3'>
                  <MapPin className='h-4 w-4 mr-1' />
                  {property.location}
                </div>
              </div>
              <div className='text-right'>
                <div className='text-3xl font-bold text-blue-600 mb-1'>
                  {formatPrice(property.price)}
                </div>
                <div className='flex items-center text-gray-600'>
                  <Star className='h-4 w-4 text-yellow-400 mr-1 fill-current' />
                  {property.rating}
                </div>
              </div>
            </div>

            <p className='text-gray-600 mb-4'>{property.description}</p>

            {/* Property Details */}
            <div className='flex items-center space-x-6 mb-4'>
              {property.beds > 0 && (
                <div className='flex items-center text-gray-600'>
                  <Bed className='h-4 w-4 mr-1' />
                  <span>{property.beds} {t('units.beds')}</span>
                </div>
              )}
              {property.baths > 0 && (
                <div className='flex items-center text-gray-600'>
                  <Bath className='h-4 w-4 mr-1' />
                  <span>{property.baths} {t('units.baths')}</span>
                </div>
              )}
              <div className='flex items-center text-gray-600'>
                <Square className='h-4 w-4 mr-1' />
                <span>{property.sqft.toLocaleString(locale)} {t('units.sqft')}</span>
              </div>
            </div>

            {/* Features */}
            <div className='flex flex-wrap gap-2 mb-6'>
              {property.features.slice(0, 4).map((feature, index) => (
                <span
                  key={index}
                  className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <button className='flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200'>
                  <Eye className='h-4 w-4' />
                  <span>{t('buttons.viewDetails')}</span>
                </button>
                <button className='flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200'>
                  <Share2 className='h-4 w-4' />
                  <span>{t('buttons.share')}</span>
                </button>
              </div>
              <button className='text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1 transition-colors duration-200'>
                <span>{t('buttons.learnMore')}</span>
                <ArrowRight className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group'>
      {/* Image */}
      <div className='relative h-64 overflow-hidden'>
        <img
          src={property.image}
          alt={property.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />
        {property.featured && (
          <div className='absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
            {t('labels.featured')}
          </div>
        )}
        <div
          className={`absolute ${
            property.featured ? 'top-16' : 'top-4'
          } left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold`}
        >
          {property.status}
        </div>
        <button
          onClick={onToggleFavorite}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-gray-600 hover:bg-white'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
        <div className='absolute bottom-4 right-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold'>
          {formatPrice(property.price)}
        </div>
      </div>

      {/* Content */}
      <div className='p-6'>
        <div className='flex items-start justify-between mb-3'>
          <h3 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200'>
            {property.title}
          </h3>
          <div className='flex items-center text-gray-600'>
            <Star className='h-4 w-4 text-yellow-400 mr-1 fill-current' />
            {property.rating}
          </div>
        </div>

        <div className='flex items-center text-gray-600 mb-4'>
          <MapPin className='h-4 w-4 mr-1' />
          {property.location}
        </div>

        <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
          {property.description}
        </p>

        {/* Property Details */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            {property.beds > 0 && (
              <div className='flex items-center text-gray-600 text-sm'>
                <Bed className='h-4 w-4 mr-1' />
                <span>{property.beds}</span>
              </div>
            )}
            {property.baths > 0 && (
              <div className='flex items-center text-gray-600 text-sm'>
                <Bath className='h-4 w-4 mr-1' />
                <span>{property.baths}</span>
              </div>
            )}
            <div className='flex items-center text-gray-600 text-sm'>
              <Square className='h-4 w-4 mr-1' />
              <span>{property.sqft.toLocaleString('en-US')}</span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {property.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs'
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className='flex items-center justify-between'>
          <button className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm'>
            <Eye className='h-4 w-4' />
            <span>{t('buttons.viewDetails')}</span>
          </button>
          <button className='text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center space-x-1 transition-colors duration-200'>
            <span>{t('buttons.learnMore')}</span>
            <ArrowRight className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertiesPage
