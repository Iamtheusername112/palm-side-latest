'use client'

import { useState, useRef, useCallback } from 'react'
import {
  Upload,
  X,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'

const ImageUpload = ({
  images = [],
  onImagesChange,
  maxImages = 20,
  maxSizePerFile = 10 * 1024 * 1024, // 10MB
  acceptedTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/bmp',
    'image/tiff',
  ],
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const fileInputRef = useRef(null)

  const validateFile = (file) => {
    if (!acceptedTypes.includes(file.type)) {
      return `Invalid file type: ${file.name}. Allowed types: JPEG, PNG, GIF, WebP, BMP, TIFF`
    }

    if (file.size > maxSizePerFile) {
      return `File too large: ${file.name}. Maximum size is ${Math.round(
        maxSizePerFile / (1024 * 1024)
      )}MB`
    }

    return null
  }

  const handleFiles = useCallback(
    async (files) => {
      const fileArray = Array.from(files)

      if (fileArray.length === 0) return

      if (images.length + fileArray.length > maxImages) {
        toast.error(
          `Maximum ${maxImages} images allowed. You can add ${
            maxImages - images.length
          } more images.`
        )
        return
      }

      // Validate all files first
      const validationErrors = []
      fileArray.forEach((file) => {
        const error = validateFile(file)
        if (error) validationErrors.push(error)
      })

      if (validationErrors.length > 0) {
        validationErrors.forEach((error) => toast.error(error))
        return
      }

      setIsUploading(true)
      setUploadProgress({})

      try {
        const formData = new FormData()
        fileArray.forEach((file) => {
          formData.append('images', file)
        })

        const response = await fetch('/api/admin/properties/upload-images', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          const newImages = [...images, ...data.images]
          onImagesChange(newImages)
          toast.success(`${data.images.length} images uploaded successfully!`)
        } else {
          toast.error(data.error || 'Failed to upload images')
        }
      } catch (error) {
        console.error('Error uploading images:', error)
        toast.error('Failed to upload images. Please try again.')
      } finally {
        setIsUploading(false)
        setUploadProgress({})
      }
    },
    [images, maxImages, maxSizePerFile, acceptedTypes, onImagesChange]
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      const files = e.dataTransfer.files
      handleFiles(files)
    },
    [handleFiles]
  )

  const handleFileInput = useCallback(
    (e) => {
      const files = e.target.files
      handleFiles(files)
      // Reset input value to allow selecting the same files again
      e.target.value = ''
    },
    [handleFiles]
  )

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
    toast.success('Image removed successfully')
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className='space-y-4'>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className='hidden'
        />

        <div className='space-y-4'>
          {isUploading ? (
            <div className='flex flex-col items-center space-y-2'>
              <Loader2 className='h-12 w-12 text-blue-600 animate-spin' />
              <p className='text-lg font-medium text-gray-900'>
                Uploading images...
              </p>
              <p className='text-sm text-gray-600'>
                Please wait while your images are being uploaded
              </p>
            </div>
          ) : (
            <>
              <div className='flex justify-center'>
                <Upload className='h-12 w-12 text-gray-400' />
              </div>
              <div>
                <p className='text-lg font-medium text-gray-900'>
                  {isDragging ? 'Drop images here' : 'Upload Property Images'}
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  Drag and drop images here, or{' '}
                  <button
                    type='button'
                    onClick={openFileDialog}
                    className='text-blue-600 hover:text-blue-800 font-medium'
                  >
                    browse files
                  </button>
                </p>
              </div>
              <div className='text-xs text-gray-500'>
                <p>Supports: JPEG, PNG, GIF, WebP, BMP, TIFF</p>
                <p>
                  Maximum: {maxImages} images,{' '}
                  {Math.round(maxSizePerFile / (1024 * 1024))}MB per file
                </p>
                <p>
                  Current: {images.length}/{maxImages} images
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h4 className='text-lg font-medium text-gray-900'>
              Uploaded Images ({images.length}/{maxImages})
            </h4>
            {images.length > 0 && (
              <button
                type='button'
                onClick={openFileDialog}
                disabled={isUploading || images.length >= maxImages}
                className='px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Add More Images
              </button>
            )}
          </div>

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {images.map((image, index) => (
              <div key={index} className='relative group'>
                <div className='aspect-square rounded-lg overflow-hidden bg-gray-100'>
                  <img
                    src={image.url}
                    alt={`Property image ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Remove Button */}
                <button
                  type='button'
                  onClick={() => removeImage(index)}
                  className='absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700'
                  title='Remove image'
                >
                  <X className='h-4 w-4' />
                </button>

                {/* Image Info */}
                <div className='mt-2 text-xs text-gray-600'>
                  <p className='truncate' title={image.originalName}>
                    {image.originalName}
                  </p>
                  <p>{Math.round(image.size / 1024)}KB</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reorder Instructions */}
          {images.length > 1 && (
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
              <div className='flex items-start'>
                <ImageIcon className='h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0' />
                <div className='text-sm text-blue-800'>
                  <p className='font-medium'>Image Order</p>
                  <p>
                    The first image will be used as the main property image. You
                    can reorder images by removing and re-uploading them in your
                    preferred order.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Tips */}
      <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
        <div className='flex items-start'>
          <AlertCircle className='h-5 w-5 text-gray-600 mt-0.5 mr-2 flex-shrink-0' />
          <div className='text-sm text-gray-700'>
            <p className='font-medium mb-1'>Upload Tips:</p>
            <ul className='space-y-1 text-xs'>
              <li>• Upload high-quality images for best results</li>
              <li>• The first image will be the main property photo</li>
              <li>• Supported formats: JPEG, PNG, GIF, WebP, BMP, TIFF</li>
              <li>
                • Maximum file size:{' '}
                {Math.round(maxSizePerFile / (1024 * 1024))}MB per image
              </li>
              <li>• You can upload up to {maxImages} images at once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
