# Quick Start: Email Notifications

## 🚀 Get Email Notifications Working in 5 Minutes

### Step 1: Get Resend API Key (2 minutes)

1. Go to [resend.com](https://resend.com)
2. Sign up (it's free - 3,000 emails/month)
3. Go to **API Keys** → **Create API Key**
4. Copy your API key (starts with `re_`)

### Step 2: Add to Environment Variables (1 minute)

Create or edit `.env.local` in your project root:

```bash
# Required
RESEND_API_KEY="re_your_key_here"
ADMIN_EMAIL="info@palmside.es"

# Optional (these have defaults)
EMAIL_FROM="Palmside Notifications <notifications@palmside.es>"
NEXT_PUBLIC_SITE_URL="https://palmside.es"
```

### Step 3: Restart Your Server (30 seconds)

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Test It (1 minute)

1. Go to: `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit it
4. Check your admin email inbox! 📧

## ✅ That's It!

You should receive a beautiful, professional email notification with:
- All contact details
- The customer's message
- A link to view in your dashboard
- Ability to reply directly from your email

## 🎯 For Production Deployment

When deploying to production (Vercel, etc.):

1. Add `RESEND_API_KEY` to your hosting environment variables
2. Add `ADMIN_EMAIL` if different from default
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL
4. (Optional) Verify your domain in Resend for better deliverability

## 💡 Verify Your Domain (Optional, Recommended)

For best email deliverability:

1. In Resend dashboard, go to **Domains**
2. Add your domain: `palmside.es`
3. Add the DNS records they provide (SPF, DKIM)
4. Wait for verification (~5 minutes)
5. Update `EMAIL_FROM` to use your domain

Without domain verification, emails send from `onboarding@resend.dev` (still works, just less professional).

## 🐛 Troubleshooting

**Not receiving emails?**
- Check your spam folder
- Verify `RESEND_API_KEY` is correct
- Check terminal for error messages
- Make sure you restarted the server after adding env vars

**Emails look weird?**
- The template is tested on all major email clients
- Check if images/styling are blocked in your email client

**Still having issues?**
- See `EMAIL_NOTIFICATION_SETUP.md` for detailed troubleshooting

## 📱 Mobile Access

The whole point of this feature is that the admin can:
1. Receive notifications on their phone (via email app)
2. Read the full message
3. Reply directly to the customer
4. Or open the dashboard link to see more details

No need to log into the admin dashboard to stay connected!

---

Need help? Check the full documentation in `EMAIL_NOTIFICATION_SETUP.md`




