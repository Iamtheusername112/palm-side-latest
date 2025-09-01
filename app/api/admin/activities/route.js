import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { properties, contacts } from '../../../../lib/schema'
import { desc, limit } from 'drizzle-orm'

export async function GET(request) {
  try {
    // Get recent properties (last 5)
    const recentProperties = await db
      .select()
      .from(properties)
      .orderBy(desc(properties.createdAt))
      .limit(5)

    // Get recent contacts (last 5)
    const recentContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt))
      .limit(5)

    // Combine and format activities
    const activities = []

    // Add property activities
    recentProperties.forEach((property) => {
      activities.push({
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
    recentContacts.forEach((contact) => {
      activities.push({
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

    // Sort by time (most recent first) and take top 10
    activities.sort((a, b) => new Date(b.time) - new Date(a.time))
    const recentActivities = activities.slice(0, 10)

    return NextResponse.json({
      success: true,
      activities: recentActivities,
    })
  } catch (error) {
    console.error('Error fetching recent activities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
