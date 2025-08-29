import { cookies } from 'next/headers'
import { PasswordAuthManager } from '../../../../lib/password-auth.js'

export async function POST(request) {
  try {
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (adminSession) {
      try {
        const sessionData = JSON.parse(adminSession.value)

        if (sessionData.sessionToken) {
          // Destroy session in database
          await PasswordAuthManager.destroySession(sessionData.sessionToken)
        }
      } catch (error) {
        console.error('Error parsing session data:', error)
      }

      // Clear session cookie
      cookieStore.delete('admin_session')
    }

    return Response.json({
      success: true,
      message: 'Logged out successfully',
      redirectTo: '/admin-auth/login',
    })
  } catch (error) {
    console.error('Error in logout route:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
