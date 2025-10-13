# 🔐 Environment Variables Setup

This document explains all environment variables needed for the Palmside app.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Database Configuration (Required)
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"

# Admin Authentication (Required)
ADMIN_EMAIL="super-admin@palmside.es"
ADMIN_PASSWORD="your-secure-password-here"
```

---

## Environment File Template

Copy this template to create your `.env.local`:

```env
# ===========================================
# PALMSIDE APP ENVIRONMENT VARIABLES
# ===========================================

# Database Configuration
# Get this from your Neon/PostgreSQL dashboard
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"

# Admin Authentication
# Used for admin login at /admin-auth/login
ADMIN_EMAIL="super-admin@palmside.es"
ADMIN_PASSWORD="YourSecurePassword123!"

# Next.js Configuration (Optional)
# NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## Setup Instructions

### 1. Create Environment File

```bash
# Create .env.local in the root directory
touch .env.local
```

### 2. Add Your Credentials

Edit `.env.local` and add your actual values:
- Replace `DATABASE_URL` with your database connection string
- Set a strong `ADMIN_PASSWORD` (minimum 8 characters)

### 3. Run Admin Setup

```bash
# This creates your admin user in the database
node setup-admin.js
```

### 4. Start Development Server

```bash
npm run dev
```

---

## Security Notes

✅ **DO:**
- Keep `.env.local` private and NEVER commit it to Git
- Use strong passwords (12+ characters recommended)
- Use different credentials for production
- Enable SSL/TLS for database connections in production

❌ **DON'T:**
- Commit `.env.local` to version control
- Share credentials in plain text
- Use weak passwords
- Hardcode credentials in source code

---

## Production Deployment

For production (Vercel, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Update `DATABASE_URL` to your production database
3. Use a strong unique `ADMIN_PASSWORD`
4. Set `NEXT_PUBLIC_APP_URL` to your production domain

---

## Troubleshooting

**Can't login?**
- Verify `ADMIN_EMAIL` matches what you set
- Check that `setup-admin.js` ran successfully
- Try resetting your password

**Database connection error?**
- Verify your `DATABASE_URL` is correct
- Check that your database is running
- Ensure SSL mode is configured properly

---

## File Locations

- Environment file: `.env.local` (in root directory)
- Admin setup script: `setup-admin.js`
- Password manager: `lib/password-auth.js`

