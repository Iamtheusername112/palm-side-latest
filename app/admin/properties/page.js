'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import {
  Building2,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Square,
  Star,
  Heart,
  Calendar,
  MoreVertical,
  Download,
  RefreshCw,
  X,
  Check,
  AlertCircle,
  Tag,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  Grid3X3,
  List,
  ChevronDown,
  CheckSquare,
  Square as SquareIcon,
  Copy,
  Share2,
  Archive,
  Zap,
  Target,
  Award,
  Activity,
} from 'lucide-react'
import PropertyForm from '../../components/PropertyForm'
import StatusChangeModal from '../../components/StatusChangeModal'
import ConfirmModal from '../../components/ConfirmModal'

const AdminPropertiesPage = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000000])
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)

  // New state for enhanced features
  const [viewMode, setViewMode] = useState('table') // 'table' or 'grid'
  const [selectedProperties, setSelectedProperties] = useState([])
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [analytics, setAnalytics] = useState(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showImageGallery, setShowImageGallery] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Advanced filter states
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [bedroomsMin, setBedroomsMin] = useState('')
  const [bathroomsMin, setBathroomsMin] = useState('')
  const [squareFeetMin, setSquareFeetMin] = useState('')
  const [yearBuiltMin, setYearBuiltMin] = useState('')
  const [isFeatured, setIsFeatured] = useState('all')
  const [isActive, setIsActive] = useState('all')

  const [propertyTypes] = useState([
    'Luxury Homes',
    'Investment Properties',
    'Commercial Real Estate',
    'Property Development',
    'Residential',
    'Condos',
    'Villas',
  ])

  const [propertyStatuses] = useState([
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
  ])

  const [locations] = useState([
    'Miami Beach',
    'Downtown Miami',
    'Coral Gables',
    'Brickell',
    'Wynwood',
    'Key Largo',
    'Fort Lauderdale',
  ])

  useEffect(() => {
    fetchProperties()
    fetchAnalytics()
  }, [
    currentPage,
    selectedType,
    selectedStatus,
    selectedLocation,
    sortBy,
    sortOrder,
    priceMin,
    priceMax,
    bedroomsMin,
    bathroomsMin,
    squareFeetMin,
    yearBuiltMin,
    isFeatured,
    isActive,
  ])

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (showImageGallery && selectedImages.length > 1) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          prevImage()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          nextImage()
        } else if (event.key === 'Escape') {
          event.preventDefault()
          setShowImageGallery(false)
        }
      }
    }

    if (showImageGallery) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showImageGallery, selectedImages.length])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        type: selectedType !== 'all' ? selectedType : '',
        status: selectedStatus !== 'all' ? selectedStatus : '',
        location: selectedLocation !== 'all' ? selectedLocation : '',
        sortBy,
        sortOrder,
        search: searchTerm,
        priceMin: priceMin || '',
        priceMax: priceMax || '',
        bedroomsMin: bedroomsMin || '',
        bathroomsMin: bathroomsMin || '',
        squareFeetMin: squareFeetMin || '',
        yearBuiltMin: yearBuiltMin || '',
        isFeatured: isFeatured !== 'all' ? isFeatured : '',
        isActive: isActive !== 'all' ? isActive : '',
      })

      const response = await fetch(`/api/admin/properties?${params}`)
      const data = await response.json()

      if (data.success) {
        setProperties(data.properties || [])
        setTotalPages(data.pagination?.totalPages || 1)
      }
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/properties/analytics')
      const data = await response.json()

      if (data.success) {
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    }
  }

  const handleCreateProperty = async (formData) => {
    try {
      const response = await fetch('/api/admin/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setShowCreateModal(false)
        fetchProperties()
        toast.success('Property created successfully!', {
          description: 'The property has been added to your listings.',
        })
      } else {
        toast.error('Error creating property', {
          description: data.error || 'Please try again or contact support.',
        })
      }
    } catch (error) {
      console.error('Error creating property:', error)
      toast.error('Error creating property', {
        description:
          'Please try again or contact support if the problem persists.',
      })
    }
  }

  const handleUpdateProperty = async (formData) => {
    try {
      const response = await fetch(
        `/api/admin/properties/${editingProperty.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      const data = await response.json()

      if (data.success) {
        setShowEditModal(false)
        setEditingProperty(null)
        fetchProperties()
        toast.success('Property updated successfully!', {
          description: 'The property changes have been saved.',
        })
      } else {
        toast.error('Error updating property', {
          description: data.error || 'Please try again or contact support.',
        })
      }
    } catch (error) {
      console.error('Error updating property:', error)
      toast.error('Error updating property', {
        description:
          'Please try again or contact support if the problem persists.',
      })
    }
  }

  const handleStatusChange = async ({ status, notes }) => {
    try {
      const response = await fetch(
        `/api/admin/properties/${selectedProperty.id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status, notes }),
        }
      )

      const data = await response.json()

      if (data.success) {
        setShowStatusModal(false)
        setSelectedProperty(null)
        fetchProperties()
        toast.success('Property status updated successfully!', {
          description: 'The property status has been changed.',
        })
      } else {
        toast.error('Error updating status', {
          description: data.error || 'Please try again or contact support.',
        })
      }
    } catch (error) {
      console.error('Error updating status:', error)
      toast.error('Error updating status', {
        description:
          'Please try again or contact support if the problem persists.',
      })
    }
  }

  const handleDeleteProperty = async () => {
    if (!propertyToDelete) return

    try {
      setDeleting(true)
      const response = await fetch(
        `/api/admin/properties/${propertyToDelete.id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (data.success) {
        setShowDeleteConfirm(false)
        setPropertyToDelete(null)
        fetchProperties()
        toast.success('Property deleted successfully!', {
          description: 'The property has been removed from your listings.',
        })
      } else {
        toast.error('Error deleting property', {
          description: data.error || 'Please try again or contact support.',
        })
      }
    } catch (error) {
      console.error('Error deleting property:', error)
      toast.error('Error deleting property', {
        description:
          'Please try again or contact support if the problem persists.',
      })
    } finally {
      setDeleting(false)
    }
  }

  const confirmDelete = (property) => {
    setPropertyToDelete(property)
    setShowDeleteConfirm(true)
  }

  // Bulk actions
  const handleSelectAll = () => {
    if (selectedProperties.length === properties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(properties.map((p) => p.id))
    }
  }

  const handleSelectProperty = (propertyId) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    )
  }

  const handleBulkDelete = async () => {
    if (selectedProperties.length === 0) return

    try {
      const response = await fetch('/api/admin/properties/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyIds: selectedProperties }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(
          `${selectedProperties.length} properties deleted successfully!`
        )
        setSelectedProperties([])
        fetchProperties()
      } else {
        toast.error('Error deleting properties', {
          description: data.error || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error deleting properties:', error)
      toast.error('Error deleting properties', {
        description: 'Please try again or contact support.',
      })
    }
  }

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedProperties.length === 0) return

    try {
      const response = await fetch('/api/admin/properties/bulk', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyIds: selectedProperties,
          status: newStatus,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(
          `${selectedProperties.length} properties updated successfully!`
        )
        setSelectedProperties([])
        fetchProperties()
      } else {
        toast.error('Error updating properties', {
          description: data.error || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error updating properties:', error)
      toast.error('Error updating properties', {
        description: 'Please try again or contact support.',
      })
    }
  }

  const handleExportProperties = async () => {
    try {
      const response = await fetch('/api/admin/properties/export')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `properties-export-${
        new Date().toISOString().split('T')[0]
      }.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast.success('Properties exported successfully!')
    } catch (error) {
      console.error('Error exporting properties:', error)
      toast.error('Error exporting properties', {
        description: 'Please try again or contact support.',
      })
    }
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedType('all')
    setSelectedStatus('all')
    setSelectedLocation('all')
    setPriceMin('')
    setPriceMax('')
    setBedroomsMin('')
    setBathroomsMin('')
    setSquareFeetMin('')
    setYearBuiltMin('')
    setIsFeatured('all')
    setIsActive('all')
    setCurrentPage(1)
  }

  const openImageGallery = (property) => {
    if (property.images && property.images.length > 0) {
      setSelectedImages(property.images)
      setCurrentImageIndex(0)
      setShowImageGallery(true)
    } else {
      toast.error('No images available for this property')
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatPrice = (price) => {
    if (!price) return 'N/A'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading properties...</p>
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
              <h1 className='text-2xl font-bold text-gray-900'>Properties</h1>
              <p className='text-gray-600 mt-1'>
                Manage your real estate properties
              </p>
            </div>

            <div className='flex items-center space-x-3'>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center'
              >
                <BarChart3 className='h-4 w-4 mr-2' />
                Analytics
              </button>

              <button
                onClick={handleExportProperties}
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center'
              >
                <Download className='h-4 w-4 mr-2' />
                Export
              </button>

              <button
                onClick={() => setShowCreateModal(true)}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center'
              >
                <Plus className='h-4 w-4 mr-2' />
                Add Property
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto bg-gray-50'>
        <div className='px-6 py-6'>
          {/* Analytics Section */}
          {showAnalytics && analytics && (
            <div className='bg-white rounded-lg shadow-sm border p-6 mb-6'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Property Analytics
                </h3>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='bg-blue-50 p-4 rounded-lg'>
                  <div className='flex items-center'>
                    <Building2 className='h-8 w-8 text-blue-600' />
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-blue-600'>
                        Total Properties
                      </p>
                      <p className='text-2xl font-bold text-blue-900'>
                        {analytics.totalProperties}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-green-50 p-4 rounded-lg'>
                  <div className='flex items-center'>
                    <TrendingUp className='h-8 w-8 text-green-600' />
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-green-600'>
                        For Sale
                      </p>
                      <p className='text-2xl font-bold text-green-900'>
                        {analytics.forSale}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-purple-50 p-4 rounded-lg'>
                  <div className='flex items-center'>
                    <DollarSign className='h-8 w-8 text-purple-600' />
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-purple-600'>
                        Avg Price
                      </p>
                      <p className='text-2xl font-bold text-purple-900'>
                        {formatPrice(analytics.averagePrice)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='bg-orange-50 p-4 rounded-lg'>
                  <div className='flex items-center'>
                    <Star className='h-8 w-8 text-orange-600' />
                    <div className='ml-3'>
                      <p className='text-sm font-medium text-orange-600'>
                        Featured
                      </p>
                      <p className='text-2xl font-bold text-orange-900'>
                        {analytics.featured}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Actions Bar */}
          {selectedProperties.length > 0 && (
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <CheckSquare className='h-5 w-5 text-blue-600 mr-2' />
                  <span className='text-blue-800 font-medium'>
                    {selectedProperties.length} property
                    {selectedProperties.length !== 1 ? 'ies' : ''} selected
                  </span>
                </div>

                <div className='flex items-center space-x-2'>
                  <select
                    onChange={(e) => handleBulkStatusChange(e.target.value)}
                    className='px-3 py-1 border border-blue-300 rounded text-sm'
                    defaultValue=''
                  >
                    <option value='' disabled>
                      Change Status
                    </option>
                    {propertyStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleBulkDelete}
                    className='px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 flex items-center'
                  >
                    <Trash2 className='h-4 w-4 mr-1' />
                    Delete
                  </button>

                  <button
                    onClick={() => setSelectedProperties([])}
                    className='px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700'
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Filters and Search */}
          <div className='bg-white rounded-lg shadow-sm border p-6 mb-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                Filters & Search
              </h3>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className='text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center'
                >
                  <Filter className='h-4 w-4 mr-1' />
                  {showAdvancedFilters ? 'Hide' : 'Show'} Advanced
                </button>
                <button
                  onClick={clearAllFilters}
                  className='text-gray-600 hover:text-gray-800 text-sm font-medium'
                >
                  Clear All
                </button>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Search
                </label>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <input
                    type='text'
                    placeholder='Search properties...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='all'>All Types</option>
                  {propertyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='all'>All Statuses</option>
                  {propertyStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='all'>All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className='mt-6 pt-6 border-t border-gray-200'>
                <h4 className='text-md font-medium text-gray-900 mb-4'>
                  Advanced Filters
                </h4>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Price Range
                    </label>
                    <div className='flex space-x-2'>
                      <input
                        type='number'
                        placeholder='Min'
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                      <input
                        type='number'
                        placeholder='Max'
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Bedrooms (Min)
                    </label>
                    <input
                      type='number'
                      placeholder='0'
                      value={bedroomsMin}
                      onChange={(e) => setBedroomsMin(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Bathrooms (Min)
                    </label>
                    <input
                      type='number'
                      placeholder='0'
                      value={bathroomsMin}
                      onChange={(e) => setBathroomsMin(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Square Feet (Min)
                    </label>
                    <input
                      type='number'
                      placeholder='0'
                      value={squareFeetMin}
                      onChange={(e) => setSquareFeetMin(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Year Built (Min)
                    </label>
                    <input
                      type='number'
                      placeholder='1900'
                      value={yearBuiltMin}
                      onChange={(e) => setYearBuiltMin(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Featured
                    </label>
                    <select
                      value={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <option value='all'>All</option>
                      <option value='true'>Featured Only</option>
                      <option value='false'>Not Featured</option>
                    </select>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Status
                    </label>
                    <select
                      value={isActive}
                      onChange={(e) => setIsActive(e.target.value)}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    >
                      <option value='all'>All</option>
                      <option value='true'>Active Only</option>
                      <option value='false'>Inactive Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className='mt-4 flex justify-between items-center'>
              <div className='flex items-center space-x-4'>
                <div className='flex space-x-3'>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  >
                    <option value='createdAt'>Date Created</option>
                    <option value='price'>Price</option>
                    <option value='title'>Title</option>
                    <option value='location'>Location</option>
                  </select>

                  <button
                    onClick={() =>
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                    }
                    className='px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200'
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>

                <div className='flex items-center space-x-2'>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded ${
                      viewMode === 'table'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title='Table View'
                  >
                    <List className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    title='Grid View'
                  >
                    <Grid3X3 className='h-4 w-4' />
                  </button>
                </div>
              </div>

              <button
                onClick={fetchProperties}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center'
              >
                <RefreshCw className='h-4 w-4 mr-2' />
                Refresh
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Properties ({properties.length})
              </h2>
            </div>

            {properties.length === 0 ? (
              <div className='p-8 text-center'>
                <Building2 className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <p className='text-gray-600'>No properties found</p>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        <button
                          onClick={handleSelectAll}
                          className='flex items-center'
                        >
                          {selectedProperties.length === properties.length ? (
                            <CheckSquare className='h-4 w-4 text-blue-600' />
                          ) : (
                            <SquareIcon className='h-4 w-4 text-gray-400' />
                          )}
                        </button>
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Property
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Location
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Price
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Details
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Date
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {properties.map((property) => (
                      <tr key={property.id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <button
                            onClick={() => handleSelectProperty(property.id)}
                            className='flex items-center'
                          >
                            {selectedProperties.includes(property.id) ? (
                              <CheckSquare className='h-4 w-4 text-blue-600' />
                            ) : (
                              <SquareIcon className='h-4 w-4 text-gray-400' />
                            )}
                          </button>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='w-12 h-12 bg-gray-200 rounded-lg mr-3 flex items-center justify-center'>
                              {property.mainImage ? (
                                <img
                                  src={property.mainImage}
                                  alt={property.title}
                                  className='w-full h-full object-cover rounded-lg'
                                />
                              ) : (
                                <Building2 className='h-6 w-6 text-gray-400' />
                              )}
                            </div>
                            <div>
                              <div className='text-sm font-medium text-gray-900'>
                                {property.title || 'Untitled Property'}
                              </div>
                              <div className='text-sm text-gray-500'>
                                {property.propertyType || 'N/A'}
                              </div>
                              {property.isFeatured && (
                                <div className='flex items-center mt-1'>
                                  <Star className='h-3 w-3 text-yellow-500 mr-1' />
                                  <span className='text-xs text-yellow-600'>
                                    Featured
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <MapPin className='h-4 w-4 text-gray-400 mr-2' />
                            <span className='text-sm text-gray-900'>
                              {property.location || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm font-medium text-gray-900'>
                            {formatPrice(property.price)}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center space-x-4 text-sm text-gray-500'>
                            {property.bedrooms && (
                              <div className='flex items-center'>
                                <Bed className='h-4 w-4 mr-1' />
                                {property.bedrooms}
                              </div>
                            )}
                            {property.bathrooms && (
                              <div className='flex items-center'>
                                <Bath className='h-4 w-4 mr-1' />
                                {property.bathrooms}
                              </div>
                            )}
                            {property.squareFeet && (
                              <div className='flex items-center'>
                                <Square className='h-4 w-4 mr-1' />
                                {property.squareFeet.toLocaleString()} sq ft
                              </div>
                            )}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              property.status === 'For Sale'
                                ? 'bg-green-100 text-green-800'
                                : property.status === 'For Lease'
                                ? 'bg-blue-100 text-blue-800'
                                : property.status === 'Sold'
                                ? 'bg-gray-100 text-gray-800'
                                : property.status === 'In Contract'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {property.status || 'N/A'}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {formatDate(property.createdAt)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => {
                                setSelectedProperty(property)
                                setShowModal(true)
                              }}
                              className='text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50'
                              title='View Details'
                            >
                              <Eye className='h-4 w-4' />
                            </button>
                            {property.images && property.images.length > 0 && (
                              <button
                                onClick={() => openImageGallery(property)}
                                className='text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50'
                                title='View Images'
                              >
                                <Grid3X3 className='h-4 w-4' />
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setEditingProperty(property)
                                setShowEditModal(true)
                              }}
                              className='text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50'
                              title='Edit Property'
                            >
                              <Edit className='h-4 w-4' />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProperty(property)
                                setShowStatusModal(true)
                              }}
                              className='text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50'
                              title='Change Status'
                            >
                              <Tag className='h-4 w-4' />
                            </button>
                            <button
                              onClick={() => confirmDelete(property)}
                              className='text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50'
                              title='Delete Property'
                            >
                              <Trash2 className='h-4 w-4' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='px-6 py-4 border-t border-gray-200'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm text-gray-700'>
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className='px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className='px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Property Detail Modal */}
      {showModal && selectedProperty && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-2xl font-bold text-gray-900'>
                  Property Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Left Column - Images */}
                <div>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                    Images
                  </h4>
                  {selectedProperty.images &&
                  selectedProperty.images.length > 0 ? (
                    <div className='space-y-4'>
                      {/* Main Image */}
                      <div className='relative'>
                        <img
                          src={selectedProperty.images[0]}
                          alt={selectedProperty.title}
                          className='w-full h-64 object-cover rounded-lg shadow-md'
                        />
                        {selectedProperty.isFeatured && (
                          <div className='absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center'>
                            <Star className='h-3 w-3 mr-1' />
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Thumbnail Grid */}
                      {selectedProperty.images.length > 1 && (
                        <div className='grid grid-cols-4 gap-2'>
                          {selectedProperty.images
                            .slice(1)
                            .map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${selectedProperty.title} - Image ${
                                  index + 2
                                }`}
                                className='w-full h-20 object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer'
                                onClick={() => {
                                  // Move clicked image to first position
                                  const newImages = [
                                    image,
                                    ...selectedProperty.images.filter(
                                      (_, i) => i !== index + 1
                                    ),
                                  ]
                                  setSelectedProperty({
                                    ...selectedProperty,
                                    images: newImages,
                                  })
                                }}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className='w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center'>
                      <div className='text-center'>
                        <Building2 className='h-12 w-12 text-gray-400 mx-auto mb-2' />
                        <p className='text-gray-500'>No images available</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Property Details */}
                <div className='space-y-6'>
                  {/* Basic Information */}
                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                      Basic Information
                    </h4>
                    <div className='grid grid-cols-1 gap-4'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700'>
                          Title
                        </label>
                        <p className='mt-1 text-sm text-gray-900 font-medium'>
                          {selectedProperty.title || 'N/A'}
                        </p>
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700'>
                            Type
                          </label>
                          <p className='mt-1 text-sm text-gray-900'>
                            {selectedProperty.propertyType || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-700'>
                            Status
                          </label>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                              selectedProperty.status === 'For Sale'
                                ? 'bg-green-100 text-green-800'
                                : selectedProperty.status === 'For Lease'
                                ? 'bg-blue-100 text-blue-800'
                                : selectedProperty.status === 'Sold'
                                ? 'bg-gray-100 text-gray-800'
                                : selectedProperty.status === 'In Contract'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {selectedProperty.status || 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700'>
                          Price
                        </label>
                        <p className='mt-1 text-lg font-bold text-green-600'>
                          {formatPrice(selectedProperty.price)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Information */}
                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                      Location
                    </h4>
                    <div className='space-y-3'>
                      <div className='flex items-center'>
                        <MapPin className='h-4 w-4 text-gray-400 mr-2' />
                        <span className='text-sm text-gray-900'>
                          {selectedProperty.location || 'N/A'}
                        </span>
                      </div>
                      {selectedProperty.address && (
                        <div>
                          <label className='block text-sm font-medium text-gray-700'>
                            Address
                          </label>
                          <p className='mt-1 text-sm text-gray-900'>
                            {selectedProperty.address}
                          </p>
                        </div>
                      )}
                      {(selectedProperty.city ||
                        selectedProperty.state ||
                        selectedProperty.zipCode) && (
                        <div className='grid grid-cols-3 gap-2'>
                          {selectedProperty.city && (
                            <div>
                              <label className='block text-xs font-medium text-gray-700'>
                                City
                              </label>
                              <p className='text-sm text-gray-900'>
                                {selectedProperty.city}
                              </p>
                            </div>
                          )}
                          {selectedProperty.state && (
                            <div>
                              <label className='block text-xs font-medium text-gray-700'>
                                State
                              </label>
                              <p className='text-sm text-gray-900'>
                                {selectedProperty.state}
                              </p>
                            </div>
                          )}
                          {selectedProperty.zipCode && (
                            <div>
                              <label className='block text-xs font-medium text-gray-700'>
                                ZIP
                              </label>
                              <p className='text-sm text-gray-900'>
                                {selectedProperty.zipCode}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                      Property Details
                    </h4>
                    <div className='grid grid-cols-2 gap-4'>
                      {selectedProperty.bedrooms && (
                        <div className='flex items-center'>
                          <Bed className='h-4 w-4 text-gray-400 mr-2' />
                          <span className='text-sm text-gray-900'>
                            {selectedProperty.bedrooms} Bedrooms
                          </span>
                        </div>
                      )}
                      {selectedProperty.bathrooms && (
                        <div className='flex items-center'>
                          <Bath className='h-4 w-4 text-gray-400 mr-2' />
                          <span className='text-sm text-gray-900'>
                            {selectedProperty.bathrooms} Bathrooms
                          </span>
                        </div>
                      )}
                      {selectedProperty.squareFeet && (
                        <div className='flex items-center'>
                          <Square className='h-4 w-4 text-gray-400 mr-2' />
                          <span className='text-sm text-gray-900'>
                            {selectedProperty.squareFeet.toLocaleString()} sq ft
                          </span>
                        </div>
                      )}
                      {selectedProperty.yearBuilt && (
                        <div className='flex items-center'>
                          <Calendar className='h-4 w-4 text-gray-400 mr-2' />
                          <span className='text-sm text-gray-900'>
                            Built {selectedProperty.yearBuilt}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  {selectedProperty.features &&
                    selectedProperty.features.length > 0 && (
                      <div>
                        <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                          Features
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          {selectedProperty.features.map((feature, index) => (
                            <span
                              key={index}
                              className='inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800'
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Description */}
                  {selectedProperty.description && (
                    <div>
                      <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                        Description
                      </h4>
                      <p className='text-sm text-gray-700 leading-relaxed'>
                        {selectedProperty.description}
                      </p>
                    </div>
                  )}

                  {/* Additional Information */}
                  <div>
                    <h4 className='text-lg font-semibold text-gray-900 mb-4'>
                      Additional Information
                    </h4>
                    <div className='grid grid-cols-2 gap-4 text-sm'>
                      <div>
                        <label className='block font-medium text-gray-700'>
                          Active Listing
                        </label>
                        <p
                          className={`mt-1 ${
                            selectedProperty.isActive
                              ? 'text-green-600'
                              : 'text-red-600'
                          }`}
                        >
                          {selectedProperty.isActive ? 'Yes' : 'No'}
                        </p>
                      </div>
                      <div>
                        <label className='block font-medium text-gray-700'>
                          Created
                        </label>
                        <p className='mt-1 text-gray-900'>
                          {formatDate(selectedProperty.createdAt)}
                        </p>
                      </div>
                      {selectedProperty.views && (
                        <div>
                          <label className='block font-medium text-gray-700'>
                            Views
                          </label>
                          <p className='mt-1 text-gray-900'>
                            {selectedProperty.views}
                          </p>
                        </div>
                      )}
                      {selectedProperty.favorites && (
                        <div>
                          <label className='block font-medium text-gray-700'>
                            Favorites
                          </label>
                          <p className='mt-1 text-gray-900'>
                            {selectedProperty.favorites}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200'>
                {selectedProperty.images &&
                  selectedProperty.images.length > 0 && (
                    <button
                      onClick={() => {
                        setShowModal(false)
                        openImageGallery(selectedProperty)
                      }}
                      className='px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center'
                    >
                      <Grid3X3 className='h-4 w-4 mr-2' />
                      View All Images
                    </button>
                  )}
                <button
                  onClick={() => {
                    setShowModal(false)
                    setEditingProperty(selectedProperty)
                    setShowEditModal(true)
                  }}
                  className='px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center'
                >
                  <Edit className='h-4 w-4 mr-2' />
                  Edit Property
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedProperty(selectedProperty)
                    setShowStatusModal(true)
                  }}
                  className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center'
                >
                  <Tag className='h-4 w-4 mr-2' />
                  Change Status
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Property Modal */}
      {showCreateModal && (
        <PropertyForm
          onSave={handleCreateProperty}
          onCancel={() => setShowCreateModal(false)}
          mode='create'
        />
      )}

      {/* Edit Property Modal */}
      {showEditModal && editingProperty && (
        <PropertyForm
          property={editingProperty}
          onSave={handleUpdateProperty}
          onCancel={() => {
            setShowEditModal(false)
            setEditingProperty(null)
          }}
          mode='edit'
        />
      )}

      {/* Status Change Modal */}
      {showStatusModal && selectedProperty && (
        <StatusChangeModal
          property={selectedProperty}
          onSave={handleStatusChange}
          onCancel={() => {
            setShowStatusModal(false)
            setSelectedProperty(null)
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false)
          setPropertyToDelete(null)
        }}
        onConfirm={handleDeleteProperty}
        title='Delete Property'
        message={`Are you sure you want to delete "${propertyToDelete?.title}"? This action cannot be undone and will permanently remove all property information.`}
        confirmText='Delete Property'
        cancelText='Cancel'
        type='danger'
      />

      {/* Image Gallery Modal */}
      {showImageGallery && selectedImages.length > 0 && (
        <div className='fixed inset-0 bg-black bg-opacity-90 overflow-y-auto h-full w-full z-50'>
          <div className='relative min-h-screen flex items-center justify-center p-4'>
            <div className='relative max-w-6xl w-full'>
              {/* Header */}
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-2xl font-bold text-white'>
                  Property Images ({currentImageIndex + 1} of{' '}
                  {selectedImages.length})
                </h3>
                <button
                  onClick={() => setShowImageGallery(false)}
                  className='text-white hover:text-gray-300 transition-colors'
                >
                  <X className='h-8 w-8' />
                </button>
              </div>

              {/* Main Image */}
              <div className='relative mb-4'>
                <img
                  src={selectedImages[currentImageIndex]}
                  alt={`Property image ${currentImageIndex + 1}`}
                  className='w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl'
                />

                {/* Navigation Arrows */}
                {selectedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all'
                    >
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 19l-7-7 7-7'
                        />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all'
                    >
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {selectedImages.length > 1 && (
                <div className='flex space-x-2 overflow-x-auto pb-2'>
                  {selectedImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-white shadow-lg'
                          : 'border-transparent hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className='w-full h-full object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Keyboard Navigation Info */}
              <div className='text-center text-gray-400 text-sm mt-4'>
                {selectedImages.length > 1 && (
                  <p>Use arrow keys or click thumbnails to navigate</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPropertiesPage
