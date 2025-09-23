import bcrypt from 'bcryptjs'
import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'

// Load environment variables when this module is imported
config({ path: '.env.local', quiet: true })

// Create the database connection function
const createDb = () => neon(process.env.DATABASE_URL)

export class PasswordAuthManager {
  // Create the first admin user with password
  static async createFirstAdmin(email, firstName, lastName, password) {
    try {
      const db = createDb()

      // Check if admin already exists
      const existingAdmin = await db`
        SELECT id FROM admin_users WHERE role = 'super_admin' LIMIT 1
      `

      if (existingAdmin.length > 0) {
        throw new Error('Admin user already exists')
      }

      // Hash password
      const saltRounds = 12
      const passwordHash = await bcrypt.hash(password, saltRounds)

      // Set password expiration to 30 days from now
      const passwordExpiresAt = new Date()
      passwordExpiresAt.setDate(passwordExpiresAt.getDate() + 30)

      // Create admin user
      const admin = await db`
        INSERT INTO admin_users (
          email, first_name, last_name, role, password_hash, 
          password_changed_at, password_expires_at, force_password_change, 
          is_active, created_at, updated_at
        ) VALUES (
          ${email}, ${firstName}, ${lastName}, 'super_admin', ${passwordHash},
          ${new Date()}, ${passwordExpiresAt}, false, true, ${new Date()}, ${new Date()}
        ) RETURNING id, email, first_name, last_name, role, password_expires_at, force_password_change
      `

      return admin[0]
    } catch (error) {
      console.error('Error creating first admin:', error)
      throw error
    }
  }

  // Authenticate admin with email and password
  static async authenticateAdmin(email, password) {
    try {
      const db = createDb()

      // Find admin by email
      const [admin] = await db`
        SELECT * FROM admin_users WHERE email = ${email} LIMIT 1
      `

      if (!admin) {
        return { success: false, error: 'Invalid credentials' }
      }

      if (!admin.is_active) {
        return { success: false, error: 'Account is deactivated' }
      }

      // Check if account is locked
      if (admin.locked_until && new Date() < admin.locked_until) {
        return { success: false, error: 'Account is temporarily locked' }
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(
        password,
        admin.password_hash
      )
      if (!isPasswordValid) {
        // Increment login attempts
        await this.incrementLoginAttempts(admin.id)
        return { success: false, error: 'Invalid credentials' }
      }

      // Check if password has expired
      if (admin.password_expires_at && new Date() > admin.password_expires_at) {
        return {
          success: false,
          error: 'Password has expired. Please change your password.',
          forcePasswordChange: true,
        }
      }

      // Reset login attempts on successful login
      await this.resetLoginAttempts(admin.id)

      // Update last login
      await db`
        UPDATE admin_users SET last_login_at = ${new Date()} WHERE id = ${
        admin.id
      }
      `

      // Log successful login
      await this.logActivity(admin.id, 'login_success', {
        ipAddress: 'unknown',
        userAgent: 'unknown',
      })

      return { success: true, admin }
    } catch (error) {
      console.error('Error authenticating admin:', error)
      return { success: false, error: 'Authentication failed' }
    }
  }

  // Change admin password
  static async changePassword(adminId, currentPassword, newPassword) {
    try {
      const db = createDb()

      // Get admin
      const [admin] = await db`
        SELECT * FROM admin_users WHERE id = ${adminId} LIMIT 1
      `

      if (!admin) {
        return { success: false, error: 'Admin not found' }
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        admin.password_hash
      )
      if (!isCurrentPasswordValid) {
        return { success: false, error: 'Current password is incorrect' }
      }

      // Hash new password
      const saltRounds = 12
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds)

      // Set new password expiration to 30 days from now
      const passwordExpiresAt = new Date()
      passwordExpiresAt.setDate(passwordExpiresAt.getDate() + 30)

      // Update password
      await db`
        UPDATE admin_users SET 
          password_hash = ${newPasswordHash},
          password_changed_at = ${new Date()},
          password_expires_at = ${passwordExpiresAt},
          force_password_change = false,
          updated_at = ${new Date()}
        WHERE id = ${adminId}
      `

      // Log password change
      await this.logActivity(admin.id, 'password_changed', {
        ipAddress: 'unknown',
        userAgent: 'unknown',
      })

      return { success: true, message: 'Password changed successfully' }
    } catch (error) {
      console.error('Error changing password:', error)
      return { success: false, error: 'Failed to change password' }
    }
  }

  // Create session for authenticated admin
  static async createSession(adminId, ipAddress, userAgent) {
    try {
      const db = createDb()
      const sessionToken = this.generateSessionToken()
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 24) // 24 hour session

      const [session] = await db`
        INSERT INTO admin_sessions (
          admin_user_id, session_token, expires_at, ip_address, user_agent, is_active, created_at
        ) VALUES (
          ${adminId}, ${sessionToken}, ${expiresAt}, ${ipAddress}, ${userAgent}, true, ${new Date()}
        ) RETURNING id, session_token, expires_at
      `

      return session
    } catch (error) {
      console.error('Error creating session:', error)
      throw error
    }
  }

  // Validate session
  static async validateSession(sessionToken) {
    try {
      const db = createDb()

      const [session] = await db`
        SELECT * FROM admin_sessions 
        WHERE session_token = ${sessionToken} 
        AND is_active = true 
        AND expires_at > ${new Date()}
        LIMIT 1
      `

      if (!session) {
        return null
      }

      // Get admin user
      const [admin] = await db`
        SELECT * FROM admin_users WHERE id = ${session.admin_user_id} LIMIT 1
      `

      return admin
    } catch (error) {
      console.error('Error validating session:', error)
      return null
    }
  }

  // Destroy session
  static async destroySession(sessionToken) {
    try {
      const db = createDb()
      await db`
        UPDATE admin_sessions SET is_active = false WHERE session_token = ${sessionToken}
      `
    } catch (error) {
      console.error('Error destroying session:', error)
    }
  }

  // Helper methods
  static async incrementLoginAttempts(adminId) {
    try {
      const db = createDb()

      const [admin] = await db`
        SELECT login_attempts FROM admin_users WHERE id = ${adminId} LIMIT 1
      `

      if (admin.login_attempts >= 4) {
        // Lock account for 15 minutes after 5 failed attempts
        const lockedUntil = new Date()
        lockedUntil.setMinutes(lockedUntil.getMinutes() + 15)

        await db`
          UPDATE admin_users SET login_attempts = 0, locked_until = ${lockedUntil} WHERE id = ${adminId}
        `
      } else {
        await db`
          UPDATE admin_users SET login_attempts = ${
            admin.login_attempts + 1
          } WHERE id = ${adminId}
        `
      }
    } catch (error) {
      console.error('Error incrementing login attempts:', error)
    }
  }

  static async resetLoginAttempts(adminId) {
    try {
      const db = createDb()
      await db`
        UPDATE admin_users SET login_attempts = 0, locked_until = NULL WHERE id = ${adminId}
      `
    } catch (error) {
      console.error('Error resetting login attempts:', error)
    }
  }

  static async logActivity(adminId, action, details) {
    try {
      const db = createDb()
      await db`
        INSERT INTO admin_activity_logs (
          admin_user_id, action, details, ip_address, user_agent, created_at
        ) VALUES (
          ${adminId}, ${action}, ${JSON.stringify(details)}, ${
        details.ipAddress
      }, ${details.userAgent}, ${new Date()}
        )
      `
    } catch (error) {
      console.error('Error logging activity:', error)
    }
  }

  static generateSessionToken() {
    return crypto.randomUUID()
  }
}
