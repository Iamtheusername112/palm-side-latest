import { cookies } from 'next/headers'
import { PasswordAuthManager } from '../../../../lib/password-auth.js'

export async function GET(request) {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
      return new Response('Unauthorized', { status: 401 })
    }

    try {
      const sessionData = JSON.parse(adminSession.value)

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

      // Return admin data (without sensitive info)
      return Response.json({
        id: admin.id,
        email: admin.email,
        firstName: admin.first_name,
        lastName: admin.last_name,
        role: admin.role,
        lastLoginAt: admin.last_login_at,
        passwordExpiresAt: admin.password_expires_at,
        forcePasswordChange: admin.force_password_change,
      })
    } catch (error) {
      return new Response('Invalid session data', { status: 401 })
    }
  } catch (error) {
    console.error('Error getting admin data:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
