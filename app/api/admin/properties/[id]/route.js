import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { properties } from '../../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(request, { params }) {
  try {
    const { id } = await params
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
      features,
      images
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      )
    }

    const updateData = {
      updatedAt: new Date()
    }

    // Only update fields that are provided
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (price !== undefined) updateData.price = parseFloat(price)
    if (location !== undefined) updateData.location = location
    if (propertyType !== undefined) updateData.propertyType = propertyType
    if (status !== undefined) updateData.status = status
    if (bedrooms !== undefined) updateData.bedrooms = bedrooms ? parseInt(bedrooms) : null
    if (bathrooms !== undefined) updateData.bathrooms = bathrooms ? parseInt(bathrooms) : null
    if (squareFeet !== undefined) updateData.squareFeet = squareFeet ? parseInt(squareFeet) : null
    if (features !== undefined) updateData.features = features ? JSON.stringify(features) : null
    if (images !== undefined) updateData.images = images ? JSON.stringify(images) : null

    const [updatedProperty] = await db
      .update(properties)
      .set(updateData)
      .where(eq(properties.id, parseInt(id)))
      .returning()

    if (!updatedProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Property updated successfully',
      property: updatedProperty
    })

  } catch (error) {
    console.error('Error updating property:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      )
    }

    const [deletedProperty] = await db
      .delete(properties)
      .where(eq(properties.id, parseInt(id)))
      .returning()

    if (!deletedProperty) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Property deleted successfully',
      property: deletedProperty
    })

  } catch (error) {
    console.error('Error deleting property:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
