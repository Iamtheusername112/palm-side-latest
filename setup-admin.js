import { PasswordAuthManager } from './lib/password-auth.js'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local', quiet: true })

async function setupAdmin() {
  try {
    console.log('🔧 Setting up admin user...')

    // Get credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminEmail || !adminPassword) {
      console.error('❌ Missing environment variables!')
      console.log(
        'Please set ADMIN_EMAIL and ADMIN_PASSWORD in your .env.local file'
      )
      console.log('Example:')
      console.log('ADMIN_EMAIL="your-email@example.com"')
      console.log('ADMIN_PASSWORD="your-secure-password"')
      process.exit(1)
    }

    if (adminPassword.length < 8) {
      console.error('❌ Password must be at least 8 characters long!')
      process.exit(1)
    }

    console.log(`📧 Setting up admin with email: ${adminEmail}`)

    // Create the first admin user
    const admin = await PasswordAuthManager.createFirstAdmin(
      adminEmail,
      'Admin', // First name
      'User', // Last name
      adminPassword
    )

    console.log('✅ Admin user created successfully!')
    console.log(`👤 Admin ID: ${admin.id}`)
    console.log(`📧 Email: ${admin.email}`)
    console.log(`🔑 Password: [HIDDEN]`)
    console.log(`📅 Password expires: ${admin.passwordExpiresAt}`)

    console.log('\n🎯 Next steps:')
    console.log('1. Start your development server: npm run dev')
    console.log('2. Navigate to /admin-auth/login')
    console.log('3. Login with your admin credentials')
    console.log('4. Access the dashboard at /admin')

    console.log('\n⚠️  SECURITY REMINDER:')
    console.log('- Change your password after first login')
    console.log('- Never commit .env.local to version control')
    console.log('- Use strong passwords in production')
  } catch (error) {
    if (error.message === 'Admin user already exists') {
      console.log('ℹ️  Admin user already exists in database')
      console.log('You can proceed with npm run dev')
    } else {
      console.error('❌ Error setting up admin:', error.message)
      process.exit(1)
    }
  }
}

setupAdmin()
