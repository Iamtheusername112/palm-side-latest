'use client'

import { useState, useEffect } from 'react'
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Eye,
  Loader2,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PropertyDetailsModal from '../components/PropertyDetailsModal'
import PageBanner from '../components/PageBanner'
import Translate from '../../components/Translate'
import { useTranslation } from '../../hooks/useTranslation'

const PropertiesPage = () => {
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState('grid')
  const [favorites, setFavorites] = useState(new Set())
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
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

        const response = await fetch(`/api/properties?${queryParams}`)
        const data = await response.json()

        if (data.success) {
          setProperties(data.properties)
        } else {
          setError('Failed to fetch properties')
        }
      } catch (err) {
        console.error('Error fetching properties:', err)
        setError('Failed to fetch properties')
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

  const handleViewDetails = (property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
  }

  const handleToggleFavorite = async (propertyId) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId)
    } else {
      newFavorites.add(propertyId)
    }
    setFavorites(newFavorites)

    // Here you could also make an API call to persist the favorite
    // await fetch(`/api/properties/${propertyId}/favorite`, { method: 'POST' })
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-green-50'>
      <Navbar />

      <PageBanner
        title={
          <Translate staticKey='banner.properties'>
            Discover Your Dream Property
          </Translate>
        }
        subtitle={
          <Translate staticKey='banner.propertiesSubtitle'>
            Explore our curated collection of premium properties across Mallorca
            and beyond.
          </Translate>
        }
      />

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {/* Mobile Filter Toggle Button */}
        <div className='lg:hidden mb-4'>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className='w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-700 to-green-700 text-white px-6 py-3 rounded-lg hover:from-amber-800 hover:to-green-800 transition-all duration-300 shadow-lg font-medium'
          >
            {showFilters ? (
              <>
                <X className='h-5 w-5' />
                <span>
                  <Translate staticKey='properties.hideFilters'>
                    Hide Filters
                  </Translate>
                </span>
              </>
            ) : (
              <>
                <SlidersHorizontal className='h-5 w-5' />
                <span>
                  <Translate staticKey='properties.showFilters'>
                    Show Filters
                  </Translate>
                </span>
                {Object.values(filters).filter((v) => v !== 'all').length >
                  0 && (
                  <span className='bg-white text-amber-700 px-2 py-0.5 rounded-full text-xs font-bold'>
                    {Object.values(filters).filter((v) => v !== 'all').length}
                  </span>
                )}
              </>
            )}
          </button>
        </div>

        {/* Filters - Collapsible on mobile, always visible on desktop */}
        <div
          className={`bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-300 ease-in-out overflow-hidden ${
            showFilters
              ? 'max-h-[800px] opacity-100 lg:max-h-none'
              : 'max-h-0 opacity-0 p-0 mb-0 lg:max-h-none lg:opacity-100 lg:p-6 lg:mb-8'
          }`}
        >
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Translate staticKey='properties.propertyType'>
                  Property Type
                </Translate>
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
              >
                <option value='all'>{t('properties.allTypes')}</option>
                <option value='Luxury Homes'>
                  {t('properties.luxuryHomes')}
                </option>
                <option value='Investment Properties'>
                  {t('properties.investmentProperties')}
                </option>
                <option value='Commercial Real Estate'>
                  {t('properties.commercialProperties')}
                </option>
                <option value='Property Development'>
                  {t('properties.propertyDevelopment')}
                </option>
                <option value='Residential'>
                  {t('properties.residential')}
                </option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Translate staticKey='properties.status'>Status</Translate>
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
              >
                <option value='all'>{t('properties.allStatus')}</option>
                <option value='For Sale'>{t('properties.forSale')}</option>
                <option value='For Lease'>{t('properties.forLease')}</option>
                <option value='Sold'>{t('properties.sold')}</option>
                <option value='Leased'>{t('properties.leased')}</option>
                <option value='Pre-Construction'>
                  {t('properties.preConstruction')}
                </option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Translate staticKey='properties.location'>Location</Translate>
              </label>
              <input
                type='text'
                placeholder='Enter location...'
                value={filters.location === 'all' ? '' : filters.location}
                onChange={(e) =>
                  handleFilterChange('location', e.target.value || 'all')
                }
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Translate staticKey='properties.featured'>Featured</Translate>
              </label>
              <select
                value={filters.featured}
                onChange={(e) => handleFilterChange('featured', e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent'
              >
                <option value='all'>{t('properties.allProperties')}</option>
                <option value='true'>{t('properties.featured')} Only</option>
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
                <span className='text-gray-600'>
                  <Translate staticKey='properties.loadingProperties'>
                    Loading properties...
                  </Translate>
                </span>
              </div>
            ) : (
              <span className='text-gray-600'>
                {properties.length}{' '}
                <Translate staticKey='properties.propertiesAvailable'>
                  properties available
                </Translate>
              </span>
            )}
          </div>

          <div className='flex items-center space-x-2'>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-yellow-100 text-yellow-600'
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
                  ? 'bg-yellow-100 text-yellow-600'
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
              <p className='text-gray-600'>
                <Translate staticKey='properties.loadingProperties'>
                  Loading properties...
                </Translate>
              </p>
            </div>
          </div>
        ) : error ? (
          <div className='flex justify-center items-center py-20'>
            <div className='text-center'>
              <div className='bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center'>
                <span className='text-red-600 text-2xl'>⚠</span>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                <Translate staticKey='properties.errorLoading'>
                  Error Loading Properties
                </Translate>
              </h3>
              <p className='text-gray-600 mb-4'>{error}</p>
              <button
                onClick={() => window.location.reload()}
                className='bg-gradient-to-r from-yellow-500 to-green-600 text-white px-6 py-2 rounded-lg hover:from-yellow-600 hover:to-green-700 transition-all duration-300'
              >
                <Translate staticKey='properties.tryAgain'>Try Again</Translate>
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
                <Translate staticKey='properties.noPropertiesFound'>
                  No Properties Found
                </Translate>
              </h3>
              <p className='text-gray-600'>
                <Translate staticKey='properties.tryAdjustingFilters'>
                  Try adjusting your filters to see more properties.
                </Translate>
              </p>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch'>
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                viewMode='grid'
                isFavorite={favorites.has(property.id)}
                onToggleFavorite={() => toggleFavorite(property.id)}
                onViewDetails={() => handleViewDetails(property)}
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
                onViewDetails={() => handleViewDetails(property)}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Property Details Modal */}
      <PropertyDetailsModal
        property={selectedProperty}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  )
}

