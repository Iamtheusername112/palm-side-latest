import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { clients } from '../../../../lib/schema'
import { desc, eq, count, like, or, and } from 'drizzle-orm'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const source = searchParams.get('source')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = (page - 1) * limit

    // Build query based on filters
    let query = db.select().from(clients)
    let countQuery = db.select({ count: count() }).from(clients)

    const conditions = []

    if (status && status !== 'all') {
      conditions.push(eq(clients.status, status))
    }

    if (source && source !== 'all') {
      conditions.push(eq(clients.source, source))
    }

    if (search) {
      conditions.push(
        or(
          like(clients.firstName, `%${search}%`),
          like(clients.lastName, `%${search}%`),
          like(clients.email, `%${search}%`),
          like(clients.company, `%${search}%`)
        )
      )
    }

    if (conditions.length > 0) {
      const whereCondition =
        conditions.length === 1 ? conditions[0] : and(...conditions)
      query = query.where(whereCondition)
      countQuery = countQuery.where(whereCondition)
    }

    // Get total count for pagination
    const countResult = await countQuery
    const totalCount = countResult[0]?.count || 0

    // Get clients with pagination and ordering
    const clientsList = await query
      .orderBy(desc(clients.createdAt))
      .limit(limit)
      .offset(offset)

    return NextResponse.json({
      success: true,
      clients: clientsList,
      pagination: {
        page,
        limit,
        total: Number(totalCount),
        totalPages: Math.ceil(Number(totalCount) / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching clients:', error)
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
      firstName,
      lastName,
      email,
      phone,
      company,
      position,
      address,
      city,
      state,
      zipCode,
      country,
      notes,
      status,
      source,
    } = body

    // Basic validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingClient = await db
      .select()
      .from(clients)
      .where(eq(clients.email, email))
      .limit(1)

    if (existingClient.length > 0) {
      return NextResponse.json(
        { error: 'A client with this email already exists' },
        { status: 409 }
      )
    }

    // Insert new client
    const [newClient] = await db
      .insert(clients)
      .values({
        firstName,
        lastName,
        email,
        phone: phone || null,
        company: company || null,
        position: position || null,
        address: address || null,
        city: city || null,
        state: state || null,
        zipCode: zipCode || null,
        country: country || 'USA',
        notes: notes || null,
        status: status || 'active',
        source: source || 'website',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json({
      success: true,
      message: 'Client created successfully',
      client: newClient,
    })
  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      )
    }

    // If email is being updated, check if it already exists for another client
    if (updates.email) {
      const existingClient = await db
        .select()
        .from(clients)
        .where(eq(clients.email, updates.email))
        .limit(1)

      // If email exists and it's not the same client we're updating
      if (existingClient.length > 0 && existingClient[0].id !== parseInt(id)) {
        return NextResponse.json(
          { error: 'A client with this email already exists' },
          { status: 409 }
        )
      }
    }

    const updateData = {
      ...updates,
      updatedAt: new Date(),
    }

    const [updatedClient] = await db
      .update(clients)
      .set(updateData)
      .where(eq(clients.id, id))
      .returning()

    if (!updatedClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Client updated successfully',
      client: updatedClient,
    })
  } catch (error) {
    console.error('Error updating client:', error)

    // Handle specific database constraint errors
    if (error.code === '23505') {
      if (error.constraint === 'clients_email_unique') {
        return NextResponse.json(
          { error: 'A client with this email already exists' },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      )
    }

    const [deletedClient] = await db
      .delete(clients)
      .where(eq(clients.id, parseInt(id)))
      .returning()

    if (!deletedClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Client deleted successfully',
      client: deletedClient,
    })
  } catch (error) {
    console.error('Error deleting client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
