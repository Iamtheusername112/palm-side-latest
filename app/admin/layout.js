import { requireAuth } from '../../lib/auth.js'

export default async function AdminLayout({ children }) {
  // This will redirect to /sign-in if not authenticated
  const session = await requireAuth()

  return (
    <div className='admin-layout'>
      {/* You can add admin-specific layout elements here */}
      {children}
    </div>
  )
}
