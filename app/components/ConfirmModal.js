'use client'

import { X, AlertTriangle } from 'lucide-react'

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // warning, danger, info
}) => {
  if (!isOpen) return null

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'text-red-600',
          iconBg: 'bg-red-100',
          confirmBtn: 'bg-red-600 hover:bg-red-700 text-white',
          border: 'border-red-200',
        }
      case 'warning':
        return {
          icon: 'text-yellow-600',
          iconBg: 'bg-yellow-100',
          confirmBtn: 'bg-yellow-600 hover:bg-yellow-700 text-white',
          border: 'border-yellow-200',
        }
      case 'info':
        return {
          icon: 'text-blue-600',
          iconBg: 'bg-blue-100',
          confirmBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
          border: 'border-blue-200',
        }
      default:
        return {
          icon: 'text-gray-600',
          iconBg: 'bg-gray-100',
          confirmBtn: 'bg-gray-600 hover:bg-gray-700 text-white',
          border: 'border-gray-200',
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
      <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
        <div className='mt-3'>
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div
                className={`w-10 h-10 ${styles.iconBg} rounded-full flex items-center justify-center mr-3`}
              >
                <AlertTriangle className={`h-5 w-5 ${styles.icon}`} />
              </div>
              <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
            </div>
            <button
              onClick={onClose}
              className='text-gray-400 hover:text-gray-600 transition-colors'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          {/* Message */}
          <div className='mb-6'>
            <p className='text-sm text-gray-600'>{message}</p>
          </div>

          {/* Actions */}
          <div className='flex justify-end space-x-3'>
            <button
              onClick={onClose}
              className='px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors'
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${styles.confirmBtn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
