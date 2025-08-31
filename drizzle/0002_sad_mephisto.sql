CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"subject" varchar(255) NOT NULL,
	"message" text NOT NULL,
	"status" varchar(50) DEFAULT 'new' NOT NULL,
	"priority" varchar(20) DEFAULT 'normal',
	"source" varchar(50) DEFAULT 'website',
	"ip_address" varchar(45),
	"user_agent" text,
	"admin_notes" text,
	"responded_at" timestamp,
	"responded_by" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_responded_by_admin_users_id_fk" FOREIGN KEY ("responded_by") REFERENCES "public"."admin_users"("id") ON DELETE no action ON UPDATE no action;