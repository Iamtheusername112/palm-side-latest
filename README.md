# Palmside Real Estate Admin Dashboard

A modern, secure admin dashboard for real estate management built with Next.js 15 and PostgreSQL.

## 🚀 Features

- **Secure Admin Authentication**: Password-based authentication with session management
- **Real Estate Management**: Properties, clients, inquiries, and services
- **Modern UI**: Beautiful, responsive dashboard built with Tailwind CSS
- **Database Integration**: PostgreSQL with Neon serverless database
- **Security Features**: Password expiration, account lockout, activity logging

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: Custom password-based system with bcrypt
- **Styling**: Tailwind CSS, Lucide React icons

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended)

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Iamtheusername112/palm-side-latest.git
   cd palm-side-latest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy the example environment file
   cp env.example .env.local

   # Edit .env.local with your actual values
   nano .env.local
   ```

4. **Set up the database**

   ```bash
   # Run database migrations
   npm run db:migrate

   # Create the first admin user
   node setup-admin.js
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔐 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"

# Admin Authentication (CHANGE THESE IN PRODUCTION!)
ADMIN_EMAIL="your-admin-email@example.com"
ADMIN_PASSWORD="your-secure-password-here"

# Next.js Configuration
NODE_ENV="development"
```

### ⚠️ Security Notes

- **NEVER commit `.env.local` or `.env` files to version control**
- **Change default admin credentials immediately after setup**
- **Use strong, unique passwords in production**
- **Keep your database URL private**

## 🗄️ Database Setup

1. **Create a PostgreSQL database** (Neon recommended for serverless)
2. **Run migrations**: `npm run db:migrate`
3. **Create admin user**: `node setup-admin.js`

## 👤 Admin Access

After setup, access the admin dashboard at:

- **Login**: `/admin-auth/login`
- **Dashboard**: `/admin`
- **Settings**: `/admin/settings`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

1. Build the project: `npm run build`
2. Set environment variables
3. Deploy the `.next` folder

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard routes
│   ├── admin-auth/        # Admin authentication routes
│   └── api/               # API routes
├── lib/                   # Utility libraries
│   ├── password-auth.js   # Authentication logic
│   └── schema.js          # Database schema
├── drizzle/               # Database migrations
└── public/                # Static assets
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **Session Management**: Secure HTTP-only cookies
- **Account Lockout**: 5 failed attempts = 15 min lockout
- **Password Expiration**: 30-day password rotation
- **Activity Logging**: Audit trail for all admin actions

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot read properties of undefined"**

   - Check that all environment variables are set
   - Verify database connection

2. **"Invalid credentials"**

   - Ensure admin user was created with `setup-admin.js`
   - Check database connection

3. **"Module not found"**
   - Run `npm install` to install dependencies
   - Check Node.js version (18+ required)

## 📝 License

This project is proprietary software. All rights reserved.

## 🤝 Support

For support or questions, please contact the development team.

---

**⚠️ IMPORTANT**: Remember to change the default admin credentials before deploying to production!
