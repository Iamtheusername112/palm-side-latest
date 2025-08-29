# Palmside Real Estate App

A modern, full-stack real estate application built with Next.js 15, featuring a beautiful frontend and secure admin dashboard.

## Features

### Frontend

- **Modern Navbar** with Palmside logo and navigation links
- **Hero Section** with sliding images and visual storytelling
- **Services Dropdown** with 5 company services
- **Responsive Footer** with contact info and social media links
- **Beautiful UI** built with Tailwind CSS v4

### Backend

- **Secure Authentication** using Clerk for admin access
- **Database Integration** with Neon PostgreSQL and Drizzle ORM
- **Admin Dashboard** with property management capabilities
- **Protected Routes** for admin-only access

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4
- **Authentication**: Clerk
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+
- npm or yarn
- Neon PostgreSQL database account
- Clerk account for authentication

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd latest-palm-side-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here

   # Database
   DATABASE_URL=your_neon_database_url_here
   ```

4. **Set up Clerk Authentication**

   - Go to [clerk.com](https://clerk.com) and create an account
   - Create a new application
   - Copy your publishable key and secret key to `.env.local`
   - Configure your application settings

5. **Set up Neon Database**
   - Go to [neon.tech](https://neon.tech) and create an account
   - Create a new project
   - Copy your database connection string to `.env.local`

## Database Setup

1. **Generate database schema**

   ```bash
   npm run db:generate
   ```

2. **Run migrations**

   ```bash
   npm run db:migrate
   ```

3. **View database in Drizzle Studio** (optional)
   ```bash
   npm run db:studio
   ```

## Running the Application

1. **Development mode**

   ```bash
   npm run dev
   ```

2. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
latest-palm-side-app/
├── app/
│   ├── admin/              # Admin dashboard (protected)
│   ├── components/         # Reusable components
│   │   ├── Navbar.js      # Navigation component
│   │   ├── Hero.js        # Hero section with slides
│   │   └── Footer.js      # Footer component
│   ├── sign-in/           # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── lib/
│   ├── db.js              # Database connection
│   └── schema.js          # Database schema
├── middleware.js           # Clerk authentication middleware
├── drizzle.config.js       # Drizzle configuration
└── package.json
```

## Admin Access

- **URL**: `/admin`
- **Authentication**: Required (Clerk)
- **Features**: Property management, client management, analytics

## Customization

### Adding New Properties

1. Access the admin dashboard
2. Use the "Add Property" button
3. Fill in property details
4. Save to database

### Modifying Services

Edit the services array in `app/components/Navbar.js`:

```javascript
const services = [
  'Property Management',
  'Real Estate Investment',
  'Property Development',
  'Consulting Services',
  'Legal Services',
]
```

### Styling

- Main styles are in `app/globals.css`
- Component-specific styles use Tailwind CSS classes
- Custom animations are defined in CSS

## Deployment

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform** (Vercel, Netlify, etc.)

3. **Set environment variables** in your deployment platform

4. **Run database migrations** on your production database

## Support

For issues or questions:

- Check the documentation
- Review the code structure
- Ensure all environment variables are set correctly

## License

This project is private and proprietary to Palmside Real Estate.

---

**Built with ❤️ for Palmside Real Estate**
# palm-side-latest
