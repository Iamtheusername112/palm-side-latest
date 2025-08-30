import { cookies } from 'next/headers'
import { PasswordAuthManager } from '../../../../lib/password-auth.js'
import { neon } from '@neondatabase/serverless'

export async function PUT(request) {
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

    // Get request body
    const body = await request.json()
    const { firstName, lastName, email } = body

    // Validate input
    if (!firstName || !lastName || !email) {
      return new Response('Missing required fields', { status: 400 })
    }

    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return new Response(
        'First and last names must be at least 2 characters long',
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response('Invalid email format', { status: 400 })
    }

    // Update admin credentials in database
    const db = neon(process.env.DATABASE_URL)
    await db`
      UPDATE admin_users SET 
        first_name = ${firstName.trim()},
        last_name = ${lastName.trim()},
        email = ${email.trim().toLowerCase()},
        updated_at = ${new Date()}
      WHERE id = ${sessionData.adminId}
    `

    // Log the activity
    await PasswordAuthManager.logActivity(
      sessionData.adminId,
      'credentials_updated',
      {
        ipAddress:
          request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        changes: { firstName, lastName, email },
      }
    )

    return Response.json({
      success: true,
      message: 'Credentials updated successfully',
      admin: {
        id: sessionData.adminId,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
      },
    })
  } catch (error) {
    console.error('Error updating admin credentials:', error)

    if (error.message.includes('Email is already in use')) {
      return new Response('Email is already in use by another admin', {
        status: 409,
      })
    }

    return new Response('Internal server error', { status: 500 })
  }
}
