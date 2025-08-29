ALTER TABLE "admin_users" ALTER COLUMN "kinde_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "first_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "last_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "is_active" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "password_hash" varchar(255);--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "password_changed_at" timestamp;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "password_expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "admin_users" ADD COLUMN "force_password_change" boolean DEFAULT false;