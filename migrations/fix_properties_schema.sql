-- Fix properties table schema to match the application schema
-- This script adds all missing columns to the properties table

-- Add lot_size column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'lot_size') THEN
        ALTER TABLE properties ADD COLUMN lot_size INTEGER;
    END IF;
END $$;

-- Add year_built column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'year_built') THEN
        ALTER TABLE properties ADD COLUMN year_built INTEGER;
    END IF;
END $$;

-- Add features column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'features') THEN
        ALTER TABLE properties ADD COLUMN features JSON;
    END IF;
END $$;

-- Add main_image column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'main_image') THEN
        ALTER TABLE properties ADD COLUMN main_image VARCHAR(500);
    END IF;
END $$;

-- Add is_featured column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'is_featured') THEN
        ALTER TABLE properties ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Add is_active column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'is_active') THEN
        ALTER TABLE properties ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;
END $$;

-- Add views column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'views') THEN
        ALTER TABLE properties ADD COLUMN views INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add favorites column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'favorites') THEN
        ALTER TABLE properties ADD COLUMN favorites INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add contact_count column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'contact_count') THEN
        ALTER TABLE properties ADD COLUMN contact_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add coordinates column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'coordinates') THEN
        ALTER TABLE properties ADD COLUMN coordinates JSON;
    END IF;
END $$;

-- Add address column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'address') THEN
        ALTER TABLE properties ADD COLUMN address TEXT;
    END IF;
END $$;

-- Add city column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'city') THEN
        ALTER TABLE properties ADD COLUMN city VARCHAR(100);
    END IF;
END $$;

-- Add state column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'state') THEN
        ALTER TABLE properties ADD COLUMN state VARCHAR(100);
    END IF;
END $$;

-- Add zip_code column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'zip_code') THEN
        ALTER TABLE properties ADD COLUMN zip_code VARCHAR(20);
    END IF;
END $$;

-- Add country column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'country') THEN
        ALTER TABLE properties ADD COLUMN country VARCHAR(100) DEFAULT 'USA';
    END IF;
END $$;

-- Add admin_notes column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'properties' AND column_name = 'admin_notes') THEN
        ALTER TABLE properties ADD COLUMN admin_notes TEXT;
    END IF;
END $$;

-- Update existing columns to match schema if needed
-- Make price NOT NULL if it's currently nullable
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'properties' AND column_name = 'price' AND is_nullable = 'YES') THEN
        -- First, update any NULL prices to 0
        UPDATE properties SET price = 0 WHERE price IS NULL;
        -- Then make the column NOT NULL
        ALTER TABLE properties ALTER COLUMN price SET NOT NULL;
    END IF;
END $$;

-- Make location NOT NULL if it's currently nullable
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'properties' AND column_name = 'location' AND is_nullable = 'YES') THEN
        -- First, update any NULL locations to empty string
        UPDATE properties SET location = '' WHERE location IS NULL;
        -- Then make the column NOT NULL
        ALTER TABLE properties ALTER COLUMN location SET NOT NULL;
    END IF;
END $$;

-- Update status default value
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'properties' AND column_name = 'status') THEN
        ALTER TABLE properties ALTER COLUMN status SET DEFAULT 'For Sale';
    END IF;
END $$;
