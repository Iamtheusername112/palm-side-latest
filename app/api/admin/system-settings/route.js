import { cookies } from 'next/headers'
import { PasswordAuthManager } from '../../../../lib/password-auth.js'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const createDb = () => neon(process.env.DATABASE_URL)

export async function GET(request) {
  try {
    // Verify authentication using session cookie
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
      return new Response('Unauthorized', { status: 401 })
    }

    let sessionData
    try {
      sessionData = JSON.parse(adminSession.value)

      if (!sessionData.adminId || !sessionData.sessionToken) {
        return new Response('Invalid session', { status: 401 })
      }

      // Validate session with database
      const admin = await PasswordAuthManager.validateSession(
        sessionData.sessionToken
      )

      if (!admin) {
        return new Response('Session expired', { status: 401 })
      }
    } catch (error) {
      return new Response('Invalid session data', { status: 401 })
    }

    const db = createDb()

    // Get system settings for the admin
    const [settings] = await db`
      SELECT * FROM admin_system_settings 
      WHERE admin_id = ${sessionData.adminId}
    `

    // If no settings exist, return default settings
    if (!settings) {
      const defaultSettings = {
        timezone: 'America/New_York',
        dateFormat: 'MM/DD/YYYY',
        language: 'en',
        autoBackup: true,
        analyticsTracking: true,
        debugMode: false,
      }
      return Response.json({ success: true, settings: defaultSettings })
    }

    // Return the settings with proper field names
    const formattedSettings = {
      timezone: settings.timezone,
      dateFormat: settings.date_format,
      language: settings.language,
      autoBackup: settings.auto_backup,
      analyticsTracking: settings.analytics_tracking,
      debugMode: settings.debug_mode,
    }

    return Response.json({ success: true, settings: formattedSettings })
  } catch (error) {
    console.error('Error getting system settings:', error)
    return new Response('Internal server error', { status: 500 })
  }
}

export async function PUT(request) {
  try {
    // Verify authentication using session cookie
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
      return new Response('Unauthorized', { status: 401 })
    }

    let sessionData
    try {
      sessionData = JSON.parse(adminSession.value)

      if (!sessionData.adminId || !sessionData.sessionToken) {
        return new Response('Invalid session', { status: 401 })
      }

      // Validate session with database
      const admin = await PasswordAuthManager.validateSession(
        sessionData.sessionToken
      )

      if (!admin) {
        return new Response('Session expired', { status: 401 })
      }
    } catch (error) {
      return new Response('Invalid session data', { status: 401 })
    }

    const body = await request.json()
    const {
      timezone,
      dateFormat,
      language,
      autoBackup,
      analyticsTracking,
      debugMode,
    } = body

    // Validate timezone
    const validTimezones = [
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
    ]
    if (!validTimezones.includes(timezone)) {
      return new Response('Invalid timezone', { status: 400 })
    }

    // Validate date format
    const validDateFormats = ['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD']
    if (!validDateFormats.includes(dateFormat)) {
      return new Response('Invalid date format', { status: 400 })
    }

    // Validate language
    const validLanguages = ['en', 'es', 'fr']
    if (!validLanguages.includes(language)) {
      return new Response('Invalid language', { status: 400 })
    }

    const db = createDb()

    // Check if settings already exist
    const [existingSettings] = await db`
      SELECT id FROM admin_system_settings 
      WHERE admin_id = ${sessionData.adminId}
    `

    if (existingSettings) {
      // Update existing settings
      await db`
        UPDATE admin_system_settings SET
          timezone = ${timezone},
          date_format = ${dateFormat},
          language = ${language},
          auto_backup = ${autoBackup},
          analytics_tracking = ${analyticsTracking},
          debug_mode = ${debugMode},
          updated_at = ${new Date()}
        WHERE admin_id = ${sessionData.adminId}
      `
    } else {
      // Create new settings
      await db`
        INSERT INTO admin_system_settings (
          admin_id, timezone, date_format, language, 
          auto_backup, analytics_tracking, debug_mode, 
          created_at, updated_at
        ) VALUES (
          ${sessionData.adminId}, ${timezone}, ${dateFormat}, ${language},
          ${autoBackup}, ${analyticsTracking}, ${debugMode},
          ${new Date()}, ${new Date()}
        )
      `
    }

    // Log the activity
    await PasswordAuthManager.logActivity(
      sessionData.adminId,
      'system_settings_updated',
      {
        ipAddress:
          request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        changes: {
          timezone,
          dateFormat,
          language,
          autoBackup,
          analyticsTracking,
          debugMode,
        },
      }
    )

    return Response.json({
      success: true,
      message: 'System settings updated successfully',
    })
  } catch (error) {
    console.error('Error updating system settings:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
