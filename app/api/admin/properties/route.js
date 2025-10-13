import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { properties } from '../../../../lib/schema'
import { desc, eq, asc, like, and, gte, lte, count } from 'drizzle-orm'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type')
    const status = searchParams.get('status')
    const location = searchParams.get('location')
    const search = searchParams.get('search')
    const priceMin = searchParams.get('priceMin')
    const priceMax = searchParams.get('priceMax')
    const bedroomsMin = searchParams.get('bedroomsMin')
    const bathroomsMin = searchParams.get('bathroomsMin')
    const squareFeetMin = searchParams.get('squareFeetMin')
    const yearBuiltMin = searchParams.get('yearBuiltMin')
    const isFeatured = searchParams.get('isFeatured')
    const isActive = searchParams.get('isActive')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const offset = (page - 1) * limit

    // Build query based on filters
    let query = db.select().from(properties)
    let whereConditions = []

    if (type && type !== 'all') {
      whereConditions.push(eq(properties.propertyType, type))
    }

    if (status && status !== 'all') {
      whereConditions.push(eq(properties.status, status))
    }

    if (location && location !== 'all') {
      whereConditions.push(like(properties.location, `%${location}%`))
    }

    if (search) {
      whereConditions.push(like(properties.title, `%${search}%`))
    }

    if (priceMin) {
      whereConditions.push(gte(properties.price, parseFloat(priceMin)))
    }

    if (priceMax) {
      whereConditions.push(lte(properties.price, parseFloat(priceMax)))
    }

    if (bedroomsMin) {
      whereConditions.push(gte(properties.bedrooms, parseInt(bedroomsMin)))
    }

    if (bathroomsMin) {
      whereConditions.push(gte(properties.bathrooms, parseFloat(bathroomsMin)))
    }

    if (squareFeetMin) {
      whereConditions.push(gte(properties.squareFeet, parseInt(squareFeetMin)))
    }

    if (yearBuiltMin) {
      whereConditions.push(gte(properties.yearBuilt, parseInt(yearBuiltMin)))
    }

    if (isFeatured && isFeatured !== 'all') {
      whereConditions.push(eq(properties.isFeatured, isFeatured === 'true'))
    }

    if (isActive && isActive !== 'all') {
      whereConditions.push(eq(properties.isActive, isActive === 'true'))
    }

    // Apply where conditions if any
    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions))
    }

    // Get total count for pagination
    let countQuery = db.select({ count: count() }).from(properties)
    if (whereConditions.length > 0) {
      countQuery = countQuery.where(and(...whereConditions))
    }
    const countResult = await countQuery
    const totalCount = countResult[0]?.count || 0

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

    return NextResponse.json({
      success: true,
      properties: propertiesList,
      pagination: {
        page,
        limit,
        total: Number(totalCount),
        totalPages: Math.ceil(Number(totalCount) / limit),
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

export async function POST(request) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      price,
      location,
      propertyType,
      status,
      bedrooms,
      bathrooms,
      squareFeet,
      lotSize,
      yearBuilt,
      plotSizeM2,
      builtAreaM2,
      livingSpaceM2,
      address,
      city,
      state,
      zipCode,
      country,
      features,
      images,
      isFeatured,
      isActive,
    } = body

    // Basic validation
    if (!title || !price || !location || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: title, price, location, status' },
        { status: 400 }
      )
    }

    // Insert new property
    const [newProperty] = await db
      .insert(properties)
      .values({
        title,
        description: description || null,
        price: parseFloat(price),
        location,
        propertyType: propertyType || null,
        status,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        squareFeet: squareFeet ? parseInt(squareFeet) : null,
        lotSize: lotSize ? parseInt(lotSize) : null,
        yearBuilt: yearBuilt ? parseInt(yearBuilt) : null,
        plotSizeM2: plotSizeM2 ? parseFloat(plotSizeM2) : null,
        builtAreaM2: builtAreaM2 ? parseFloat(builtAreaM2) : null,
        livingSpaceM2: livingSpaceM2 ? parseFloat(livingSpaceM2) : null,
        address: address || null,
        city: city || null,
        state: state || null,
        zipCode: zipCode || null,
        country: country || 'USA',
        features: features ? JSON.stringify(features) : null,
        images: images ? JSON.stringify(images) : null,
        isFeatured: isFeatured || false,
        isActive: isActive !== false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json(
      {
        success: true,
        message: 'Property created successfully',
        property: newProperty,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating property:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
