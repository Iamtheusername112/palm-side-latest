import { destroySession } from '../../../../lib/auth.js'

export async function GET(request) {
  try {
    // Destroy the current session
    await destroySession()

    // Return success response instead of redirecting
    return Response.json({
      success: true,
      message: 'Logged out successfully',
      logoutUrl: `https://francis.kinde.com/logout?redirect=${encodeURIComponent(
        'http://localhost:3000'
      )}`,
    })
  } catch (error) {
    console.error('Kinde logout error:', error)

    // Return error response
    return Response.json(
      {
        success: false,
        message: 'Logout failed',
      },
      { status: 500 }
    )
  }
}
