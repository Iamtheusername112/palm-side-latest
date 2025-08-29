// Minimal middleware - Clerk authentication temporarily disabled
export default function middleware(request) {
  // No authentication logic for now
  return
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
