import { NextResponse } from 'next/server'

export function middleware(request) {
  // Protect admin routes (but not admin-auth routes)
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin-auth')
  ) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session')

    if (!adminSession) {
      // For API routes, return 401 instead of redirecting
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return new Response('Unauthorized', { status: 401 })
      }
      // Redirect to admin auth login if no session (for page routes)
      return NextResponse.redirect(new URL('/admin-auth/login', request.url))
    }

    try {
      // Verify session is valid (basic check)
      const sessionData = JSON.parse(adminSession.value)
      if (
        !sessionData.adminId ||
        !sessionData.expires ||
        !sessionData.sessionToken
      ) {
        throw new Error('Invalid session data')
      }

      // Check if session has expired
      if (new Date(sessionData.expires) < new Date()) {
        // For API routes, return 401 instead of redirecting
        if (request.nextUrl.pathname.startsWith('/api/')) {
          const response = new Response('Unauthorized', { status: 401 })
          response.cookies.delete('admin_session')
          return response
        }
        // Clear expired session and redirect (for page routes)
        const response = NextResponse.redirect(
          new URL('/admin-auth/login', request.url)
        )
        response.cookies.delete('admin_session')
        return response
      }

      // Session is valid, allow access
      return NextResponse.next()
    } catch (error) {
      // For API routes, return 401 instead of redirecting
      if (request.nextUrl.pathname.startsWith('/api/')) {
        const response = new Response('Unauthorized', { status: 401 })
        response.cookies.delete('admin_session')
        return response
      }
      // Invalid session, redirect to admin auth login (for page routes)
      const response = NextResponse.redirect(
        new URL('/admin-auth/login', request.url)
      )
      response.cookies.delete('admin_session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
