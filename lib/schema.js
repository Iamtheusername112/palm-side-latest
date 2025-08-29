import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  decimal,
  timestamp,
  boolean,
  json,
  uniqueIndex,
} from 'drizzle-orm/pg-core'

// Properties table
export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 12, scale: 2 }),
  location: varchar('location', { length: 255 }),
  propertyType: varchar('property_type', { length: 100 }),
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  squareFeet: integer('square_feet'),
  images: json('images'),
  status: varchar('status', { length: 50 }).default('active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Clients table
export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  preferences: json('preferences'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Inquiries table
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  propertyId: integer('property_id').references(() => properties.id),
  clientId: integer('client_id').references(() => clients.id),
  message: text('message'),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
})

// Services table
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

// Admin users table - Single admin system
export const adminUsers = pgTable(
  'admin_users',
  {
    id: serial('id').primaryKey(),
    kindeId: varchar('kinde_id', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    role: varchar('role', { length: 50 }).default('super_admin'),
    isActive: boolean('is_active').default(true),
    lastLoginAt: timestamp('last_login_at'),
    loginAttempts: integer('login_attempts').default(0),
    lockedUntil: timestamp('locked_until'),
    permissions: json('permissions'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    // Ensure only one super admin can exist
    singleSuperAdmin: uniqueIndex('single_super_admin').on(table.role),
  })
)

// Admin sessions table for better session management
export const adminSessions = pgTable('admin_sessions', {
  id: serial('id').primaryKey(),
  adminUserId: integer('admin_user_id')
    .references(() => adminUsers.id)
    .notNull(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
})

// Admin activity logs for audit trail
export const adminActivityLogs = pgTable('admin_activity_logs', {
  id: serial('id').primaryKey(),
  adminUserId: integer('admin_user_id').references(() => adminUsers.id),
  action: varchar('action', { length: 255 }).notNull(),
  details: json('details'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
})
