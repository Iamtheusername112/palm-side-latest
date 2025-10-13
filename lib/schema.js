import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  timestamp,
  boolean,
  json,
  decimal,
} from 'drizzle-orm/pg-core'

// Admin users table
export const adminUsers = pgTable('admin_users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  picture: varchar('picture', { length: 500 }),
  phone: varchar('phone', { length: 20 }),
  role: varchar('role', { length: 50 }).default('admin').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Contact form submissions table
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  subject: varchar('subject', { length: 255 }).notNull(),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('new').notNull(), // new, read, responded, closed
  priority: varchar('priority', { length: 20 }).default('normal'), // low, normal, high, urgent
  source: varchar('source', { length: 50 }).default('website'), // website, phone, email, etc.
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  adminNotes: text('admin_notes'),
  respondedAt: timestamp('responded_at'),
  respondedBy: integer('responded_by').references(() => adminUsers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Properties table
export const properties = pgTable('properties', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  price: decimal('price', { precision: 15, scale: 2 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  propertyType: varchar('property_type', { length: 100 }), // Luxury Homes, Investment Properties, etc.
  status: varchar('status', { length: 50 }).default('For Sale').notNull(), // For Sale, For Lease, Sold, Leased, etc.
  bedrooms: integer('bedrooms'),
  bathrooms: integer('bathrooms'),
  squareFeet: integer('square_feet'),
  lotSize: integer('lot_size'),
  yearBuilt: integer('year_built'),
  plotSizeM2: decimal('plot_size_m2', { precision: 10, scale: 2 }), // Plot size in square meters
  builtAreaM2: decimal('built_area_m2', { precision: 10, scale: 2 }), // Built area in square meters
  livingSpaceM2: decimal('living_space_m2', { precision: 10, scale: 2 }), // Living space in square meters
  features: json('features'), // Array of features like ["Pool", "Garden", "Garage"]
  images: json('images'), // Array of image URLs
  mainImage: varchar('main_image', { length: 500 }),
  isFeatured: boolean('is_featured').default(false),
  isActive: boolean('is_active').default(true),
  views: integer('views').default(0),
  favorites: integer('favorites').default(0),
  contactCount: integer('contact_count').default(0),
  coordinates: json('coordinates'), // {lat: number, lng: number}
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  zipCode: varchar('zip_code', { length: 20 }),
  country: varchar('country', { length: 100 }).default('USA'),
  adminNotes: text('admin_notes'), // Notes for status changes and admin actions
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Clients table
export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  company: varchar('company', { length: 255 }),
  position: varchar('position', { length: 100 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  zipCode: varchar('zip_code', { length: 20 }),
  country: varchar('country', { length: 100 }).default('USA'),
  notes: text('notes'),
  status: varchar('status', { length: 50 }).default('active').notNull(), // active, inactive, lead, customer
  source: varchar('source', { length: 50 }).default('website'), // website, referral, cold call, etc.
  assignedTo: integer('assigned_to').references(() => adminUsers.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
