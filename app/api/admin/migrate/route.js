import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'
import { sql } from 'drizzle-orm'

export async function POST(request) {
  try {
    // Add missing columns to properties table
    const migrations = [
      // Add lot_size column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'lot_size') THEN
              ALTER TABLE properties ADD COLUMN lot_size INTEGER;
          END IF;
      END $$;`,
      
      // Add year_built column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'year_built') THEN
              ALTER TABLE properties ADD COLUMN year_built INTEGER;
          END IF;
      END $$;`,
      
      // Add address column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'address') THEN
              ALTER TABLE properties ADD COLUMN address TEXT;
          END IF;
      END $$;`,
      
      // Add city column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'city') THEN
              ALTER TABLE properties ADD COLUMN city VARCHAR(100);
          END IF;
      END $$;`,
      
      // Add state column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'state') THEN
              ALTER TABLE properties ADD COLUMN state VARCHAR(100);
          END IF;
      END $$;`,
      
      // Add zip_code column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'zip_code') THEN
              ALTER TABLE properties ADD COLUMN zip_code VARCHAR(20);
          END IF;
      END $$;`,
      
      // Add country column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'country') THEN
              ALTER TABLE properties ADD COLUMN country VARCHAR(100) DEFAULT 'USA';
          END IF;
      END $$;`,
      
      // Add is_featured column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'is_featured') THEN
              ALTER TABLE properties ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
          END IF;
      END $$;`,
      
      // Add is_active column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'is_active') THEN
              ALTER TABLE properties ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
          END IF;
      END $$;`,
      
      // Add admin_notes column if it doesn't exist
      `DO $$ 
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                         WHERE table_name = 'properties' AND column_name = 'admin_notes') THEN
              ALTER TABLE properties ADD COLUMN admin_notes TEXT;
          END IF;
      END $$;`
    ]

    // Execute each migration
    for (const migration of migrations) {
      try {
        await db.execute(sql.raw(migration))
        console.log('Migration executed successfully')
      } catch (error) {
        console.log('Migration already exists or error:', error.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database migration completed successfully'
    })

  } catch (error) {
    console.error('Migration error:', error)
    return NextResponse.json(
      { error: 'Migration failed', details: error.message },
      { status: 500 }
    )
  }
}
