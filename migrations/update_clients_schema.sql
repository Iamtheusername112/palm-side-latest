-- Update clients table to match the schema
ALTER TABLE "clients" 
ADD COLUMN IF NOT EXISTS "company" varchar(255),
ADD COLUMN IF NOT EXISTS "position" varchar(100),
ADD COLUMN IF NOT EXISTS "city" varchar(100),
ADD COLUMN IF NOT EXISTS "state" varchar(100),
ADD COLUMN IF NOT EXISTS "zip_code" varchar(20),
ADD COLUMN IF NOT EXISTS "country" varchar(100) DEFAULT 'USA',
ADD COLUMN IF NOT EXISTS "notes" text,
ADD COLUMN IF NOT EXISTS "status" varchar(50) DEFAULT 'active' NOT NULL,
ADD COLUMN IF NOT EXISTS "source" varchar(50) DEFAULT 'website',
ADD COLUMN IF NOT EXISTS "assigned_to" integer;

-- Add foreign key constraint for assigned_to
ALTER TABLE "clients" 
ADD CONSTRAINT "clients_assigned_to_admin_users_id_fk" 
FOREIGN KEY ("assigned_to") REFERENCES "public"."admin_users"("id") ON DELETE no action ON UPDATE no action;

-- Remove the old preferences column if it exists (it's not in our new schema)
-- ALTER TABLE "clients" DROP COLUMN IF EXISTS "preferences";
