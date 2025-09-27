import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { properties, contacts, clients } from '../../../../lib/schema'
import { count } from 'drizzle-orm'

export async function GET(request) {
  try {
    // Check if database is available during build time
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        message: 'Database not configured for build time',
        counts: {
          properties: 0,
          contacts: 0,
          clients: 0,
        },
        samples: {
          properties: [],
          contacts: [],
        },
      })
    }

    // Get simple counts to see what data exists
    const [propertiesCount, contactsCount, clientsCount] = await Promise.all([
      db.select({ count: count() }).from(properties),
      db.select({ count: count() }).from(contacts),
      db.select({ count: count() }).from(clients),
    ])

    // Get a few sample records
    const [sampleProperties, sampleContacts] = await Promise.all([
      db.select().from(properties).limit(3),
      db.select().from(contacts).limit(3),
    ])

    return NextResponse.json({
      success: true,
      counts: {
        properties: propertiesCount[0]?.count || 0,
        contacts: contactsCount[0]?.count || 0,
        clients: clientsCount[0]?.count || 0,
      },
      samples: {
        properties: sampleProperties,
        contacts: sampleContacts,
      },
    })
  } catch (error) {
    console.error('Error testing data:', error)
    return NextResponse.json({
      success: true,
      message: 'Database connection error during build',
      error: error.message,
      counts: {
        properties: 0,
        contacts: 0,
        clients: 0,
      },
      samples: {
        properties: [],
        contacts: [],
      },
    })
  }
}
