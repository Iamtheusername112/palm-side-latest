import { cookies } from 'next/headers'
import { PasswordAuthManager } from '../../../../lib/password-auth.js'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local', quiet: true })

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

    // Get notification settings for the admin
    const [settings] = await db`
      SELECT * FROM admin_notification_settings 
      WHERE admin_id = ${sessionData.adminId}
    `

    // If no settings exist, return default settings
    if (!settings) {
      const defaultSettings = {
        emailNotifications: true,
        smsNotifications: false,
        newContactAlerts: true,
        propertyUpdates: true,
        systemAlerts: true,
        marketingEmails: false,
      }
      return Response.json({ success: true, settings: defaultSettings })
    }

    // Return the settings with proper field names
    const formattedSettings = {
      emailNotifications: settings.email_notifications,
      smsNotifications: settings.sms_notifications,
      newContactAlerts: settings.new_contact_alerts,
      propertyUpdates: settings.property_updates,
      systemAlerts: settings.system_alerts,
      marketingEmails: settings.marketing_emails,
    }

    return Response.json({ success: true, settings: formattedSettings })
  } catch (error) {
    console.error('Error getting notification settings:', error)
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
      emailNotifications,
      smsNotifications,
      newContactAlerts,
      propertyUpdates,
      systemAlerts,
      marketingEmails,
    } = body

    const db = createDb()

    // Check if settings already exist
    const [existingSettings] = await db`
      SELECT id FROM admin_notification_settings 
      WHERE admin_id = ${sessionData.adminId}
    `

    if (existingSettings) {
      // Update existing settings
      await db`
        UPDATE admin_notification_settings SET
          email_notifications = ${emailNotifications},
          sms_notifications = ${smsNotifications},
          new_contact_alerts = ${newContactAlerts},
          property_updates = ${propertyUpdates},
          system_alerts = ${systemAlerts},
          marketing_emails = ${marketingEmails},
          updated_at = ${new Date()}
        WHERE admin_id = ${sessionData.adminId}
      `
    } else {
      // Create new settings
      await db`
        INSERT INTO admin_notification_settings (
          admin_id, email_notifications, sms_notifications, 
          new_contact_alerts, property_updates, system_alerts, 
          marketing_emails, created_at, updated_at
        ) VALUES (
          ${sessionData.adminId}, ${emailNotifications}, ${smsNotifications},
          ${newContactAlerts}, ${propertyUpdates}, ${systemAlerts},
          ${marketingEmails}, ${new Date()}, ${new Date()}
        )
      `
    }

    // Log the activity
    await PasswordAuthManager.logActivity(
      sessionData.adminId,
      'notification_settings_updated',
      {
        ipAddress:
          request.headers.get('x-forwarded-for') ||
          request.headers.get('x-real-ip') ||
          'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
        changes: {
          emailNotifications,
          smsNotifications,
          newContactAlerts,
          propertyUpdates,
          systemAlerts,
          marketingEmails,
        },
      }
    )

    return Response.json({
      success: true,
      message: 'Notification settings updated successfully',
    })
  } catch (error) {
    console.error('Error updating notification settings:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