const PropertyCard = ({
  property,
  viewMode,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
}) => {
  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  // Get all available images - prioritize admin uploaded images
  const allImages =
    property?.images &&
    Array.isArray(property.images) &&
    property.images.length > 0
      ? property.images // Use all admin uploaded images
      : [property?.image].filter(Boolean) // Fallback to main image only

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (viewMode === 'list') {
    return (
      <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden h-full'>
        <div className='flex flex-col lg:flex-row h-full'>
          {/* Image Gallery - Show Multiple Images */}
          <div className='lg:w-1/3 h-64 lg:h-80 flex-shrink-0'>
            <div className='relative h-full group'>
              <img
                src={allImages[currentImageIndex]}
                alt={property.title}
                className='w-full h-full object-cover'
              />

              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? allImages.length - 1 : prev - 1
                      )
                    }}
                    className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10'
                  >
                    <ChevronLeft className='h-4 w-4' />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex((prev) =>
                        prev === allImages.length - 1 ? 0 : prev + 1
                      )
                    }}
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10'
                  >
                    <ChevronRight className='h-4 w-4' />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className='absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-10'>
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}

              {property.featured && (
                <div className='absolute top-4 left-4 bg-gradient-to-r from-amber-700 to-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold z-10'>
                  <Translate staticKey='properties.featured'>
                    Featured
                  </Translate>
                </div>
              )}
              <div
                className={`absolute ${
                  property.featured ? 'top-16' : 'top-4'
                } left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold z-10`}
              >
                {property.status}
              </div>
              <div className='absolute bottom-4 right-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold z-10'>
                {formatPrice(property.price)}
              </div>

              {/* Image Grid Preview - Show Multiple Images */}
              {allImages.length > 1 && (
                <div className='absolute bottom-2 left-2 flex space-x-1 z-10'>
                  {allImages.slice(0, 6).map((img, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-8 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                        index === currentImageIndex
                          ? 'border-amber-500 ring-2 ring-amber-200'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${property.title} ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    </button>
                  ))}
                  {allImages.length > 6 && (
                    <div className='w-8 h-8 rounded bg-gradient-to-r from-amber-600 to-green-600 text-white flex items-center justify-center text-xs font-bold'>
                      +{allImages.length - 6}
                    </div>
                  )}
                </div>
              )}

              {/* View All Images Button */}
              {allImages.length > 6 && (
                <div className='absolute bottom-2 right-2'>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onViewDetails()
                    }}
                    className='bg-gradient-to-r from-amber-600 to-green-600 text-white px-3 py-1 rounded-lg shadow-lg hover:from-amber-700 hover:to-green-700 transition-all duration-200 flex items-center space-x-1 font-medium text-xs z-10'
                  >
                    <Eye className='h-3 w-3' />
                    <span>
                      <Translate staticKey='properties.viewAll'>
                        View All
                      </Translate>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className='lg:w-2/3 p-6 flex flex-col flex-grow'>
            <div className='flex justify-between items-start mb-4'>
              <div className='flex-1 pr-4'>
                <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                  {property.title}
                </h3>
                <div className='flex items-center text-gray-600 mb-3'>
                  <MapPin className='h-4 w-4 mr-1 flex-shrink-0' />
                  <span className='truncate'>{property.location}</span>
                </div>
              </div>
              <div className='text-right flex-shrink-0'>
                <div className='flex items-center text-gray-600 justify-end'>
                  <Star className='h-4 w-4 text-yellow-400 mr-1 fill-current' />
                  <span className='font-semibold'>{property.rating}</span>
                </div>
              </div>
            </div>

            <div className='mb-4 flex-grow'>
              <p className='text-gray-600 line-clamp-3 min-h-[3.6rem]'>
                {property.description}
              </p>
            </div>

            {/* Property Details */}
            <div className='flex items-center space-x-6 mb-4'>
              {property.beds > 0 && (
                <div className='flex items-center text-gray-600'>
                  <Bed className='h-4 w-4 mr-1' />
                  <span>
                    {property.beds}{' '}
                    <Translate staticKey='properties.beds'>beds</Translate>
                  </span>
                </div>
              )}
              {property.baths > 0 && (
                <div className='flex items-center text-gray-600'>
                  <Bath className='h-4 w-4 mr-1' />
                  <span>
                    {property.baths}{' '}
                    <Translate staticKey='properties.baths'>baths</Translate>
                  </span>
                </div>
              )}
              <div className='flex items-center text-gray-600'>
                <Square className='h-4 w-4 mr-1' />
                <span>
                  {property.sqft.toLocaleString('en-US')}{' '}
                  <Translate staticKey='properties.sqft'>sq ft</Translate>
                </span>
              </div>
            </div>

            {/* Features */}
            <div className='flex flex-wrap gap-2 mb-6 min-h-[2rem]'>
              {property.features.slice(0, 4).map((feature, index) => (
                <span
                  key={index}
                  className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Actions - Fixed at bottom */}
            <div className='flex items-center justify-center mt-auto'>
              <button
                onClick={onViewDetails}
                className='w-full lg:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-700 to-green-700 text-white px-6 py-3 rounded-lg hover:from-amber-800 hover:to-green-800 transition-colors duration-200 font-medium'
              >
                <Eye className='h-4 w-4' />
                <span>
                  <Translate staticKey='properties.viewDetails'>
                    View Property Details
                  </Translate>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className='bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col'>
      {/* Image Gallery - Show Multiple Images */}
      <div className='relative h-64 overflow-hidden flex-shrink-0'>
        {/* Main Image Display */}
        <img
          src={allImages[currentImageIndex]}
          alt={property.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
        />

        {/* Image Navigation */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImageIndex((prev) =>
                  prev === 0 ? allImages.length - 1 : prev - 1
                )
              }}
              className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10'
            >
              <ChevronLeft className='h-4 w-4' />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setCurrentImageIndex((prev) =>
                  prev === allImages.length - 1 ? 0 : prev + 1
                )
              }}
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 z-10'
            >
              <ChevronRight className='h-4 w-4' />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className='absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium z-10'>
            {currentImageIndex + 1} / {allImages.length}
          </div>
        )}

        {/* Status Badges */}
        {property.featured && (
          <div className='absolute top-4 left-4 bg-gradient-to-r from-amber-700 to-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold z-10'>
            <Translate staticKey='properties.featured'>Featured</Translate>
          </div>
        )}
        <div
          className={`absolute ${
            property.featured ? 'top-16' : 'top-4'
          } left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold z-10`}
        >
          {property.status}
        </div>

        {/* Price */}
        <div className='absolute bottom-4 right-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold z-10'>
          {formatPrice(property.price)}
        </div>

        {/* Image Grid Preview - Show Multiple Images */}
        {allImages.length > 1 && (
          <div className='absolute bottom-2 left-2 flex space-x-1 z-10'>
            {allImages.slice(0, 6).map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                className={`w-8 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'border-amber-500 ring-2 ring-amber-200'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`${property.title} ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
            {allImages.length > 6 && (
              <div className='w-8 h-8 rounded bg-gradient-to-r from-amber-600 to-green-600 text-white flex items-center justify-center text-xs font-bold'>
                +{allImages.length - 6}
              </div>
            )}
          </div>
        )}

        {/* View All Images Button */}
        {allImages.length > 6 && (
          <div className='absolute bottom-2 right-2'>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onViewDetails()
              }}
              className='bg-gradient-to-r from-amber-600 to-green-600 text-white px-3 py-1 rounded-lg shadow-lg hover:from-amber-700 hover:to-green-700 transition-all duration-200 flex items-center space-x-1 font-medium text-xs z-10'
            >
              <Eye className='h-3 w-3' />
              <span>
                <Translate staticKey='properties.viewAll'>View All</Translate>
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-6 flex flex-col flex-grow'>
        {/* Header */}
        <div className='flex items-start justify-between mb-3'>
          <h3 className='text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 flex-1 pr-2'>
            {property.title}
          </h3>
          <div className='flex items-center text-gray-600 flex-shrink-0'>
            <Star className='h-4 w-4 text-yellow-400 mr-1 fill-current' />
            {property.rating}
          </div>
        </div>

        {/* Location */}
        <div className='flex items-center text-gray-600 mb-4'>
          <MapPin className='h-4 w-4 mr-1 flex-shrink-0' />
          <span className='truncate'>{property.location}</span>
        </div>

        {/* Description */}
        <div className='mb-4 flex-grow'>
          <p className='text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]'>
            {property.description}
          </p>
        </div>

        {/* Property Details */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-4'>
            {property.beds > 0 && (
              <div className='flex items-center text-gray-600 text-sm'>
                <Bed className='h-4 w-4 mr-1' />
                <span>
                  {property.beds}{' '}
                  <Translate staticKey='properties.beds'>beds</Translate>
                </span>
              </div>
            )}
            {property.baths > 0 && (
              <div className='flex items-center text-gray-600 text-sm'>
                <Bath className='h-4 w-4 mr-1' />
                <span>
                  {property.baths}{' '}
                  <Translate staticKey='properties.baths'>baths</Translate>
                </span>
              </div>
            )}
            <div className='flex items-center text-gray-600 text-sm'>
              <Square className='h-4 w-4 mr-1' />
              <span>
                {property.sqft.toLocaleString('en-US')}{' '}
                <Translate staticKey='properties.sqft'>sq ft</Translate>
              </span>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className='flex flex-wrap gap-2 mb-6 min-h-[2rem]'>
          {property.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className='bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs'
            >
              {feature}
            </span>
          ))}
        </div>

        {/* Actions - Fixed at bottom */}
        <div className='flex items-center justify-center mt-auto'>
          <button
            onClick={onViewDetails}
            className='w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-700 to-green-700 text-white px-4 py-3 rounded-lg hover:from-amber-800 hover:to-green-800 transition-colors duration-200 text-sm font-medium'
          >
            <Eye className='h-4 w-4' />
            <span>
              <Translate staticKey='properties.viewDetails'>
                View Property Details
              </Translate>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PropertiesPage
