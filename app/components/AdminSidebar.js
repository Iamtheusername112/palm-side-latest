'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useContactContext } from '../contexts/ContactContext'
import {
  LayoutDashboard,
  Building2,
  Users,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Plus,
  FileText,
  Calendar,
  Target,
  Shield,
  Database,
  Activity,
  PieChart,
  LineChart,
  Globe,
  Zap,
} from 'lucide-react'

const AdminSidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { newContactsCount, isLoading } = useContactContext()

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin',
    },
    {
      name: 'Properties',
      href: '/admin/properties',
      icon: Building2,
      current: pathname === '/admin/properties',
    },
    {
      name: 'Contacts',
      href: '/admin/contacts',
      icon: Mail,
      current: pathname === '/admin/contacts',
      badge: newContactsCount > 0 ? newContactsCount.toString() : null,
    },
    {
      name: 'Clients',
      href: '/admin/clients',
      icon: Users,
      current: pathname === '/admin/clients',
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      current: pathname === '/admin/analytics',
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: pathname === '/admin/settings',
    },
  ]

  const quickActions = [
    {
      name: 'Add Property',
      href: '/admin/properties',
      icon: Plus,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'View Reports',
      href: '/admin/analytics',
      icon: FileText,
      color: 'bg-green-600 hover:bg-green-700',
    },
  ]

  const handleSignOut = async () => {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' })
      if (response.ok) {
        router.push('/admin-auth/login')
      } else {
        router.push('/admin-auth/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
      router.push('/admin-auth/login')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div
      className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className='flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800'>
        {!isCollapsed && (
          <div className='flex items-center'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center'>
              <span className='text-white font-bold text-sm'>P</span>
            </div>
            <span className='ml-3 text-lg font-bold text-gray-900 dark:text-gray-100'>
              Palmside
            </span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
        >
          {isCollapsed ? (
            <ChevronRight className='h-4 w-4 text-gray-600' />
          ) : (
            <ChevronLeft className='h-4 w-4 text-gray-600' />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex-1 px-2 py-4 space-y-1'>
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                item.current
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  item.current
                    ? 'text-blue-700'
                    : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500'
                }`}
              />
              {!isCollapsed && (
                <>
                  <span className='flex-1'>{item.name}</span>
                  {item.badge && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 ${
                        isLoading ? 'animate-pulse' : ''
                      }`}
                    >
                      {isLoading ? '...' : item.badge}
                    </span>
                  )}
                </>
              )}
            </a>
          )
        })}
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className='px-3 py-4 border-t border-gray-200 dark:border-gray-800'>
          <h3 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>
            Quick Actions
          </h3>
          <div className='space-y-2'>
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.name}
                  onClick={() => router.push(action.href)}
                  className={`w-full ${action.color} text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center`}
                >
                  <Icon className='h-4 w-4 mr-2' />
                  {action.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className='p-3 border-t border-gray-200 dark:border-gray-800'>
        <button
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className={`w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className='h-5 w-5 text-gray-400 mr-3' />
          {!isCollapsed && (
            <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar
