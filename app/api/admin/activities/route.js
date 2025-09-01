import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { properties, contacts } from '../../../../lib/schema'
import { desc, limit, count } from 'drizzle-orm'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    // Get total count of properties and contacts
    const [propertyCount] = await db.select({ count: count() }).from(properties)
    const [contactCount] = await db.select({ count: count() }).from(contacts)
    const totalItems = propertyCount.count + contactCount.count

    // Get all properties and contacts, then combine and sort
    const allProperties = await db
      .select()
      .from(properties)
      .orderBy(desc(properties.createdAt))

    const allContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))

    // Combine and format activities
    const allActivities = []

    // Add property activities
    allProperties.forEach((property) => {
      allActivities.push({
        id: `property-${property.id}`,
        action: 'New property listed',
        property: property.title,
        time: property.createdAt,
        type: 'property',
        icon: 'Building2',
        color: 'text-blue-600',
        data: property,
      })
    })

    // Add contact activities
    allContacts.forEach((contact) => {
      allActivities.push({
        id: `contact-${contact.id}`,
        action: 'Contact form submitted',
        contact: `${contact.name} - ${contact.subject}`,
        time: contact.createdAt,
        type: 'contact',
        icon: 'Mail',
        color: 'text-green-600',
        data: contact,
      })
    })

    // Sort by time (most recent first)
    allActivities.sort((a, b) => new Date(b.time) - new Date(a.time))

    // Apply pagination to the combined and sorted activities
    const paginatedActivities = allActivities.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      activities: paginatedActivities,
      pagination: {
        page,
        limit,
        total: totalItems,
        totalPages: Math.ceil(totalItems / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching recent activities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
