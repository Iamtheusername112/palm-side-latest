import { NextResponse } from 'next/server'
import { db } from '../../../../../../lib/db'
import { properties } from '../../../../../../lib/schema'
import { eq } from 'drizzle-orm'

export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()
    const { status, notes } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Property ID is required' },
        { status: 400 }
      )
    }

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    // Validate status values
    const validStatuses = [
      'For Sale',
      'For Lease',
      'Pre-Construction',
      'Under Construction',
      'Sold',
      'Leased',
      'In Contract',
      'Pending',
      'Inactive',
      'Withdrawn',
    ]

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    // Get current property to check if it exists
    const [currentProperty] = await db
      .select()
      .from(properties)
      .where(eq(properties.id, parseInt(id)))

    if (!currentProperty) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    // Update property status
    const updateData = {
      status,
      updatedAt: new Date(),
    }

    // Add notes if provided
    if (notes) {
      updateData.adminNotes = notes
    }

    // If marking as sold/leased, set isActive to false
    if (status === 'Sold' || status === 'Leased') {
      updateData.isActive = false
    }

    // If marking as for sale/lease, set isActive to true
    if (status === 'For Sale' || status === 'For Lease') {
      updateData.isActive = true
    }

    const [updatedProperty] = await db
      .update(properties)
      .set(updateData)
      .where(eq(properties.id, parseInt(id)))
      .returning()

    return NextResponse.json({
      success: true,
      message: `Property status updated to ${status}`,
      property: updatedProperty,
    })
  } catch (error) {
    console.error('Error updating property status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
