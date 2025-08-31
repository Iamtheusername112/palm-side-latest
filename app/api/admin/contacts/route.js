import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { contacts } from '../../../../lib/schema'
import { desc, eq, count } from 'drizzle-orm'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query based on filters
    let query = db.select().from(contacts)
    
    if (status && status !== 'all') {
      query = query.where(eq(contacts.status, status))
    }

    // Get total count for pagination
    let countQuery = db.select({ count: count() }).from(contacts)
    if (status && status !== 'all') {
      countQuery = countQuery.where(eq(contacts.status, status))
    }
    const countResult = await countQuery
    const totalCount = countResult[0]?.count || 0

    // Get contacts with pagination and ordering
    const contactsList = await query
      .orderBy(desc(contacts.createdAt))
      .limit(limit)
      .offset(offset)

    return NextResponse.json({
      success: true,
      contacts: contactsList,
      pagination: {
        page,
        limit,
        total: Number(totalCount),
        totalPages: Math.ceil(Number(totalCount) / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, status, adminNotes, priority } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      )
    }

    const updateData = {
      updatedAt: new Date()
    }

    if (status) updateData.status = status
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes
    if (priority) updateData.priority = priority

    // If status is being updated to 'responded', set respondedAt
    if (status === 'responded') {
      updateData.respondedAt = new Date()
    }

    const [updatedContact] = await db
      .update(contacts)
      .set(updateData)
      .where(eq(contacts.id, id))
      .returning()

    return NextResponse.json({
      success: true,
      message: 'Contact updated successfully',
      contact: updatedContact
    })

  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
