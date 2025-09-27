import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { properties } from '../../../lib/schema'
import { eq, and, like, desc, asc, gte, lte } from 'drizzle-orm'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const location = searchParams.get('location')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const featured = searchParams.get('featured') // 'true' to get only featured properties
    const offset = (page - 1) * limit

    // Build query based on filters - only show active properties for public
    let query = db
      .select()
      .from(properties)
      .where(eq(properties.isActive, true))
    let whereConditions = [eq(properties.isActive, true)]

    if (type && type !== 'all') {
      whereConditions.push(eq(properties.propertyType, type))
    }

    if (status && status !== 'all') {
      whereConditions.push(eq(properties.status, status))
    }

    if (location && location !== 'all') {
      whereConditions.push(like(properties.location, `%${location}%`))
    }

    if (featured === 'true') {
      whereConditions.push(eq(properties.isFeatured, true))
    }

    // Apply where conditions
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions))
    }

    // Apply sorting
    if (sortBy === 'price') {
      query =
        sortOrder === 'desc'
          ? query.orderBy(desc(properties.price))
          : query.orderBy(asc(properties.price))
    } else if (sortBy === 'title') {
      query =
        sortOrder === 'desc'
          ? query.orderBy(desc(properties.title))
          : query.orderBy(asc(properties.title))
    } else if (sortBy === 'location') {
      query =
        sortOrder === 'desc'
          ? query.orderBy(desc(properties.location))
          : query.orderBy(asc(properties.location))
    } else {
      // Default sort by createdAt
      query =
        sortOrder === 'desc'
          ? query.orderBy(desc(properties.createdAt))
          : query.orderBy(asc(properties.createdAt))
    }

    // Get properties with pagination
    const propertiesList = await query.limit(limit).offset(offset)

    // Transform the data to match the frontend expectations
    const transformedProperties = propertiesList.map((property) => ({
      id: property.id,
      title: property.title,
      type: property.propertyType || 'Property',
      location: property.location,
      price: parseFloat(property.price) || 0,
      beds: property.bedrooms || 0,
      baths: property.bathrooms || 0,
      sqft: property.squareFeet || 0,
      image:
        property.mainImage ||
        (property.images && property.images.length > 0
          ? property.images[0]
          : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80'),
      images: property.images || [], // Include all images uploaded by admin
      rating: 4.5, // Default rating since we don't have this in the database yet
      featured: property.isFeatured || false,
      status: property.status || 'For Sale',
      description:
        property.description ||
        'Beautiful property available for sale or lease.',
      features: property.features || [],
      address: property.address,
      city: property.city,
      state: property.state,
      zipCode: property.zipCode,
      country: property.country,
      yearBuilt: property.yearBuilt,
      lotSize: property.lotSize,
      views: property.views || 0,
      favorites: property.favorites || 0,
      contactCount: property.contactCount || 0,
      coordinates: property.coordinates,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    }))

    return NextResponse.json({
      success: true,
      properties: transformedProperties,
      pagination: {
        page,
        limit,
        total: transformedProperties.length,
        totalPages: Math.ceil(transformedProperties.length / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching properties:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
