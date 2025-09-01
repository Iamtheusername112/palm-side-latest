import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('images')

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 })
    }

    if (files.length > 20) {
      return NextResponse.json(
        { error: 'Maximum 20 images allowed' },
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
    ]
    const maxSize = 10 * 1024 * 1024 // 10MB per file

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          {
            error: `Invalid file type: ${file.type}. Allowed types: JPEG, PNG, GIF, WebP, BMP, TIFF`,
          },
          { status: 400 }
        )
      }

      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File too large: ${file.name}. Maximum size is 10MB` },
          { status: 400 }
        )
      }
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'properties')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    const uploadedImages = []

    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)

      // Generate unique filename
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const extension = file.name.split('.').pop()
      const filename = `property_${timestamp}_${randomString}.${extension}`

      const filepath = join(uploadsDir, filename)
      await writeFile(filepath, buffer)

      uploadedImages.push({
        filename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/properties/${filename}`,
      })
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
