import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '../../../../lib/cloudinary'

export async function POST(request) {
  try {
    // Check Cloudinary configuration
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('❌ Cloudinary credentials are not configured')
      return NextResponse.json(
        { 
          error: 'Image upload service is not configured. Please contact the administrator.',
          details: 'Missing Cloudinary environment variables'
        },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('images')

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 })
    }

    if (files.length > 50) {
      return NextResponse.json(
        { error: 'Maximum 50 images allowed' },
        { status: 400 }
      )
    }

    // Validate file types and sizes
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/bmp',
      'image/tiff',
      'image/svg+xml',
      'image/heic',
      'image/heif',
      'image/avif',
      'image/jfif',
      'image/pjpeg',
      'image/pjp',
    ]
    const maxSize = 10 * 1024 * 1024 // 10MB per file (Cloudinary FREE tier limit)

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type: ${file.type}. Allowed types: JPEG, PNG, GIF, WebP, BMP, TIFF, SVG, HEIC, HEIF, AVIF`,
          },
          { status: 400 }
        )
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { 
            error: `File too large: ${file.name}. Maximum size is 10MB.\n\nTip: Compress your image for free at:\n• TinyPNG.com\n• ImageOptim.app\n\nMost property photos are 2-5MB after proper compression and still look great!` 
          },
          { status: 400 }
        )
      }
    }

    const uploadedImages = []

    // Upload to Cloudinary (works in production!)
    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      try {
        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(
          buffer,
          file.name,
          'palmside/properties'
        )

        uploadedImages.push({
          filename: cloudinaryResult.publicId.split('/').pop(),
          originalName: file.name,
          size: file.size,
          type: file.type,
          url: cloudinaryResult.url, // Cloudinary URL
          publicId: cloudinaryResult.publicId, // For deletion if needed
        })
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error)
        const errorMessage = error.message || error.error?.message || 'Unknown error'
        return NextResponse.json(
          { 
            error: `Failed to upload ${file.name}: ${errorMessage}`,
            details: error.http_code ? `Cloudinary error code: ${error.http_code}` : undefined
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: `${uploadedImages.length} images uploaded successfully`,
      images: uploadedImages,
    })
  } catch (error) {
    console.error('Error uploading images:', error)
    const errorMessage = error.message || 'Unknown error occurred'
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}
