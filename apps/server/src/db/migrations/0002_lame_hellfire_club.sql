ALTER TABLE "tb_users" ALTER COLUMN "role" SET DEFAULT 'common';--> statement-breakpoint
ALTER TABLE "tb_users" ALTER COLUMN "role" DROP NOT NULL;