'use client'

import { useState } from 'react'
import {
  X,
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  FileText,
  Save,
  Loader,
} from 'lucide-react'
import { toast } from 'sonner'

const ClientForm = ({ isOpen, onClose, onSuccess, editingClient = null }) => {
  const [formData, setFormData] = useState({
    firstName: editingClient?.firstName || '',
    lastName: editingClient?.lastName || '',
    email: editingClient?.email || '',
    phone: editingClient?.phone || '',
    company: editingClient?.company || '',
    position: editingClient?.position || '',
    address: editingClient?.address || '',
    city: editingClient?.city || '',
    state: editingClient?.state || '',
    zipCode: editingClient?.zipCode || '',
    country: editingClient?.country || 'USA',
    notes: editingClient?.notes || '',
    status: editingClient?.status || 'active',
    source: editingClient?.source || 'website',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const clientStatuses = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'lead', label: 'Lead' },
    { value: 'customer', label: 'Customer' },
    { value: 'prospect', label: 'Prospect' },
  ]

  const clientSources = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'cold_call', label: 'Cold Call' },
    { value: 'social_media', label: 'Social Media' },
    { value: 'advertising', label: 'Advertising' },
    { value: 'event', label: 'Event' },
    { value: 'other', label: 'Other' },
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const url = editingClient ? '/api/admin/clients' : '/api/admin/clients'

      const method = editingClient ? 'PATCH' : 'POST'

      const body = editingClient
        ? { id: editingClient.id, ...formData }
        : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(
          editingClient
            ? 'Client updated successfully!'
            : 'Client created successfully!',
          {
            description: `${formData.firstName} ${formData.lastName} has been ${
              editingClient ? 'updated' : 'added'
            } to your client list.`,
          }
        )

        // Reset form only if creating a new client
        if (!editingClient) {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            position: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'USA',
            notes: '',
            status: 'active',
            source: 'website',
          })
        }

        onSuccess?.(result.client)
        onClose()
      } else {
        // Handle specific error cases
        let errorMessage = result.error || 'Please try again.'

        if (
          response.status === 409 &&
          result.error?.includes('email already exists')
        ) {
          errorMessage =
            'A client with this email address already exists. Please use a different email.'
        }

        toast.error('Error saving client', {
          description: errorMessage,
        })
      }
    } catch (error) {
      console.error('Error saving client:', error)
      toast.error('Error saving client', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
      <div className='relative top-4 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white mb-4'>
        <div className='mt-3'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-lg font-medium text-gray-900'>
              {editingClient ? 'Edit Client' : 'Add New Client'}
            </h3>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X className='h-6 w-6' />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Personal Information */}
            <div className='space-y-4'>
              <h4 className='text-md font-medium text-gray-900 flex items-center'>
                <User className='h-4 w-4 mr-2' />
                Personal Information
              </h4>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    First Name *
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter first name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Last Name *
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter last name'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email Address *
                  </label>
                  <div className='relative'>
                    <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter email address'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone Number
                  </label>
                  <div className='relative'>
                    <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='Enter phone number'
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information */}
            <div className='space-y-4'>
              <h4 className='text-md font-medium text-gray-900 flex items-center'>
                <Building className='h-4 w-4 mr-2' />
                Company Information
              </h4>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Company
                  </label>
                  <input
                    type='text'
                    name='company'
                    value={formData.company}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter company name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Position
                  </label>
                  <input
                    type='text'
                    name='position'
                    value={formData.position}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter job title'
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className='space-y-4'>
              <h4 className='text-md font-medium text-gray-900 flex items-center'>
                <MapPin className='h-4 w-4 mr-2' />
                Address Information
              </h4>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Address
                </label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Enter street address'
                />
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    City
                  </label>
                  <input
                    type='text'
                    name='city'
                    value={formData.city}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter city'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    State
                  </label>
                  <input
                    type='text'
                    name='state'
                    value={formData.state}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter state'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    ZIP Code
                  </label>
                  <input
                    type='text'
                    name='zipCode'
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='Enter ZIP code'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Country
                </label>
                <input
                  type='text'
                  name='country'
                  value={formData.country}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Enter country'
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className='space-y-4'>
              <h4 className='text-md font-medium text-gray-900 flex items-center'>
                <FileText className='h-4 w-4 mr-2' />
                Additional Information
              </h4>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Status
                  </label>
                  <select
                    name='status'
                    value={formData.status}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  >
                    {clientStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Source
                  </label>
                  <select
                    name='source'
                    value={formData.source}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  >
                    {clientSources.map((source) => (
                      <option key={source.value} value={source.value}>
                        {source.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Notes
                </label>
                <textarea
                  name='notes'
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  placeholder='Enter any additional notes about this client'
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className='flex justify-end space-x-3 pt-6 border-t border-gray-200'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center'
              >
                {isSubmitting ? (
                  <>
                    <Loader className='h-4 w-4 mr-2 animate-spin' />
                    {editingClient ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <Save className='h-4 w-4 mr-2' />
                    {editingClient ? 'Update Client' : 'Create Client'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ClientForm
