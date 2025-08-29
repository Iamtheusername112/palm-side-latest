import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Session management
export async function createSession(userData) {
  const sessionData = {
    user: userData,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    token: generateSecureToken(),
  }

  // In production, you'd store this in a secure database
  // For now, we'll use encrypted cookies
  const cookieStore = await cookies()
  cookieStore.set('admin_session', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  })

  return sessionData
}

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie) {
      return null
    }

    const session = JSON.parse(sessionCookie.value)

    // Check if session has expired
    if (new Date(session.expires) < new Date()) {
      await destroySession()
      return null
    }

    return session
  } catch (error) {
    console.error('Session retrieval error:', error)
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect('/sign-in')
  }

  return session
}

// Token generation and verification
function generateSecureToken() {
  const crypto = require('crypto')
  return crypto.randomBytes(32).toString('hex')
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
