import { cookies } from 'next/headers'
import { PasswordAuthManager } from '../../../../lib/password-auth.js'

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

    const body = await request.json()
    const { currentPassword, newPassword } = body

    if (!currentPassword || !newPassword) {
      return new Response('Missing required fields', { status: 400 })
    }

    if (newPassword.length < 8) {
      return new Response('New password must be at least 8 characters long', {
        status: 400,
      })
    }

    // Use the new PasswordAuthManager to change password
    const result = await PasswordAuthManager.changePassword(
      sessionData.adminId,
      currentPassword,
      newPassword
    )

    if (result.success) {
      return Response.json({
        success: true,
        message: result.message,
      })
    } else {
      return Response.json(
        {
          success: false,
          message: result.error,
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error in change password route:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
