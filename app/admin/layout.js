import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PasswordAuthManager } from '../../lib/password-auth.js'

export default async function AdminLayout({ children }) {
  // Check for admin session cookie
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')

  // If no session, redirect to admin auth login
  if (!adminSession) {
    redirect('/admin-auth/login')
  }

  try {
    const sessionData = JSON.parse(adminSession.value)

    if (!sessionData.adminId || !sessionData.sessionToken) {
      redirect('/admin-auth/login')
    }

    // Validate session with database
    const admin = await PasswordAuthManager.validateSession(
      sessionData.sessionToken
    )

    if (!admin) {
      redirect('/admin-auth/login')
    }

    // Session is valid, render admin layout
    return <div className='admin-layout'>{children}</div>
  } catch (error) {
    console.error('Error validating admin session:', error)
    redirect('/admin-auth/login')
  }
}
