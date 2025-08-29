export async function GET(request) {
  try {
    // Redirect to Kinde login
    const kindeLoginUrl = `https://francis.kinde.com/oauth2/auth?client_id=a3e534627131446f82b8250c4b0eda97&redirect_uri=${encodeURIComponent(
      'http://localhost:3000/api/auth/kinde_callback'
    )}&response_type=code&scope=openid profile email&state=random_state_string`

    return Response.redirect(kindeLoginUrl)
  } catch (error) {
    console.error('Kinde login error:', error)
    return new Response('Login failed', { status: 500 })
  }
}
