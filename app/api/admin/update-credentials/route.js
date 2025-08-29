import { getSession } from '../../../../lib/auth.js'
import { AdminUserManager } from '../../../../lib/admin-db.js'

export async function PUT(request) {
  try {
    // Verify authentication
    const session = await getSession()
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
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

    // Update admin credentials
    const updatedAdmin = await AdminUserManager.updateAdminCredentials(
      session.admin.id,
      {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
      }
    )

    // Log the activity
    await AdminUserManager.logActivity(
      session.admin.id,
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
        id: updatedAdmin.id,
        firstName: updatedAdmin.firstName,
        lastName: updatedAdmin.lastName,
        email: updatedAdmin.email,
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
