import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Upload an image to Cloudinary
 * @param {Buffer} buffer - The image file buffer
 * @param {string} originalName - Original filename
 * @param {string} folder - Cloudinary folder name (default: 'palmside/properties')
 * @returns {Promise<Object>} - Upload result with URL and public_id
 */
export async function uploadToCloudinary(buffer, originalName, folder = 'palmside/properties') {
  try {
    return new Promise((resolve, reject) => {
      // Create upload stream
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
          public_id: `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
          // Automatically optimize images
          transformation: [
            { quality: 'auto', fetch_format: 'auto' }
          ]
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(error)
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              size: result.bytes,
              originalName: originalName,
            })
          }
        }
      )

      // Write buffer to stream
      uploadStream.end(buffer)
    })
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw error
  }
}

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - The Cloudinary public_id of the image
 * @returns {Promise<Object>} - Deletion result
 */
export async function deleteFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error)
    throw error
  }
}

/**
 * Get optimized image URL with transformations
 * @param {string} publicId - The Cloudinary public_id
 * @param {Object} options - Transformation options
 * @returns {string} - Optimized image URL
 */
export function getOptimizedImageUrl(publicId, options = {}) {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options

  return cloudinary.url(publicId, {
    transformation: [
      { width, height, crop },
      { quality, fetch_format: format }
    ]
  })
}

export default cloudinary

