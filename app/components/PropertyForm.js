'use client'

import { useState, useEffect } from 'react'
import { X, Save, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import ImageUpload from './ImageUpload'

// Helper function to safely parse JSON fields that might be strings or arrays
const parseJsonField = (field) => {
  if (!field) return []

  // If it's already an array, return it
  if (Array.isArray(field)) return field

  // If it's a string, try to parse it
  if (typeof field === 'string') {
    try {
      // Try to parse as JSON first
      return JSON.parse(field)
    } catch (e) {
      // If JSON parsing fails, check if it's a comma-separated string
      if (field.includes(',')) {
        return field
          .split(',')
          .map((item) => item.trim())
          .filter((item) => item.length > 0)
      }
      // If it's a single item, return it as an array
      return field.trim() ? [field.trim()] : []
    }
  }

  return []
}

const PropertyForm = ({ property, onSave, onCancel, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: '',
    status: 'For Sale',
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    lotSize: '',
    yearBuilt: '',
    plotSizeM2: '',
    builtAreaM2: '',
    livingSpaceM2: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    features: [],
    images: [],
    isFeatured: false,
    isActive: true,
  })

  const [loading, setLoading] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  const propertyTypes = [
    'Luxury Homes',
    'Investment Properties',
    'Commercial Real Estate',
    'Property Development',
    'Residential',
    'Condos',
    'Villas',
    'Townhouses',
    'Land',
    'Multi-Family',
  ]

  const propertyStatuses = [
    'For Sale',
    'For Lease',
    'Pre-Construction',
    'Under Construction',
    'Sold',
    'Leased',
    'In Contract',
    'Pending',
    'Inactive',
    'Withdrawn',
  ]

  const commonFeatures = [
    'Pool',
    'Garden',
    'Garage',
    'Balcony',
    'Fireplace',
    'Hardwood Floors',
    'Granite Countertops',
    'Stainless Steel Appliances',
    'Walk-in Closet',
    'Home Office',
    'Gym',
    'Wine Cellar',
    'Smart Home',
    'Security System',
    'Central Air',
    'Dishwasher',
    'Washer/Dryer',
    'Furnished',
  ]

  useEffect(() => {
    if (property && mode === 'edit') {
      setFormData({
        title: property.title || '',
        description: property.description || '',
        price: property.price || '',
        location: property.location || '',
        propertyType: property.propertyType || '',
        status: property.status || 'For Sale',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        squareFeet: property.squareFeet || '',
        lotSize: property.lotSize || '',
        yearBuilt: property.yearBuilt || '',
        plotSizeM2: property.plotSizeM2 || '',
        builtAreaM2: property.builtAreaM2 || '',
        livingSpaceM2: property.livingSpaceM2 || '',
        address: property.address || '',
        city: property.city || '',
        state: property.state || '',
        zipCode: property.zipCode || '',
        country: property.country || 'USA',
        features: property.features ? parseJsonField(property.features) : [],
        images: property.images ? parseJsonField(property.images) : [],
        isFeatured: property.isFeatured || false,
        isActive: property.isActive !== false,
      })
    }
  }, [property, mode])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
  }

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare form data for submission
      const submitData = {
        ...formData,
        // Convert images array to URLs array for API compatibility
        images: formData.images.map((img) =>
          typeof img === 'string' ? img : img.url
        ),
      }

      await onSave(submitData)
      toast.success(
        mode === 'create'
          ? 'Property created successfully!'
          : 'Property updated successfully!',
        {
          description: `"${formData.title}" has been ${
            mode === 'create' ? 'added' : 'updated'
          } to your properties.`,
        }
      )
    } catch (error) {
      console.error('Error saving property:', error)
      toast.error(
        mode === 'create'
          ? 'Failed to create property'
          : 'Failed to update property',
        {
          description:
            error.message ||
            'Please try again or contact support if the problem persists.',
        }
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold text-gray-900'>
              {mode === 'create' ? 'Add New Property' : 'Edit Property'}
            </h2>
            <button
              onClick={onCancel}
              className='text-gray-400 hover:text-gray-600'
            >
              <X className='h-6 w-6' />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          {/* Basic Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Title *
              </label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Property title'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Price *
              </label>
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleInputChange}
                required
                min='0'
                step='0.01'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='0.00'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Property Type
              </label>
              <select
                name='propertyType'
                value={formData.propertyType}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                <option value=''>Select Type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Status *
              </label>
              <select
                name='status'
                value={formData.status}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              >
                {propertyStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Property description...'
            />
          </div>

          {/* Location */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Location *
              </label>
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleInputChange}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='e.g., Miami Beach, FL'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Address
              </label>
              <input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Street address'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                City
              </label>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='City'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                State
              </label>
              <input
                type='text'
                name='state'
                value={formData.state}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='State'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                ZIP Code
              </label>
              <input
                type='text'
                name='zipCode'
                value={formData.zipCode}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='ZIP Code'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Country
              </label>
              <input
                type='text'
                name='country'
                value={formData.country}
                onChange={handleInputChange}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Country'
              />
            </div>
          </div>

          {/* Property Details */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Bedrooms
              </label>
              <input
                type='number'
                name='bedrooms'
                value={formData.bedrooms}
                onChange={handleInputChange}
                min='0'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='0'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Bathrooms
              </label>
              <input
                type='number'
                name='bathrooms'
                value={formData.bathrooms}
                onChange={handleInputChange}
                min='0'
                step='0.5'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='0'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Square Feet
              </label>
              <input
                type='number'
                name='squareFeet'
                value={formData.squareFeet}
                onChange={handleInputChange}
                min='0'
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='0'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Year Built
              </label>
              <input
                type='number'
                name='yearBuilt'
                value={formData.yearBuilt}
                onChange={handleInputChange}
                min='1800'
                max={new Date().getFullYear() + 1}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='2024'
              />
            </div>
          </div>

          {/* Area Measurements (m²) */}
          <div className='border-t border-gray-200 pt-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Area Measurements (Square Meters)
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Plot Size (m²)
                </label>
                <input
                  type='number'
                  name='plotSizeM2'
                  value={formData.plotSizeM2}
                  onChange={handleInputChange}
                  min='0'
                  step='0.01'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='0.00'
                />
                <p className='mt-1 text-xs text-gray-500'>Total plot/land area</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Built Area (m²)
                </label>
                <input
                  type='number'
                  name='builtAreaM2'
                  value={formData.builtAreaM2}
                  onChange={handleInputChange}
                  min='0'
                  step='0.01'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='0.00'
                />
                <p className='mt-1 text-xs text-gray-500'>Total built-up area</p>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Living Space (m²)
                </label>
                <input
                  type='number'
                  name='livingSpaceM2'
                  value={formData.livingSpaceM2}
                  onChange={handleInputChange}
                  min='0'
                  step='0.01'
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='0.00'
                />
                <p className='mt-1 text-xs text-gray-500'>Usable living space</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Features
            </label>
            <div className='space-y-3'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Add a feature...'
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addFeature())
                  }
                />
                <button
                  type='button'
                  onClick={addFeature}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
                >
                  <Plus className='h-4 w-4' />
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800'
                  >
                    {feature}
                    <button
                      type='button'
                      onClick={() => removeFeature(feature)}
                      className='ml-2 text-blue-600 hover:text-blue-800'
                    >
                      <X className='h-3 w-3' />
                    </button>
                  </span>
                ))}
              </div>

              <div className='text-sm text-gray-500'>
                Common features:
                <div className='flex flex-wrap gap-1 mt-1'>
                  {commonFeatures.map((feature) => (
                    <button
                      key={feature}
                      type='button'
                      onClick={() => {
                        if (!formData.features.includes(feature)) {
                          setFormData((prev) => ({
                            ...prev,
                            features: [...prev.features, feature],
                          }))
                        }
                      }}
                      className='text-blue-600 hover:text-blue-800 text-xs'
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Property Images
            </label>
            <ImageUpload
              images={formData.images}
              onImagesChange={handleImagesChange}
              maxImages={50}
            />
          </div>

          {/* Settings */}
          <div className='flex items-center space-x-6'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                name='isFeatured'
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <span className='ml-2 text-sm text-gray-700'>
                Featured Property
              </span>
            </label>

            <label className='flex items-center'>
              <input
                type='checkbox'
                name='isActive'
                checked={formData.isActive}
                onChange={handleInputChange}
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <span className='ml-2 text-sm text-gray-700'>Active Listing</span>
            </label>
          </div>

          {/* Actions */}
          <div className='flex items-center justify-end space-x-3 pt-6 border-t border-gray-200'>
            <button
              type='button'
              onClick={onCancel}
              className='px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={loading}
              className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center'
            >
              {loading ? (
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
              ) : (
                <Save className='h-4 w-4 mr-2' />
              )}
              {mode === 'create' ? 'Create Property' : 'Update Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PropertyForm
