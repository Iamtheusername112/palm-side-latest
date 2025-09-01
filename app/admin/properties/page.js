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
} from 'lucide-react'
import PropertyForm from '../../components/PropertyForm'
import StatusChangeModal from '../../components/StatusChangeModal'

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
  }, [
    currentPage,
    selectedType,
    selectedStatus,
    selectedLocation,
    sortBy,
    sortOrder,
  ])

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
          {/* Filters and Search */}
          <div className='bg-white rounded-lg shadow-sm border p-6 mb-6'>
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

            <div className='mt-4 flex justify-between items-center'>
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

              <button
                onClick={fetchProperties}
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center'
              >
                <Filter className='h-4 w-4 mr-2' />
                Apply Filters
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
                        Property
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Location
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Price
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
                          <div className='flex items-center'>
                            <div className='w-12 h-12 bg-gray-200 rounded-lg mr-3'></div>
                            <div>
                              <div className='text-sm font-medium text-gray-900'>
                                {property.title || 'Untitled Property'}
                              </div>
                              <div className='text-sm text-gray-500'>
                                {property.propertyType || 'N/A'}
                              </div>
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
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              property.status === 'For Sale'
                                ? 'bg-green-100 text-green-800'
                                : property.status === 'For Lease'
                                ? 'bg-blue-100 text-blue-800'
                                : property.status === 'Sold'
                                ? 'bg-gray-100 text-gray-800'
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
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Property Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Title
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedProperty.title || 'N/A'}
                  </p>
                </div>

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
                    Location
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedProperty.location || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Price
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {formatPrice(selectedProperty.price)}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Status
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedProperty.status || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedProperty.description || 'N/A'}
                  </p>
                </div>
              </div>

              <div className='mt-6 flex justify-end'>
                <button
                  onClick={() => setShowModal(false)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50'
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
      {showDeleteConfirm && propertyToDelete && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
            <div className='p-6 border-b border-gray-200'>
              <div className='flex items-center'>
                <AlertCircle className='h-6 w-6 text-red-600 mr-3' />
                <h2 className='text-xl font-bold text-gray-900'>
                  Delete Property
                </h2>
              </div>
            </div>

            <div className='p-6'>
              <p className='text-gray-600 mb-4'>
                Are you sure you want to delete "{propertyToDelete.title}"? This
                action cannot be undone.
              </p>

              <div className='flex items-center justify-end space-x-3'>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false)
                    setPropertyToDelete(null)
                  }}
                  className='px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200'
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteProperty}
                  disabled={deleting}
                  className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center'
                >
                  {deleting ? (
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                  ) : (
                    <Trash2 className='h-4 w-4 mr-2' />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPropertiesPage
