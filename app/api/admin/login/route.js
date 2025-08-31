import { PasswordAuthManager } from '../../../../lib/password-auth.js'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return new Response('Missing email or password', { status: 400 })
    }

    // Authenticate admin
    const authResult = await PasswordAuthManager.authenticateAdmin(
      email,
      password
    )

    if (!authResult.success) {
      return Response.json({ error: authResult.error }, { status: 401 })
    }

    const { admin } = authResult

    // Create session
    const session = await PasswordAuthManager.createSession(
      admin.id,
      request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      request.headers.get('user-agent') || 'unknown'
    )

    // Set session cookie
    const cookieStore = await cookies()
    cookieStore.set(
      'admin_session',
      JSON.stringify({
        adminId: admin.id,
        email: admin.email,
        firstName: admin.first_name,
        lastName: admin.last_name,
        role: admin.role,
        sessionToken: session.session_token,
        expires: new Date(session.expires_at).toISOString(),
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/',
      }
    )

    return Response.json({
      success: true,
      message: 'Login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        firstName: admin.first_name,
        lastName: admin.last_name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Error in admin login route:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
