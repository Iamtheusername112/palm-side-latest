# ⚡ Quick Cloudinary Setup (5 Minutes)

## 🎯 What You Need to Do

Your images aren't uploading in production because the app needs **Cloudinary** (cloud storage).

---

## 📋 Quick Steps:

### 1️⃣ Create Account (2 min)
→ Go to: **[cloudinary.com](https://cloudinary.com)**  
→ Click **"Sign Up for Free"**  
→ Verify email

### 2️⃣ Get Credentials (1 min)
→ Go to: **[cloudinary.com/console](https://cloudinary.com/console)**  
→ Copy these three values:
```
Cloud Name: _____________
API Key: _____________
API Secret: _____________
```

### 3️⃣ Add to `.env.local` (1 min)
```bash
CLOUDINARY_CLOUD_NAME="paste_your_cloud_name"
CLOUDINARY_API_KEY="paste_your_api_key"
CLOUDINARY_API_SECRET="paste_your_api_secret"
```

### 4️⃣ Add to Production (1 min)

**Vercel:**
- Project → Settings → Environment Variables
- Add the 3 variables
- Redeploy

**Other platforms:**
- Add to environment variables
- Redeploy

### 5️⃣ Test!
- Upload an image
- Check [cloudinary.com/console/media_library](https://cloudinary.com/console/media_library)
- Should see your images ✅

---

## ✅ Done!

Images now work in production! 🎉

**FREE tier**: 25GB storage (more than enough!)

---

## 📖 Need More Help?

See: `CLOUDINARY_SETUP.md` for detailed instructions

