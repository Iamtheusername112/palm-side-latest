import { getSession } from '../../../../lib/auth.js'

export async function GET(request) {
  try {
    const session = await getSession()

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Return user data (without sensitive session info)
    return Response.json({
      id: session.user.id,
      email: session.user.email,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      picture: session.user.picture,
    })
  } catch (error) {
    console.error('Error getting user data:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
