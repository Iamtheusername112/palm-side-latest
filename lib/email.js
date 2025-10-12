import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Sends an email notification to the admin when a new contact form is submitted
 * @param {Object} contactData - The contact form submission data
 * @param {string} contactData.name - Name of the person who submitted the form
 * @param {string} contactData.email - Email address of the submitter
 * @param {string} contactData.phone - Phone number (optional)
 * @param {string} contactData.subject - Subject/service inquiry
 * @param {string} contactData.message - The message content
 * @param {number} contactData.contactId - The database ID of the contact
 * @returns {Promise} - Resolves when email is sent successfully
 */
export async function sendContactNotificationEmail(contactData) {
  const { name, email, phone, subject, message, contactId } = contactData

  // Admin email - get from environment variable
  const adminEmail = process.env.ADMIN_EMAIL || 'info@palmside.es'
  
  // Format the subject for better readability
  const formattedSubject = subject
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const emailSubject = `🔔 New Contact Request: ${formattedSubject}`

  // Create HTML email template
  const htmlContent = createContactEmailTemplate({
    name,
    email,
    phone,
    subject: formattedSubject,
    message,
    contactId,
  })

  // Create plain text version for email clients that don't support HTML
  const textContent = `
NEW CONTACT FORM SUBMISSION

From: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${formattedSubject}

Message:
${message}

---
Contact ID: #${contactId}
Submitted: ${new Date().toLocaleString('en-US', { 
  timeZone: 'Europe/Madrid',
  dateStyle: 'full',
  timeStyle: 'short'
})}

View in Admin Dashboard: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://palmside.es'}/admin/contacts
  `.trim()

  // Check if API key is set
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not set in environment variables!')
    return { success: false, error: 'RESEND_API_KEY not configured' }
  }

  console.log('📧 Attempting to send email to:', adminEmail)
  console.log('📧 Email subject:', emailSubject)

  try {
    // Send email using Resend
    // Use Resend's default domain if EMAIL_FROM is not set or if using unverified domain
    const fromEmail = process.env.EMAIL_FROM || 'Palmside Notifications <onboarding@resend.dev>'
    
    const data = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      replyTo: email, // Allow admin to reply directly to the customer
      subject: emailSubject,
      html: htmlContent,
      text: textContent,
    })

    console.log('✅ Contact notification email sent successfully!')
    console.log('📧 Email ID:', data?.id || 'No ID returned')
    console.log('📧 Full response:', JSON.stringify(data, null, 2))
    return { success: true, emailId: data?.id }
  } catch (error) {
    console.error('❌ Failed to send contact notification email')
    console.error('❌ Error details:', error.message)
    console.error('❌ Full error:', JSON.stringify(error, null, 2))
    // Don't throw error - we don't want email failures to break the contact form submission
    return { success: false, error: error.message }
  }
}

/**
 * Creates a professional HTML email template for contact notifications
 * @param {Object} data - Contact form data
 * @returns {string} - HTML email content
 */
function createContactEmailTemplate(data) {
  const { name, email, phone, subject, message, contactId } = data
  const timestamp = new Date().toLocaleString('en-US', { 
    timeZone: 'Europe/Madrid',
    dateStyle: 'full',
    timeStyle: 'short'
  })

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #b45309 0%, #15803d 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                🔔 New Contact Request
              </h1>
              <p style="margin: 10px 0 0 0; color: #fef3c7; font-size: 16px;">
                Palmside Real Estate
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Alert Box -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">
                  ⚡ You have received a new contact form submission that requires your attention.
                </p>
              </div>

              <!-- Contact Details -->
              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                  Contact Information
                </h2>
                
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                      <strong style="color: #6b7280; font-size: 14px;">Name:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; text-align: right;">
                      <span style="color: #111827; font-size: 15px; font-weight: 500;">${name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                      <strong style="color: #6b7280; font-size: 14px;">Email:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; text-align: right;">
                      <a href="mailto:${email}" style="color: #2563eb; font-size: 15px; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                      <strong style="color: #6b7280; font-size: 14px;">Phone:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; text-align: right;">
                      <span style="color: #111827; font-size: 15px;">${phone || 'Not provided'}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                      <strong style="color: #6b7280; font-size: 14px;">Subject:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; text-align: right;">
                      <span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600;">${subject}</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div style="margin-bottom: 30px;">
                <h2 style="margin: 0 0 15px 0; color: #111827; font-size: 20px; font-weight: 600; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                  Message
                </h2>
                <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
                  <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- Action Button -->
              <div style="text-align: center; margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://palmside.es'}/admin/contacts" 
                   style="display: inline-block; background: linear-gradient(135deg, #b45309 0%, #15803d 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  📊 View in Admin Dashboard
                </a>
              </div>

              <!-- Footer Info -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin-top: 30px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px;">
                  <strong>Contact ID:</strong> #${contactId}
                </p>
                <p style="margin: 0; color: #6b7280; font-size: 13px;">
                  <strong>Submitted:</strong> ${timestamp} (Madrid Time)
                </p>
              </div>

            </td>
          </tr>

          <!-- Email Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                This is an automated notification from your Palmside contact form.
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                You can reply directly to this email to respond to ${name}.
              </p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                  © ${new Date().getFullYear()} Palmside Real Estate. All rights reserved.
                </p>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}


