# 🔍 Production Error Debugging Guide

## Common "Internal Server Error" Causes

### 1. **Missing Cloudinary Credentials** (Most Likely!)
**Symptoms**: 
- ❌ Can't upload images
- ❌ Admin properties page crashes
- ❌ Error when accessing property forms

**Solution**:
```bash
# Add to Production Environment Variables:
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

**For Vercel**:
1. Go to project → Settings → Environment Variables
2. Add all 3 Cloudinary variables
3. Click "Redeploy" (important!)

---

### 2. **Database Migration Not Applied**
**Symptoms**:
- ❌ Error: `column "plot_size_m2" does not exist`
- ❌ Properties page crashes
- ❌ Can't create/edit properties

**Solution** (Run this in your production database):
```sql
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "plot_size_m2" numeric(10, 2);
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "built_area_m2" numeric(10, 2);
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "living_space_m2" numeric(10, 2);
```

**How to run in Neon/Postgres**:
1. Go to your database dashboard (e.g., Neon)
2. Find "SQL Editor" or "Query"
3. Paste the SQL above
4. Click "Run"
5. Redeploy your app

---

### 3. **Missing Resend API Key**
**Symptoms**:
- ❌ Contact form fails
- ✅ Rest of site works fine

**Solution**:
```bash
# Add to Production Environment Variables:
RESEND_API_KEY="re_your_key_here"
ADMIN_EMAIL="info@palmside.es"
```

---

## 🔍 How to Check Production Logs

### **Vercel**:
1. Go to your project dashboard
2. Click "Deployments"
3. Click on latest deployment
4. Click "Functions" or "Runtime Logs"
5. Look for error messages

### **Look for**:
- ❌ `Cloudinary configuration is undefined`
- ❌ `column "plot_size_m2" does not exist`
- ❌ `CLOUDINARY_CLOUD_NAME is undefined`
- ❌ `Cannot read properties of undefined`

---

## ✅ Complete Production Checklist

### **Required Environment Variables**:

```bash
# Database (REQUIRED)
DATABASE_URL="postgresql://..."

# Cloudinary (REQUIRED for image uploads)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Email (Optional - only affects contact form)
RESEND_API_KEY="re_..."
ADMIN_EMAIL="info@palmside.es"

# Site URL (Optional - has defaults)
NEXT_PUBLIC_SITE_URL="https://palmside.es"
```

### **Database Columns** (Run this SQL):
```sql
-- Check if columns exist
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'properties' 
AND column_name IN ('plot_size_m2', 'built_area_m2', 'living_space_m2');

-- If they don't exist, add them
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "plot_size_m2" numeric(10, 2);
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "built_area_m2" numeric(10, 2);
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "living_space_m2" numeric(10, 2);
```

---

## 🎯 Quick Fix Steps

### **Step 1: Add Missing Environment Variables**
1. Check if you have all 3 Cloudinary variables
2. Add them to production
3. **IMPORTANT**: Click "Redeploy" after adding variables

### **Step 2: Apply Database Migration**
1. Go to your database dashboard (Neon/Supabase/etc.)
2. Open SQL editor
3. Run the ALTER TABLE commands above
4. Verify columns were added

### **Step 3: Redeploy**
1. After adding env vars and running migrations
2. Redeploy your application
3. Test the site

---

## 🐛 Specific Error Messages

### Error: "Configuration is undefined"
→ Missing Cloudinary environment variables

### Error: "column does not exist"
→ Database migration not applied

### Error: "Cannot read properties of undefined"
→ Missing environment variable

### Error: "Domain not verified" (Email)
→ Resend domain issue (not critical, site still works)

---

## 📞 Need More Info?

### Tell me:
1. **Which page** shows the error? (Homepage, Admin, Properties, etc.)
2. **What action** causes it? (Loading page, uploading image, etc.)
3. **Any error details** from:
   - Vercel Function Logs
   - Browser Console (F12)
   - Network tab errors

### Share:
- Screenshot of error
- Error from Vercel logs
- Which page URL

---

## ✅ After Fixing

### Test These:
- [ ] Homepage loads
- [ ] Properties page loads
- [ ] Admin dashboard loads
- [ ] Can view a property
- [ ] Can upload images (admin)
- [ ] Can create a property (admin)
- [ ] Contact form works
- [ ] Email notification arrives

---

## 🚀 Most Common Fix

**90% of the time, it's missing Cloudinary credentials!**

1. Add these to production:
   ```
   CLOUDINARY_CLOUD_NAME
   CLOUDINARY_API_KEY
   CLOUDINARY_API_SECRET
   ```

2. Click "Redeploy"

3. Done! ✅

---

**Last Updated**: October 2025

