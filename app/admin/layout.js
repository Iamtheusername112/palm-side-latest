import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { PasswordAuthManager } from '../../lib/password-auth.js'
import AdminSidebar from '../components/AdminSidebar.js'
import AccessibilitySettings from '../components/AccessibilitySettings.js'

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

    // Session is valid, render admin layout with sidebar
    return (
      <div className='flex h-screen bg-gray-50 dark:bg-gray-950 dark:text-gray-100'>
        <AdminSidebar />
        <div className='flex-1 flex flex-col overflow-hidden'>{children}</div>
        <AccessibilitySettings />
      </div>
    )
  } catch (error) {
    console.error('Error validating admin session:', error)
    redirect('/admin-auth/login')
  }
}
