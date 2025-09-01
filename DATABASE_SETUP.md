# Database Setup Guide

## 🔧 **Analytics Dashboard Database Connection**

Your analytics dashboard is ready but needs a database connection to show real data.

### **✅ Quick Setup:**

1. **Create `.env.local` file** in your project root:

```bash
# .env.local
DATABASE_URL="your_database_connection_string_here"
```

2. **Get a Database URL:**

#### **Option 1: Neon Database (Recommended - Free)**

- Go to [neon.tech](https://neon.tech)
- Create a free account
- Create a new project
- Copy the connection string
- Format: `postgresql://username:password@hostname/database?sslmode=require`

#### **Option 2: Supabase (Free)**

- Go to [supabase.com](https://supabase.com)
- Create a free account
- Create a new project
- Go to Settings > Database
- Copy the connection string

#### **Option 3: Local PostgreSQL**

- Install PostgreSQL locally
- Create a database
- Use: `postgresql://username:password@localhost:5432/database`

3. **Restart your development server:**

```bash
npm run dev
```

### **🎯 What You'll Get:**

Once connected, your analytics dashboard will show:

- ✅ Real property counts and trends
- ✅ Actual contact form submissions
- ✅ Real revenue calculations
- ✅ Live conversion rates
- ✅ Dynamic time-based filtering

### **🔍 Test Your Connection:**

Visit `/api/admin/analytics` - should return real data instead of errors.

### **📋 Example .env.local:**

```bash
DATABASE_URL="postgresql://username:password@hostname/database?sslmode=require"
```

The analytics dashboard is fully functional and ready to display your real business data! 🚀
