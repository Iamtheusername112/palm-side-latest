'use client'

import { useState, useEffect } from 'react'
import {
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  Database,
  Key,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
  })

  const [securityData, setSecurityData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newContactAlerts: true,
    propertyUpdates: true,
    systemAlerts: true,
    marketingEmails: false,
  })

  const [systemSettings, setSystemSettings] = useState({
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
    autoBackup: true,
    analyticsTracking: true,
    debugMode: false,
  })

  useEffect(() => {
    fetchUserData()
    fetchNotificationSettings()
    fetchSystemSettings()
  }, [])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/me')

      if (response.ok) {
        const admin = await response.json()
        setProfileData({
          firstName: admin.firstName || '',
          lastName: admin.lastName || '',
          email: admin.email || '',
          phone: admin.phone || '',
          bio: admin.bio || '',
        })
      } else {
        toast.error('Failed to load profile data')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      toast.error('Failed to load profile data')
    } finally {
      setLoading(false)
    }
  }

  const fetchNotificationSettings = async () => {
    try {
      const response = await fetch('/api/admin/notification-settings')

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setNotificationSettings(result.settings)
        }
      }
    } catch (error) {
      console.error('Error fetching notification settings:', error)
    }
  }

  const fetchSystemSettings = async () => {
    try {
      const response = await fetch('/api/admin/system-settings')

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setSystemSettings(result.settings)
        }
      }
    } catch (error) {
      console.error('Error fetching system settings:', error)
    }
  }

  const handleProfileSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/update-credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Profile updated successfully!')
      } else {
        toast.error('Failed to update profile', {
          description: result.message || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (securityData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    try {
      setSaving(true)
      const response = await fetch('/api/admin/change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: securityData.currentPassword,
          newPassword: securityData.newPassword,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Password changed successfully!')
        setSecurityData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
      } else {
        toast.error('Failed to change password', {
          description: result.message || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error changing password:', error)
      toast.error('Failed to change password', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleNotificationSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/notification-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationSettings),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('Notification settings updated successfully!')
      } else {
        toast.error('Failed to update notification settings', {
          description: result.message || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error updating notification settings:', error)
      toast.error('Failed to update notification settings', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSystemSave = async () => {
    try {
      setSaving(true)
      const response = await fetch('/api/admin/system-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(systemSettings),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success('System settings updated successfully!')
      } else {
        toast.error('Failed to update system settings', {
          description: result.message || 'Please try again.',
        })
      }
    } catch (error) {
      console.error('Error updating system settings:', error)
      toast.error('Failed to update system settings', {
        description: 'Please check your connection and try again.',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto'></div>
          <p className='mt-4 text-gray-600'>Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 flex flex-col overflow-hidden'>
      {/* Header */}
      <header className='bg-white shadow-sm border-b border-gray-200'>
        <div className='px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Settings</h1>
              <p className='text-gray-600 mt-1'>
                Manage your account and system preferences
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex-1 overflow-y-auto bg-gray-50'>
        <div className='px-6 py-6'>
          {/* Settings Tabs */}
          <div className='bg-white rounded-lg shadow-sm border'>
            <div className='border-b border-gray-200'>
              <nav className='flex space-x-8 px-6'>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <User className='h-4 w-4 inline mr-2' />
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'security'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Shield className='h-4 w-4 inline mr-2' />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'notifications'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Bell className='h-4 w-4 inline mr-2' />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('system')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'system'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Settings className='h-4 w-4 inline mr-2' />
                  System
                </button>
              </nav>
            </div>

            <div className='p-6'>
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className='space-y-6'>
                  <h3 className='text-lg font-medium text-gray-900'>
                    Profile Information
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        First Name
                      </label>
                      <input
                        type='text'
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Last Name
                      </label>
                      <input
                        type='text'
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Email
                      </label>
                      <input
                        type='email'
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Phone
                      </label>
                      <input
                        type='tel'
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      rows={4}
                      className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  </div>

                  <div className='flex justify-end'>
                    <button
                      onClick={handleProfileSave}
                      disabled={saving}
                      className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center'
                    >
                      <Save className='h-4 w-4 mr-2' />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className='space-y-6'>
                  <h3 className='text-lg font-medium text-gray-900'>
                    Security Settings
                  </h3>

                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Current Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={securityData.currentPassword}
                          onChange={(e) =>
                            setSecurityData({
                              ...securityData,
                              currentPassword: e.target.value,
                            })
                          }
                          className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-400' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-400' />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        New Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={securityData.newPassword}
                          onChange={(e) =>
                            setSecurityData({
                              ...securityData,
                              newPassword: e.target.value,
                            })
                          }
                          className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        <button
                          type='button'
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        >
                          {showNewPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-400' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-400' />
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Confirm New Password
                      </label>
                      <div className='relative'>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={securityData.confirmPassword}
                          onChange={(e) =>
                            setSecurityData({
                              ...securityData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className='w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        />
                        <button
                          type='button'
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        >
                          {showConfirmPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-400' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-400' />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className='flex justify-end'>
                    <button
                      onClick={handlePasswordChange}
                      disabled={saving}
                      className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center'
                    >
                      <Key className='h-4 w-4 mr-2' />
                      {saving ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className='space-y-6'>
                  <h3 className='text-lg font-medium text-gray-900'>
                    Notification Preferences
                  </h3>

                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Email Notifications
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Receive notifications via email
                        </p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              emailNotifications: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          SMS Notifications
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Receive notifications via SMS
                        </p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              smsNotifications: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          New Contact Alerts
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Get notified when new contacts submit forms
                        </p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.newContactAlerts}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              newContactAlerts: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Property Updates
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Get notified about property status changes
                        </p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={notificationSettings.propertyUpdates}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              propertyUpdates: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className='flex justify-end'>
                    <button
                      onClick={handleNotificationSave}
                      disabled={saving}
                      className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center'
                    >
                      <Save className='h-4 w-4 mr-2' />
                      {saving ? 'Saving...' : 'Save Preferences'}
                    </button>
                  </div>
                </div>
              )}

              {/* System Tab */}
              {activeTab === 'system' && (
                <div className='space-y-6'>
                  <h3 className='text-lg font-medium text-gray-900'>
                    System Preferences
                  </h3>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Timezone
                      </label>
                      <select
                        value={systemSettings.timezone}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            timezone: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      >
                        <option value='America/New_York'>
                          Eastern Time (ET)
                        </option>
                        <option value='America/Chicago'>
                          Central Time (CT)
                        </option>
                        <option value='America/Denver'>
                          Mountain Time (MT)
                        </option>
                        <option value='America/Los_Angeles'>
                          Pacific Time (PT)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Date Format
                      </label>
                      <select
                        value={systemSettings.dateFormat}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            dateFormat: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      >
                        <option value='MM/DD/YYYY'>MM/DD/YYYY</option>
                        <option value='DD/MM/YYYY'>DD/MM/YYYY</option>
                        <option value='YYYY-MM-DD'>YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Language
                      </label>
                      <select
                        value={systemSettings.language}
                        onChange={(e) =>
                          setSystemSettings({
                            ...systemSettings,
                            language: e.target.value,
                          })
                        }
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      >
                        <option value='en'>English</option>
                        <option value='es'>Spanish</option>
                        <option value='fr'>French</option>
                      </select>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Auto Backup
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Automatically backup data daily
                        </p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={systemSettings.autoBackup}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              autoBackup: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Analytics Tracking
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Allow analytics and performance tracking
                        </p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={systemSettings.analyticsTracking}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              analyticsTracking: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <h4 className='text-sm font-medium text-gray-900'>
                          Debug Mode
                        </h4>
                        <p className='text-sm text-gray-500'>
                          Enable debug logging and development features
                        </p>
                      </div>
                      <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={systemSettings.debugMode}
                          onChange={(e) =>
                            setSystemSettings({
                              ...systemSettings,
                              debugMode: e.target.checked,
                            })
                          }
                          className='sr-only peer'
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className='flex justify-end'>
                    <button
                      onClick={handleSystemSave}
                      disabled={saving}
                      className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center'
                    >
                      <Save className='h-4 w-4 mr-2' />
                      {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminSettingsPage
