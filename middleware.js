import { NextResponse } from 'next/server'

export function middleware(request) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session')

    if (!adminSession) {
      // Redirect to sign-in if no session
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    try {
      // Verify session is valid (basic check)
      const sessionData = JSON.parse(adminSession.value)
      if (!sessionData.user || !sessionData.expires) {
        throw new Error('Invalid session data')
      }

      // Check if session has expired
      if (new Date(sessionData.expires) < new Date()) {
        // Clear expired session and redirect
        const response = NextResponse.redirect(new URL('/sign-in', request.url))
        response.cookies.delete('admin_session')
        return response
      }

      // Session is valid, allow access
      return NextResponse.next()
    } catch (error) {
      // Invalid session, redirect to sign-in
      const response = NextResponse.redirect(new URL('/sign-in', request.url))
      response.cookies.delete('admin_session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
