# Email Notification Setup Guide

## Overview

The Palmside application now includes email notifications for contact form submissions. When a user submits the contact form, the admin will receive an email notification immediately, allowing them to respond even when away from the admin dashboard.

## Features

✅ **Instant Notifications**: Admin receives emails immediately when forms are submitted
✅ **Professional Design**: Beautiful HTML email templates with company branding
✅ **Direct Reply**: Admin can reply directly to the customer's email
✅ **Detailed Information**: Includes all contact details, subject, message, and timestamp
✅ **Dashboard Link**: Quick link to view the contact in the admin dashboard
✅ **Non-Blocking**: Email failures don't affect the user's form submission experience

## Setup Instructions

### 1. Create a Resend Account

1. Go to [Resend.com](https://resend.com) and sign up for a free account
2. The free tier includes:
   - 3,000 emails per month
   - 100 emails per day
   - Perfect for contact form notifications

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Palmside Production")
5. Copy the API key (it starts with `re_`)

### 3. Configure Domain (Optional but Recommended)

For production, it's best to send emails from your own domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain: `palmside.es`
4. Follow the DNS configuration instructions:
   - Add the required DNS records (SPF, DKIM, DMARC)
   - Wait for verification (usually takes a few minutes)
5. Once verified, you can send from `notifications@palmside.es`

**Note**: Without domain verification, emails will be sent from `onboarding@resend.dev` (works fine for testing)

### 4. Add Environment Variables

Add these variables to your `.env.local` file:

```bash
# Resend Email Configuration
RESEND_API_KEY="re_your_api_key_here"

# Admin email address to receive notifications
ADMIN_EMAIL="info@palmside.es"

# Email sender address (use your verified domain)
EMAIL_FROM="Palmside Notifications <notifications@palmside.es>"

# Site URL (for links in emails)
NEXT_PUBLIC_SITE_URL="https://palmside.es"
```

### 5. Environment Variables Explained

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | **Yes** | Your Resend API key | `re_123abc...` |
| `ADMIN_EMAIL` | **Yes** | Where notifications are sent | `info@palmside.es` |
| `EMAIL_FROM` | No | Sender name and email | `Palmside <notifications@palmside.es>` |
| `NEXT_PUBLIC_SITE_URL` | No | Your website URL (for links) | `https://palmside.es` |

**Defaults if not set:**
- `ADMIN_EMAIL`: Falls back to `info@palmside.es`
- `EMAIL_FROM`: Falls back to `Palmside Notifications <notifications@palmside.es>`
- `NEXT_PUBLIC_SITE_URL`: Falls back to `https://palmside.es`

### 6. Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact page: `http://localhost:3000/contact`

3. Fill out and submit the contact form

4. Check the admin email inbox for the notification

5. Verify the email contains:
   - All contact information
   - Professional formatting
   - Working "View in Dashboard" link
   - Correct timestamp

## Email Template Features

The notification emails include:

### Header
- Eye-catching gradient banner with Palmside branding
- Clear "New Contact Request" title

### Alert Box
- Highlighted notification that action is needed

### Contact Information Card
- Name, email (clickable), phone, and subject
- Subject displayed as a badge

### Message Section
- Full message in a readable format
- Preserves line breaks and formatting

### Action Button
- Direct link to admin dashboard contacts page
- Opens to the specific contact

### Footer
- Contact ID for reference
- Timestamp in Madrid timezone
- Reply-to functionality enabled

## Mobile-Friendly Design

The email template is fully responsive and looks great on:
- 📱 iPhone and Android phones
- 📧 Gmail, Outlook, Apple Mail
- 💻 Desktop email clients

## Troubleshooting

### Emails Not Sending?

1. **Check API Key**: Make sure `RESEND_API_KEY` is set correctly in `.env.local`
2. **Check Console**: Look for error messages in the terminal
3. **Verify Domain**: If using a custom domain, ensure DNS records are set up
4. **Check Spam**: First emails might go to spam folder
5. **Check Limits**: Free tier has 100 emails/day limit

### Emails Going to Spam?

1. **Verify Domain**: Set up SPF, DKIM, and DMARC records
2. **Use Custom Domain**: Avoid sending from `onboarding@resend.dev`
3. **Add to Contacts**: Add the sender to your contacts
4. **Check Content**: Avoid spam trigger words

### Email Formatting Issues?

1. The template works with all major email clients
2. If issues persist, check the plain text version
3. Test in multiple email clients

## Testing in Development

During development, you can:

1. Use the free Resend tier
2. Send test emails to your own address
3. Use Resend's dashboard to view sent emails
4. Check email delivery status and logs

## Production Checklist

Before deploying to production:

- [ ] Resend API key added to production environment variables
- [ ] Domain verified in Resend (recommended)
- [ ] `ADMIN_EMAIL` set to correct email address
- [ ] `EMAIL_FROM` set to verified domain email
- [ ] `NEXT_PUBLIC_SITE_URL` set to production URL
- [ ] Test email sent and received successfully
- [ ] Emails not going to spam
- [ ] Dashboard link works correctly
- [ ] Reply-to functionality tested

## Cost Considerations

**Resend Pricing:**
- **Free Tier**: 3,000 emails/month, 100/day (perfect for most use cases)
- **Pro Tier**: $20/month for 50,000 emails (if you grow)

For a contact form, you'll likely stay well within the free tier limits.

## Alternative Email Services

While this implementation uses Resend, you can easily switch to:

- **SendGrid**: Similar API, popular choice
- **Mailgun**: Good for high volume
- **Amazon SES**: Very cheap for large volumes
- **Postmark**: Excellent deliverability

To switch, just modify `lib/email.js` with the new service's API.

## Support

If you need help:

1. Check Resend documentation: [resend.com/docs](https://resend.com/docs)
2. Review error logs in your terminal
3. Check the Resend dashboard for delivery status
4. Verify all environment variables are set correctly

## Security Notes

⚠️ **Never commit `.env.local` to git**
⚠️ **Keep your API keys secret**
⚠️ **Use environment variables for all sensitive data**
⚠️ **Regularly rotate API keys**

## How It Works

```
User submits form
       ↓
Saved to database
       ↓
Email sent to admin (async)
       ↓
Admin receives notification on phone/email
       ↓
Admin can reply directly from email
       ↓
Or view full details in dashboard
```

The email sending is non-blocking, meaning even if the email fails to send, the contact form submission will still succeed and be saved to the database.

---

**Last Updated**: October 2025
**Version**: 1.0.0




