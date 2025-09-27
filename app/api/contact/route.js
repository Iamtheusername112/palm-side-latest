import { NextResponse } from 'next/server'
import { db } from '../../../lib/db'
import { contacts } from '../../../lib/schema'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Contact API endpoint is available',
  })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if database is available during build time
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        message: 'Contact form received (database not available during build)',
        contactId: 'build-time',
      })
    }

    // Get client IP and user agent
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Insert contact submission into database
    const [contact] = await db
      .insert(contacts)
      .values({
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: 'new',
        priority: 'normal',
        source: 'website',
        ipAddress: ip,
        userAgent,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: contact.id,
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
