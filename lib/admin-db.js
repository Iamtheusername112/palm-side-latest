import { db } from './db.js'
import { adminUsers, adminSessions, adminActivityLogs } from './schema.js'
import { eq, and, gte, lte } from 'drizzle-orm'
import crypto from 'crypto'

// Admin user management functions
export class AdminUserManager {
  // Check if admin user exists
  static async adminExists() {
    const result = await db.select({ count: adminUsers.id }).from(adminUsers)
    return result.length > 0
  }

  // Create the first (and only) admin user
  static async createFirstAdmin(userData) {
    const exists = await this.adminExists()
    if (exists) {
      throw new Error('Admin user already exists. Only one admin is allowed.')
    }

    const [admin] = await db
      .insert(adminUsers)
      .values({
        kindeId: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'super_admin',
        isActive: true,
        permissions: {
          canManageProperties: true,
          canManageClients: true,
          canManageAdmin: true,
          canViewReports: true,
          canManageSettings: true,
        },
      })
      .returning()

    return admin
  }

  // Get admin user by Kinde ID
  static async getAdminByKindeId(kindeId) {
    const result = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.kindeId, kindeId))
    return result[0] || null
  }

  // Get admin user by email
  static async getAdminByEmail(email) {
    const result = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
    return result[0] || null
  }

  // Update admin user
  static async updateAdmin(adminId, updateData) {
    const [updated] = await db
      .update(adminUsers)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(adminUsers.id, adminId))
      .returning()

    return updated
  }

  // Update admin credentials (email, name)
  static async updateAdminCredentials(adminId, credentials) {
    // Check if email is already taken by another admin
    if (credentials.email) {
      const existing = await db
        .select()
        .from(adminUsers)
        .where(
          and(
            eq(adminUsers.email, credentials.email),
            eq(adminUsers.id, adminId)
          )
        )

      if (existing.length > 0) {
        throw new Error('Email is already in use by another admin')
      }
    }

    return await this.updateAdmin(adminId, credentials)
  }

  // Record admin login
  static async recordLogin(adminId, ipAddress, userAgent) {
    await db
      .update(adminUsers)
      .set({
        lastLoginAt: new Date(),
        loginAttempts: 0,
        lockedUntil: null,
      })
      .where(eq(adminUsers.id, adminId))

    // Log the activity
    await this.logActivity(adminId, 'login', {
      ipAddress,
      userAgent,
      timestamp: new Date(),
    })
  }

  // Log admin activity
  static async logActivity(adminUserId, action, details = {}) {
    await db.insert(adminActivityLogs).values({
      adminUserId,
      action,
      details,
      ipAddress: details.ipAddress,
      userAgent: details.userAgent,
    })
  }
}

// Session management functions
export class AdminSessionManager {
  // Create new session
  static async createSession(adminUserId, ipAddress, userAgent) {
    const sessionToken = crypto.randomBytes(32).toString('hex')
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    const [session] = await db
      .insert(adminSessions)
      .values({
        adminUserId,
        sessionToken,
        expiresAt,
        ipAddress,
        userAgent,
      })
      .returning()

    return session
  }

  // Validate session
  static async validateSession(sessionToken) {
    const result = await db
      .select({
        session: adminSessions,
        admin: adminUsers,
      })
      .from(adminSessions)
      .innerJoin(adminUsers, eq(adminSessions.adminUserId, adminUsers.id))
      .where(
        and(
          eq(adminSessions.sessionToken, sessionToken),
          eq(adminSessions.isActive, true),
          gte(adminSessions.expiresAt, new Date())
        )
      )

    return result[0] || null
  }

  // Invalidate session
  static async invalidateSession(sessionToken) {
    await db
      .update(adminSessions)
      .set({ isActive: false })
      .where(eq(adminSessions.sessionToken, sessionToken))
  }

  // Clean up expired sessions
  static async cleanupExpiredSessions() {
    await db
      .update(adminSessions)
      .set({ isActive: false })
      .where(lte(adminSessions.expiresAt, new Date()))
  }
}

// Security utilities
export class AdminSecurity {
  // Check if admin account is locked
  static async isAccountLocked(adminId) {
    const admin = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, adminId))
    if (!admin[0]) return false

    const { lockedUntil } = admin[0]
    if (!lockedUntil) return false

    return new Date() < lockedUntil
  }

  // Increment failed login attempts
  static async incrementFailedAttempts(adminId) {
    const admin = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.id, adminId))
    if (!admin[0]) return

    const { loginAttempts } = admin[0]
    const newAttempts = loginAttempts + 1

    let lockedUntil = null
    if (newAttempts >= 5) {
      // Lock account for 15 minutes after 5 failed attempts
      lockedUntil = new Date(Date.now() + 15 * 60 * 1000)
    }

    await db
      .update(adminUsers)
      .set({
        loginAttempts: newAttempts,
        lockedUntil,
      })
      .where(eq(adminUsers.id, adminId))
  }
}
