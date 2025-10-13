'use client'

import { useState, useEffect } from 'react'
import {
  Users,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  MoreVertical,
  Building2,
  Euro,
} from 'lucide-react'
import { toast } from 'sonner'
import ClientForm from '../../components/ClientForm'
import ConfirmModal from '../../components/ConfirmModal'

const AdminClientsPage = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSource, setSelectedSource] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedClient, setSelectedClient] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showClientForm, setShowClientForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [clientToDelete, setClientToDelete] = useState(null)

  const [clientSources] = useState([
    'website',
    'referral',
    'cold_call',
    'social_media',
    'advertising',
    'event',
    'other',
  ])

  const [clientStatuses] = useState([
    'active',
    'inactive',
    'lead',
    'customer',
    'prospect',
  ])

  useEffect(() => {
    fetchClients()
  }, [currentPage, selectedStatus, selectedSource])

  const fetchClients = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        status: selectedStatus,
        source: selectedSource,
        search: searchTerm,
        page: currentPage.toString(),
        limit: '20',
      })

      const response = await fetch(`/api/admin/clients?${params}`)
      const data = await response.json()

      if (data.success) {
        setClients(data.clients)
        setTotalPages(data.pagination.totalPages)
      } else {
        toast.error('Error fetching clients', {
          description: data.error || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
      toast.error('Error fetching clients', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'lead':
        return 'bg-blue-100 text-blue-800'
      case 'customer':
        return 'bg-purple-100 text-purple-800'
      case 'prospect':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSourceColor = (source) => {
    switch (source) {
      case 'website':
        return 'bg-blue-100 text-blue-800'
      case 'referral':
        return 'bg-green-100 text-green-800'
      case 'cold_call':
        return 'bg-red-100 text-red-800'
      case 'social_media':
        return 'bg-purple-100 text-purple-800'
      case 'advertising':
        return 'bg-orange-100 text-orange-800'
      case 'event':
        return 'bg-indigo-100 text-indigo-800'
      case 'other':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddClient = () => {
    setEditingClient(null)
    setShowClientForm(true)
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setShowClientForm(true)
  }

  const handleDeleteClient = (client) => {
    setClientToDelete(client)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteClient = async () => {
    if (!clientToDelete) return

    try {
      const response = await fetch(
        `/api/admin/clients?id=${clientToDelete.id}`,
        {
          method: 'DELETE',
        }
      )

      const result = await response.json()

      if (response.ok) {
        toast.success('Client deleted successfully', {
          description: `${clientToDelete.firstName} ${clientToDelete.lastName} has been removed from your client list.`,
        })
        fetchClients() // Refresh the list
      } else {
        toast.error('Error deleting client', {
          description: result.error || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error deleting client:', error)
      toast.error('Error deleting client', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setShowDeleteConfirm(false)
      setClientToDelete(null)
    }
  }

  const cancelDeleteClient = () => {
    setShowDeleteConfirm(false)
    setClientToDelete(null)
  }

  const handleClientFormSuccess = (newClient) => {
    fetchClients() // Refresh the list
  }

  const formatClientName = (client) => {
    return `${client.firstName} ${client.lastName}`
  }

  if (loading) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading clients...</p>
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
              <h1 className='text-2xl font-bold text-gray-900'>Clients</h1>
              <p className='text-gray-600 mt-1'>
                Manage your real estate clients and prospects
              </p>
            </div>

            <div className='flex items-center space-x-3'>
              <button
                onClick={handleAddClient}
                className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-300 flex items-center'
              >
                <Plus className='h-4 w-4 mr-2' />
                Add Client
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
            <div className='flex flex-col sm:flex-row gap-4'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <input
                    type='text'
                    placeholder='Search clients...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              </div>

              <div className='flex gap-3'>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='all'>All Sources</option>
                  {clientSources.map((source) => (
                    <option key={source} value={source}>
                      {source.charAt(0).toUpperCase() +
                        source.slice(1).replace('_', ' ')}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value='all'>All Statuses</option>
                  {clientStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>

                <button
                  onClick={fetchClients}
                  className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center'
                >
                  <Filter className='h-4 w-4 mr-2' />
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Clients Table */}
          <div className='bg-white rounded-lg shadow-sm border overflow-hidden'>
            <div className='px-6 py-4 border-b border-gray-200'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Clients ({clients.length})
              </h2>
            </div>

            {clients.length === 0 ? (
              <div className='p-8 text-center'>
                <Users className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <p className='text-gray-600'>No clients found</p>
              </div>
            ) : (
              <div className='overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50'>
                    <tr>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Client
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Source
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Status
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Company
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Location
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Created
                      </th>
                      <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {clients.map((client) => (
                      <tr key={client.id} className='hover:bg-gray-50'>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                              <span className='text-blue-600 font-medium text-sm'>
                                {client.firstName?.charAt(0) || '?'}
                              </span>
                            </div>
                            <div className='ml-4'>
                              <div className='text-sm font-medium text-gray-900'>
                                {formatClientName(client)}
                              </div>
                              <div className='text-sm text-gray-500'>
                                {client.email}
                              </div>
                              {client.phone && (
                                <div className='text-sm text-gray-500 flex items-center'>
                                  <Phone className='h-3 w-3 mr-1' />
                                  {client.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSourceColor(
                              client.source
                            )}`}
                          >
                            {client.source?.charAt(0).toUpperCase() +
                              client.source?.slice(1).replace('_', ' ') ||
                              'Unknown'}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              client.status
                            )}`}
                          >
                            {client.status?.charAt(0).toUpperCase() +
                              client.status?.slice(1) || 'Unknown'}
                          </span>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>
                            {client.company || 'N/A'}
                          </div>
                          {client.position && (
                            <div className='text-sm text-gray-500'>
                              {client.position}
                            </div>
                          )}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='text-sm text-gray-900'>
                            {client.city && client.state
                              ? `${client.city}, ${client.state}`
                              : 'N/A'}
                          </div>
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                          {formatDate(client.createdAt)}
                        </td>
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                          <div className='flex space-x-2'>
                            <button
                              onClick={() => {
                                setSelectedClient(client)
                                setShowModal(true)
                              }}
                              className='text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50'
                              title='View Details'
                            >
                              <Eye className='h-4 w-4' />
                            </button>
                            <button
                              onClick={() => handleEditClient(client)}
                              className='text-yellow-600 hover:text-yellow-900 p-1 rounded hover:bg-yellow-50'
                              title='Edit Client'
                            >
                              <Edit className='h-4 w-4' />
                            </button>
                            <button
                              onClick={() => handleDeleteClient(client)}
                              className='text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50'
                              title='Delete Client'
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

      {/* Client Detail Modal */}
      {showModal && selectedClient && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
          <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='mt-3'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Client Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  ×
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Name
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {formatClientName(selectedClient)}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.email}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Phone
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.phone || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Company
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.company || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Position
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.position || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Status
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.status?.charAt(0).toUpperCase() +
                      selectedClient.status?.slice(1)}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Source
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.source?.charAt(0).toUpperCase() +
                      selectedClient.source?.slice(1).replace('_', ' ')}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Address
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.address || 'N/A'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Location
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.city && selectedClient.state
                      ? `${selectedClient.city}, ${selectedClient.state} ${
                          selectedClient.zipCode || ''
                        }`.trim()
                      : 'N/A'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Notes
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {selectedClient.notes || 'No notes available'}
                  </p>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Created
                  </label>
                  <p className='mt-1 text-sm text-gray-900'>
                    {formatDate(selectedClient.createdAt)}
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

      {/* Client Form Modal */}
      <ClientForm
        isOpen={showClientForm}
        onClose={() => {
          setShowClientForm(false)
          setEditingClient(null)
        }}
        onSuccess={handleClientFormSuccess}
        editingClient={editingClient}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={cancelDeleteClient}
        onConfirm={confirmDeleteClient}
        title='Delete Client'
        message={`Are you sure you want to delete ${
          clientToDelete
            ? `${clientToDelete.firstName} ${clientToDelete.lastName}`
            : 'this client'
        }? This action cannot be undone and will permanently remove all client information.`}
        confirmText='Delete Client'
        cancelText='Cancel'
        type='danger'
      />
    </div>
  )
}

export default AdminClientsPage
