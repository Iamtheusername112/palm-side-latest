import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  AdminUserManager,
  AdminSessionManager,
  AdminSecurity,
} from './admin-db.js'

// Session management
export async function createSession(userData, request) {
  try {
    // Check if admin exists in database
    let admin = await AdminUserManager.getAdminByKindeId(userData.id)

    if (!admin) {
      // Create first admin user if none exists
      admin = await AdminUserManager.createFirstAdmin(userData)
    } else {
      // Check if account is locked
      if (await AdminSecurity.isAccountLocked(admin.id)) {
        throw new Error(
          'Account is temporarily locked due to multiple failed login attempts'
        )
      }

      // Update admin info if changed
      if (
        admin.email !== userData.email ||
        admin.firstName !== userData.firstName ||
        admin.lastName !== userData.lastName
      ) {
        admin = await AdminUserManager.updateAdmin(admin.id, {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
        })
      }
    }

    // Create database session
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    const session = await AdminSessionManager.createSession(
      admin.id,
      ipAddress,
      userAgent
    )

    // Record successful login
    await AdminUserManager.recordLogin(admin.id, ipAddress, userAgent)

    // Set session cookie
    const sessionData = {
      sessionToken: session.sessionToken,
      adminId: admin.id,
      expires: session.expiresAt.toISOString(),
    }

    const cookieStore = await cookies()
    cookieStore.set('admin_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return { session, admin }
  } catch (error) {
    console.error('Session creation error:', error)
    throw error
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie) {
      return null
    }

    const sessionData = JSON.parse(sessionCookie.value)

    // Validate session in database
    const dbSession = await AdminSessionManager.validateSession(
      sessionData.sessionToken
    )

    if (!dbSession) {
      await destroySession()
      return null
    }

    return {
      session: dbSession.session,
      admin: dbSession.admin,
      expires: sessionData.expires,
    }
  } catch (error) {
    console.error('Session retrieval error:', error)
    return null
  }
}

export async function destroySession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (sessionCookie) {
      const sessionData = JSON.parse(sessionCookie.value)
      // Invalidate session in database
      await AdminSessionManager.invalidateSession(sessionData.sessionToken)
    }

    cookieStore.delete('admin_session')
  } catch (error) {
    console.error('Session destruction error:', error)
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect('/sign-in')
  }

  return session
}

// Verify Kinde authorization code and exchange for user info
export async function verifyKindeAuth(code) {
  try {
    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      'https://francis.kinde.com/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: 'a3e534627131446f82b8250c4b0eda97',
          client_secret: 'ChqDSvd49pGqk8DYXP9rOV2aospGuSxCBZlDHZzpCe1B47hHHzG',
          code: code,
          redirect_uri: 'http://localhost:3000/api/auth/kinde_callback',
        }),
      }
    )

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for token')
    }

    const tokenData = await tokenResponse.json()

    // Get user profile using access token
    const userResponse = await fetch(
      'https://francis.kinde.com/oauth2/v2/user_profile',
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    )

    if (!userResponse.ok) {
      throw new Error('Failed to get user profile')
    }

    const userData = await userResponse.json()

    return {
      id: userData.id,
      email: userData.email,
      firstName: userData.given_name,
      lastName: userData.family_name,
      picture: userData.picture,
    }
  } catch (error) {
    console.error('Kinde verification error:', error)
    throw error
  }
}
