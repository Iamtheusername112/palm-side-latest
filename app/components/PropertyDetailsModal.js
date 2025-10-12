'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  X,
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  Heart,
  Share2,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Star,
  Home,
  Car,
  TreePine,
  Waves,
  Mountain,
  Building,
} from 'lucide-react'
import Translate from '../../components/Translate'

const PropertyDetailsModal = ({
  property,
  isOpen,
  onClose,
  onToggleFavorite,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Get all available images - prioritize admin uploaded images
  const allImages =
    property?.images &&
    Array.isArray(property.images) &&
    property.images.length > 0
      ? property.images // Use all admin uploaded images
      : [property?.image].filter(Boolean) // Fallback to main image only

  useEffect(() => {
    if (isOpen && property) {
      setCurrentImageIndex(0)
      setIsFavorite(false) // This would be determined by props or API call
    }
  }, [isOpen, property])

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`
    } else if (price >= 1000) {
      return `$${(price / 1000).toFixed(0)}K`
    }
    return `$${price.toLocaleString()}`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getFeatureIcon = (feature) => {
    const featureLower = feature.toLowerCase()
    if (featureLower.includes('pool')) return <Waves className='h-4 w-4' />
    if (featureLower.includes('garage') || featureLower.includes('parking'))
      return <Car className='h-4 w-4' />
    if (featureLower.includes('garden') || featureLower.includes('yard'))
      return <TreePine className='h-4 w-4' />
    if (featureLower.includes('view') || featureLower.includes('mountain'))
      return <Mountain className='h-4 w-4' />
    if (featureLower.includes('commercial') || featureLower.includes('office'))
      return <Building className='h-4 w-4' />
    return <Home className='h-4 w-4' />
  }

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    )
  }

  const handleFavoriteToggle = async () => {
    setIsLoading(true)
    try {
      // Call the parent's favorite toggle function
      if (onToggleFavorite) {
        await onToggleFavorite(property.id)
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: property.description,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  if (!isOpen || !property) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-green-50'>
          <div className='flex items-center space-x-4'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {property.title}
            </h2>
            {property.featured && (
              <span className='bg-gradient-to-r from-amber-600 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>
                <Translate staticKey='properties.featured'>Featured</Translate>
              </span>
            )}
          </div>
          <div className='flex items-center space-x-3'>
            <button
              onClick={handleFavoriteToggle}
              disabled={isLoading}
              className={`p-2 rounded-full transition-all duration-200 ${
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`}
              />
            </button>
            <button
              onClick={handleShare}
              className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200'
            >
              <Share2 className='h-5 w-5' />
            </button>
            <button
              onClick={onClose}
              className='p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200'
            >
              <X className='h-5 w-5' />
            </button>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row max-h-[calc(90vh-120px)]'>
          {/* Image Gallery */}
          <div className='lg:w-1/2 relative'>
            <div className='relative h-64 lg:h-full min-h-[400px]'>
              <img
                src={allImages[currentImageIndex]}
                alt={property.title}
                className='w-full h-full object-cover'
              />

              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={handlePreviousImage}
                    className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200'
                  >
                    <ChevronLeft className='h-5 w-5' />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200'
                  >
                    <ChevronRight className='h-5 w-5' />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className='absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              )}

              {/* Status Badge */}
              <div className='absolute top-4 left-4 bg-white/90 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold'>
                {property.status}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {allImages.length > 1 && (
              <div className='absolute bottom-4 left-4 flex space-x-2'>
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? 'border-yellow-500'
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
              </div>
            )}
          </div>

          {/* Content */}
          <div className='lg:w-1/2 p-6 overflow-y-auto'>
            {/* Price and Rating */}
            <div className='flex items-start justify-between mb-6'>
              <div>
                <div className='text-4xl font-bold text-blue-600 mb-2'>
                  {formatPrice(property.price)}
                </div>
                <div className='flex items-center text-gray-600 mb-3'>
                  <MapPin className='h-5 w-5 mr-2' />
                  <span className='text-lg'>{property.location}</span>
                </div>
              </div>
              <div className='text-right'>
                <div className='flex items-center text-gray-600'>
                  <Star className='h-5 w-5 text-yellow-400 mr-1 fill-current' />
                  <span className='font-semibold'>{property.rating}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='mb-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                <Translate staticKey='properties.description'>
                  Description
                </Translate>
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                {property.description}
              </p>
            </div>

            {/* Property Details */}
            <div className='grid grid-cols-2 gap-4 mb-6'>
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex items-center text-gray-700 mb-2'>
                  <Bed className='h-5 w-5 mr-2' />
                  <span className='font-semibold'>
                    <Translate staticKey='properties.bedrooms'>
                      Bedrooms
                    </Translate>
                  </span>
                </div>
                <div className='text-2xl font-bold text-gray-900'>
                  {property.beds || 'N/A'}
                </div>
              </div>
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex items-center text-gray-700 mb-2'>
                  <Bath className='h-5 w-5 mr-2' />
                  <span className='font-semibold'>
                    <Translate staticKey='properties.bathrooms'>
                      Bathrooms
                    </Translate>
                  </span>
                </div>
                <div className='text-2xl font-bold text-gray-900'>
                  {property.baths || 'N/A'}
                </div>
              </div>
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex items-center text-gray-700 mb-2'>
                  <Square className='h-5 w-5 mr-2' />
                  <span className='font-semibold'>
                    <Translate staticKey='properties.squareFeet'>
                      Square Feet
                    </Translate>
                  </span>
                </div>
                <div className='text-2xl font-bold text-gray-900'>
                  {property.sqft ? property.sqft.toLocaleString() : 'N/A'}
                </div>
              </div>
              <div className='bg-gray-50 rounded-lg p-4'>
                <div className='flex items-center text-gray-700 mb-2'>
                  <Calendar className='h-5 w-5 mr-2' />
                  <span className='font-semibold'>
                    <Translate staticKey='properties.yearBuilt'>
                      Year Built
                    </Translate>
                  </span>
                </div>
                <div className='text-2xl font-bold text-gray-900'>
                  {property.yearBuilt || 'N/A'}
                </div>
              </div>
            </div>

            {/* Additional Details */}
            {(property.lotSize || property.address) && (
              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  <Translate staticKey='properties.additionalDetails'>
                    Additional Details
                  </Translate>
                </h3>
                <div className='space-y-2 text-gray-600'>
                  {property.lotSize && (
                    <div className='flex items-center'>
                      <TreePine className='h-4 w-4 mr-2' />
                      <span>
                        <Translate staticKey='properties.lotSize'>
                          Lot Size
                        </Translate>
                        : {property.lotSize.toLocaleString()}{' '}
                        <Translate staticKey='properties.sqft'>sq ft</Translate>
                      </span>
                    </div>
                  )}
                  {property.address && (
                    <div className='flex items-start'>
                      <MapPin className='h-4 w-4 mr-2 mt-0.5' />
                      <span>{property.address}</span>
                    </div>
                  )}
                  {(property.city || property.state || property.zipCode) && (
                    <div className='flex items-center'>
                      <MapPin className='h-4 w-4 mr-2' />
                      <span>
                        {[property.city, property.state, property.zipCode]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Area Measurements (Square Meters) */}
            {(property.plotSizeM2 || property.builtAreaM2 || property.livingSpaceM2) && (
              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  📐 Area Measurements (m²)
                </h3>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  {property.plotSizeM2 && (
                    <div className='bg-gradient-to-br from-amber-50 to-green-50 rounded-lg p-4 border border-amber-200'>
                      <div className='flex items-center text-gray-700 mb-2'>
                        <Square className='h-5 w-5 mr-2 text-amber-600' />
                        <span className='font-semibold text-sm'>
                          Plot Size
                        </span>
                      </div>
                      <div className='text-2xl font-bold text-gray-900'>
                        {parseFloat(property.plotSizeM2).toLocaleString()} m²
                      </div>
                      <div className='text-xs text-gray-600 mt-1'>Total land area</div>
                    </div>
                  )}
                  {property.builtAreaM2 && (
                    <div className='bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200'>
                      <div className='flex items-center text-gray-700 mb-2'>
                        <Building className='h-5 w-5 mr-2 text-blue-600' />
                        <span className='font-semibold text-sm'>
                          Built Area
                        </span>
                      </div>
                      <div className='text-2xl font-bold text-gray-900'>
                        {parseFloat(property.builtAreaM2).toLocaleString()} m²
                      </div>
                      <div className='text-xs text-gray-600 mt-1'>Total construction</div>
                    </div>
                  )}
                  {property.livingSpaceM2 && (
                    <div className='bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200'>
                      <div className='flex items-center text-gray-700 mb-2'>
                        <Home className='h-5 w-5 mr-2 text-green-600' />
                        <span className='font-semibold text-sm'>
                          Living Space
                        </span>
                      </div>
                      <div className='text-2xl font-bold text-gray-900'>
                        {parseFloat(property.livingSpaceM2).toLocaleString()} m²
                      </div>
                      <div className='text-xs text-gray-600 mt-1'>Usable interior</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  <Translate staticKey='properties.featuresAmenities'>
                    Features & Amenities
                  </Translate>
                </h3>
                <div className='grid grid-cols-2 gap-3'>
                  {property.features.map((feature, index) => (
                    <div
                      key={index}
                      className='flex items-center bg-green-50 rounded-lg p-3'
                    >
                      <div className='text-green-600 mr-3'>
                        {getFeatureIcon(feature)}
                      </div>
                      <span className='text-gray-700 font-medium'>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Actions */}
            <div className='border-t border-gray-200 pt-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                <Translate staticKey='properties.interestedInProperty'>
                  Interested in this property?
                </Translate>
              </h3>
              <div className='flex flex-col sm:flex-row gap-3'>
                <Link
                  href='/contact'
                  onClick={onClose}
                  className='flex-1 bg-gradient-to-r from-amber-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-amber-700 hover:to-green-700 transition-all duration-200 flex items-center justify-center'
                >
                  <Phone className='h-5 w-5 mr-2' />
                  <span>
                    <Translate staticKey='properties.contactAgent'>
                      Contact Agent
                    </Translate>
                  </span>
                </Link>
                <Link
                  href='/contact'
                  onClick={onClose}
                  className='flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center'
                >
                  <Mail className='h-5 w-5 mr-2' />
                  <span>
                    <Translate staticKey='properties.sendInquiry'>
                      Send Inquiry
                    </Translate>
                  </span>
                </Link>
              </div>
            </div>

            {/* Property Information Footer */}
            <div className='mt-6 pt-4 border-t border-gray-200 text-xs text-gray-500 text-center'>
              <p>
                <Translate staticKey='properties.propertyId'>
                  Property ID
                </Translate>
                : {property.id} •{' '}
                <Translate staticKey='properties.listedOn'>Listed on</Translate>{' '}
                {formatDate(property.createdAt)}
              </p>
              {property.updatedAt &&
                property.updatedAt !== property.createdAt && (
                  <p>
                    <Translate staticKey='properties.lastUpdated'>
                      Last updated
                    </Translate>
                    : {formatDate(property.updatedAt)}
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailsModal
