import { NextResponse } from 'next/server'
import { uploadToCloudinary } from '../../../../lib/cloudinary'

export async function POST(request) {
  try {
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
    const maxSize = 50 * 1024 * 1024 // 50MB per file

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
          { error: `File too large: ${file.name}. Maximum size is 50MB` },
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
        return NextResponse.json(
          { error: `Failed to upload ${file.name}. Please try again.` },
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
