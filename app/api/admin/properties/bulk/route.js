import { NextResponse } from 'next/server'
import { db } from '../../../../../lib/db'
import { properties } from '../../../../../lib/schema'
import { inArray, eq } from 'drizzle-orm'

export async function DELETE(request) {
  try {
    const body = await request.json()
    const { propertyIds } = body

    if (
      !propertyIds ||
      !Array.isArray(propertyIds) ||
      propertyIds.length === 0
    ) {
      return NextResponse.json(
        { error: 'Property IDs are required' },
        { status: 400 }
      )
    }

    // Delete properties
    const deletedProperties = await db
      .delete(properties)
      .where(inArray(properties.id, propertyIds))
      .returning({ id: properties.id, title: properties.title })

    return NextResponse.json({
      success: true,
      message: `${deletedProperties.length} properties deleted successfully`,
      deletedProperties,
    })
  } catch (error) {
    console.error('Error deleting properties:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { propertyIds, status, isFeatured, isActive } = body

    if (
      !propertyIds ||
      !Array.isArray(propertyIds) ||
      propertyIds.length === 0
    ) {
      return NextResponse.json(
        { error: 'Property IDs are required' },
        { status: 400 }
      )
    }

    // Build update object
    const updateData = {}
    if (status) updateData.status = status
    if (typeof isFeatured === 'boolean') updateData.isFeatured = isFeatured
    if (typeof isActive === 'boolean') updateData.isActive = isActive
    updateData.updatedAt = new Date()

    if (Object.keys(updateData).length === 1) {
      // Only updatedAt
      return NextResponse.json(
        { error: 'No valid update fields provided' },
        { status: 400 }
      )
    }

    // Update properties
    const updatedProperties = await db
      .update(properties)
      .set(updateData)
      .where(inArray(properties.id, propertyIds))
      .returning({
        id: properties.id,
        title: properties.title,
        status: properties.status,
      })

    return NextResponse.json({
      success: true,
      message: `${updatedProperties.length} properties updated successfully`,
      updatedProperties,
    })
  } catch (error) {
    console.error('Error updating properties:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
