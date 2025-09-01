ALTER TABLE "admin_activity_logs" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "admin_sessions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "inquiries" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "services" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "admin_activity_logs" CASCADE;--> statement-breakpoint
DROP TABLE "admin_sessions" CASCADE;--> statement-breakpoint
DROP TABLE "inquiries" CASCADE;--> statement-breakpoint
DROP TABLE "services" CASCADE;--> statement-breakpoint
ALTER TABLE "admin_users" DROP CONSTRAINT "admin_users_kinde_id_unique";--> statement-breakpoint
DROP INDEX "single_super_admin";--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "first_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "last_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "role" SET DEFAULT 'admin';--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "price" SET DATA TYPE numeric(15, 2);--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "location" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "status" SET DEFAULT 'For Sale';--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "picture" varchar(500);--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "phone" varchar(20);--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "company" varchar(255);--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "position" varchar(100);--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "city" varchar(100);--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "state" varchar(100);--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "zip_code" varchar(20);--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "country" varchar(100) DEFAULT 'USA';--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "status" varchar(50) DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "source" varchar(50) DEFAULT 'website';--> statement-breakpoint
ALTER TABLE "clients" ADD COLUMN "assigned_to" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "lot_size" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "year_built" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "features" json;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "main_image" varchar(500);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "is_featured" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "is_active" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "views" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "favorites" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "contact_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "coordinates" json;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "address" text;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "city" varchar(100);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "state" varchar(100);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "zip_code" varchar(20);--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "country" varchar(100) DEFAULT 'USA';--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "admin_notes" text;--> statement-breakpoint
ALTER TABLE "clients" ADD CONSTRAINT "clients_assigned_to_admin_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."admin_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "kinde_id";--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "login_attempts";--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "locked_until";--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "permissions";--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "password_hash";--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "password_changed_at";--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "password_expires_at";--> statement-breakpoint
ALTER TABLE "admin_users" DROP COLUMN "force_password_change";--> statement-breakpoint
ALTER TABLE "clients" DROP COLUMN "preferences";