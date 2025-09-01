'use client'

import { useState } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'

const StatusChangeModal = ({ property, onSave, onCancel }) => {
  const [status, setStatus] = useState(property?.status || 'For Sale')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  const statusOptions = [
    { value: 'For Sale', label: 'For Sale', color: 'text-green-600' },
    { value: 'For Lease', label: 'For Lease', color: 'text-blue-600' },
    {
      value: 'Pre-Construction',
      label: 'Pre-Construction',
      color: 'text-yellow-600',
    },
    {
      value: 'Under Construction',
      label: 'Under Construction',
      color: 'text-orange-600',
    },
    { value: 'In Contract', label: 'In Contract', color: 'text-purple-600' },
    { value: 'Pending', label: 'Pending', color: 'text-indigo-600' },
    { value: 'Sold', label: 'Sold', color: 'text-red-600' },
    { value: 'Leased', label: 'Leased', color: 'text-red-600' },
    { value: 'Inactive', label: 'Inactive', color: 'text-gray-600' },
    { value: 'Withdrawn', label: 'Withdrawn', color: 'text-gray-600' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSave({ status, notes })
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (statusValue) => {
    const option = statusOptions.find((opt) => opt.value === statusValue)
    return option?.color || 'text-gray-600'
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
        <div className='p-6 border-b border-gray-200'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-900'>
              Change Property Status
            </h2>
            <button
              onClick={onCancel}
              className='text-gray-400 hover:text-gray-600'
            >
              <X className='h-5 w-5' />
            </button>
          </div>
          {property && (
            <p className='text-sm text-gray-600 mt-2'>{property.title}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Current Status
            </label>
            <div
              className={`text-sm font-medium ${getStatusColor(
                property?.status
              )}`}
            >
              {property?.status || 'Not Set'}
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              New Status *
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Add any notes about this status change...'
            />
          </div>

          {/* Status Change Warnings */}
          {(status === 'Sold' || status === 'Leased') && (
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'>
              <div className='flex items-start'>
                <AlertCircle className='h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0' />
                <div className='text-sm text-yellow-800'>
                  <p className='font-medium'>
                    Property will be marked as inactive
                  </p>
                  <p className='mt-1'>
                    This will remove it from active listings.
                  </p>
                </div>
              </div>
            </div>
          )}

          {(status === 'For Sale' || status === 'For Lease') &&
            property?.status !== 'For Sale' &&
            property?.status !== 'For Lease' && (
              <div className='bg-green-50 border border-green-200 rounded-lg p-3'>
                <div className='flex items-start'>
                  <AlertCircle className='h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0' />
                  <div className='text-sm text-green-800'>
                    <p className='font-medium'>
                      Property will be marked as active
                    </p>
                    <p className='mt-1'>
                      This will make it visible in listings.
                    </p>
                  </div>
                </div>
              </div>
            )}

          {/* Actions */}
          <div className='flex items-center justify-end space-x-3 pt-4 border-t border-gray-200'>
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
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StatusChangeModal
