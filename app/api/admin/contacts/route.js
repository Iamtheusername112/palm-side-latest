import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { contacts } from '../../../../lib/schema'
import { desc, eq, count, or, ilike } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { PasswordAuthManager } from '../../../../lib/password-auth.js'

export async function GET(request) {
  try {
    // Verify authentication using session cookie
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
      return new Response('Unauthorized', { status: 401 })
    }

    let sessionData
    try {
      sessionData = JSON.parse(adminSession.value)

      if (!sessionData.adminId || !sessionData.sessionToken) {
        return new Response('Invalid session', { status: 401 })
      }

      // Validate session with database
      const admin = await PasswordAuthManager.validateSession(
        sessionData.sessionToken
      )

      if (!admin) {
        return new Response('Session expired', { status: 401 })
      }
    } catch (error) {
      return new Response('Invalid session data', { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query based on filters
    let query = db.select().from(contacts)
    let whereConditions = []

    // Add status filter
    if (status && status !== 'all') {
      whereConditions.push(eq(contacts.status, status))
    }

    // Add search filter
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`
      whereConditions.push(
        or(
          ilike(contacts.name, searchTerm),
          ilike(contacts.email, searchTerm),
          ilike(contacts.subject, searchTerm),
          ilike(contacts.message, searchTerm),
          ilike(contacts.phone, searchTerm)
        )
      )
    }

    // Apply all conditions
    if (whereConditions.length > 0) {
      query = query.where(
        whereConditions.length === 1
          ? whereConditions[0]
          : or(...whereConditions)
      )
    }

    // Get total count for pagination
    let countQuery = db.select({ count: count() }).from(contacts)
    if (whereConditions.length > 0) {
      countQuery = countQuery.where(
        whereConditions.length === 1
          ? whereConditions[0]
          : or(...whereConditions)
      )
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
        totalPages: Math.ceil(Number(totalCount) / limit),
      },
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
    // Verify authentication using session cookie
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
      return new Response('Unauthorized', { status: 401 })
    }

    let sessionData
    try {
      sessionData = JSON.parse(adminSession.value)

      if (!sessionData.adminId || !sessionData.sessionToken) {
        return new Response('Invalid session', { status: 401 })
      }

      // Validate session with database
      const admin = await PasswordAuthManager.validateSession(
        sessionData.sessionToken
      )

      if (!admin) {
        return new Response('Session expired', { status: 401 })
      }
    } catch (error) {
      return new Response('Invalid session data', { status: 401 })
    }

    const body = await request.json()
    const { id, status, adminNotes, priority } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      )
    }

    const updateData = {
      updatedAt: new Date(),
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
      contact: updatedContact,
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
