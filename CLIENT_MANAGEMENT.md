# Client Management System

This document explains the client management functionality in the admin interface.

## Overview

The client management system allows admins to:

- Add new clients with comprehensive information
- View and search existing clients
- Edit client information
- Delete clients
- Filter clients by status and source

## Features

### 1. Add New Client

**Access**: Click the "Add Client" button in the admin clients page

**Required Fields**:

- First Name
- Last Name
- Email Address

**Optional Fields**:

- Phone Number
- Company
- Position/Job Title
- Address Information (Street, City, State, ZIP, Country)
- Notes
- Status (Active, Inactive, Lead, Customer, Prospect)
- Source (Website, Referral, Cold Call, Social Media, Advertising, Event, Other)

### 2. Client List View

**Features**:

- Paginated list of all clients
- Search by name, email, or company
- Filter by status and source
- Sort by creation date (newest first)
- View client details in modal

**Displayed Information**:

- Client name and contact info
- Source and status badges
- Company and position
- Location
- Creation date

### 3. Client Actions

**Available Actions**:

- **View**: See detailed client information
- **Edit**: Modify client information
- **Delete**: Remove client (with confirmation)

### 4. Client Statuses

- **Active**: Currently engaged clients
- **Inactive**: Dormant clients
- **Lead**: Potential clients
- **Customer**: Confirmed clients
- **Prospect**: Qualified leads

### 5. Client Sources

- **Website**: Found through website
- **Referral**: Referred by existing clients
- **Cold Call**: Contacted directly
- **Social Media**: Found through social platforms
- **Advertising**: Responded to ads
- **Event**: Met at events
- **Other**: Other sources

## API Endpoints

### GET /api/admin/clients

Retrieve clients with optional filtering and pagination.

**Query Parameters**:

- `status`: Filter by client status
- `source`: Filter by client source
- `search`: Search by name, email, or company
- `page`: Page number for pagination
- `limit`: Number of clients per page

### POST /api/admin/clients

Create a new client.

**Required Body Fields**:

- `firstName`: Client's first name
- `lastName`: Client's last name
- `email`: Client's email address

**Optional Body Fields**:

- `phone`, `company`, `position`, `address`, `city`, `state`, `zipCode`, `country`, `notes`, `status`, `source`

### PATCH /api/admin/clients

Update an existing client.

**Required Body Fields**:

- `id`: Client ID to update

**Optional Body Fields**:

- Any client field to update

### DELETE /api/admin/clients?id={clientId}

Delete a client by ID.

## Database Schema

The clients table includes the following fields:

```sql
CREATE TABLE "clients" (
  "id" serial PRIMARY KEY,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "email" varchar(255) NOT NULL UNIQUE,
  "phone" varchar(20),
  "company" varchar(255),
  "position" varchar(100),
  "address" text,
  "city" varchar(100),
  "state" varchar(100),
  "zip_code" varchar(20),
  "country" varchar(100) DEFAULT 'USA',
  "notes" text,
  "status" varchar(50) DEFAULT 'active' NOT NULL,
  "source" varchar(50) DEFAULT 'website',
  "assigned_to" integer REFERENCES admin_users(id),
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);
```

## Files Structure

- `app/api/admin/clients/route.js` - API endpoints for client management
- `app/components/ClientForm.js` - Client form component for adding/editing
- `app/admin/clients/page.js` - Admin clients page with list and management
- `lib/schema.js` - Database schema definition
- `migrations/update_clients_schema.sql` - Database migration for client fields

## Usage Examples

### Adding a New Client

1. Navigate to Admin → Clients
2. Click "Add Client" button
3. Fill in the required fields (First Name, Last Name, Email)
4. Optionally fill in additional information
5. Select appropriate status and source
6. Click "Create Client"

### Editing a Client

1. Find the client in the list
2. Click the edit (pencil) icon
3. Modify the desired fields
4. Click "Update Client"

### Searching and Filtering

1. Use the search box to find clients by name, email, or company
2. Use the status dropdown to filter by client status
3. Use the source dropdown to filter by client source
4. Click "Apply Filters" to update the results

## Error Handling

The system includes comprehensive error handling:

- **Validation**: Required fields are validated before submission
- **Duplicate Email**: Prevents duplicate email addresses
- **Network Errors**: Graceful handling of connection issues
- **User Feedback**: Toast notifications for success/error states

## Security

- All API endpoints require admin authentication
- Input validation and sanitization
- SQL injection protection through parameterized queries
- Email uniqueness constraints

## Testing

Use the provided test script to verify API functionality:

```bash
node test-clients.js
```

This will test all CRUD operations for the client management system.
