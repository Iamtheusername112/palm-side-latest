import { createSession, verifyKindeAuth } from '../../../../lib/auth.js'

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return new Response('Missing authorization code', { status: 400 })
  }

  try {
    // Verify the authorization code with Kinde and get user data
    const userData = await verifyKindeAuth(code)

    // Create a secure session for the authenticated user
    await createSession(userData)

    // Redirect to admin dashboard after successful authentication
    return Response.redirect(new URL('/admin', request.url))
  } catch (error) {
    console.error('Kinde callback error:', error)

    // Redirect to sign-in page with error
    const signInUrl = new URL('/sign-in', request.url)
    signInUrl.searchParams.set(
      'error',
      'Authentication failed. Please try again.'
    )
    return Response.redirect(signInUrl)
  }
}
