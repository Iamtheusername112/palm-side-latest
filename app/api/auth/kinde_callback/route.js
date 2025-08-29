export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  if (!code) {
    return new Response('Missing authorization code', { status: 400 })
  }

  try {
    // For now, we'll just redirect to admin dashboard
    // In production, you'd exchange the code for tokens and verify the user
    console.log('Received authorization code:', code)
    
    // Redirect to admin dashboard after successful authentication
    return Response.redirect(new URL('/admin', request.url))
  } catch (error) {
    console.error('Kinde callback error:', error)
    return new Response('Authentication failed', { status: 500 })
  }
}
