export async function GET(request) {
  try {
    // Redirect to Kinde logout
    const kindeLogoutUrl = `https://francis.kinde.com/logout?redirect=${encodeURIComponent(
      'http://localhost:3000'
    )}`

    return Response.redirect(kindeLogoutUrl)
  } catch (error) {
    console.error('Kinde logout error:', error)
    return new Response('Logout failed', { status: 500 })
  }
}
