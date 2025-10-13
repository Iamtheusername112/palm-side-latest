/**
 * Script to apply the area measurements migration to production database
 * Run this script to add the new columns to your production database
 * 
 * Usage: node apply-production-migration.js
 */

import { config } from 'dotenv'
import pkg from 'pg'
const { Client } = pkg

// Load environment variables
config({ path: '.env.local' })

const migrationSQL = `
-- Add area measurement columns to properties table
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "plot_size_m2" numeric(10, 2);
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "built_area_m2" numeric(10, 2);
ALTER TABLE "properties" ADD COLUMN IF NOT EXISTS "living_space_m2" numeric(10, 2);

-- Add comments (optional, but helpful)
COMMENT ON COLUMN "properties"."plot_size_m2" IS 'Total plot/land area in square meters';
COMMENT ON COLUMN "properties"."built_area_m2" IS 'Total built-up area in square meters';
COMMENT ON COLUMN "properties"."living_space_m2" IS 'Usable living space in square meters';
`

async function applyMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  try {
    console.log('🔌 Connecting to database...')
    await client.connect()
    console.log('✅ Connected!')

    console.log('\n📝 Checking current columns...')
    const checkResult = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'properties' 
      AND column_name IN ('plot_size_m2', 'built_area_m2', 'living_space_m2')
      ORDER BY column_name;
    `)

    console.log(`Found ${checkResult.rows.length} of 3 area measurement columns:`)
    checkResult.rows.forEach((row) => {
      console.log(`  ✓ ${row.column_name}`)
    })

    if (checkResult.rows.length === 3) {
      console.log('\n✅ All area measurement columns already exist!')
      console.log('No migration needed.')
    } else {
      console.log('\n🔧 Applying migration...')
      await client.query(migrationSQL)
      console.log('✅ Migration applied successfully!')

      // Verify
      const verifyResult = await client.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'properties' 
        AND column_name IN ('plot_size_m2', 'built_area_m2', 'living_space_m2')
        ORDER BY column_name;
      `)

      console.log('\n✅ Verification - Found columns:')
      verifyResult.rows.forEach((row) => {
        console.log(`  ✓ ${row.column_name}`)
      })

      if (verifyResult.rows.length === 3) {
        console.log('\n🎉 SUCCESS! All 3 columns are now in the database!')
      } else {
        console.log('\n⚠️  Warning: Not all columns were added. Please check manually.')
      }
    }
  } catch (error) {
    console.error('\n❌ Error applying migration:')
    console.error(error.message)
    console.error('\nFull error:', error)
    process.exit(1)
  } finally {
    await client.end()
    console.log('\n🔌 Database connection closed.')
  }
}

// Run the migration
console.log('🚀 Starting production migration...')
console.log('Database:', process.env.DATABASE_URL ? 'Connected' : '❌ DATABASE_URL not found!')
console.log('')

applyMigration()
  .then(() => {
    console.log('\n✅ Migration script completed successfully!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Migration script failed:', error)
    process.exit(1)
  })

