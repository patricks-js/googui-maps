DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('common', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_users" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"role" "role" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tb_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_maps" (
	"map_id" serial PRIMARY KEY NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"user_id" uuid NOT NULL,
	"best_path_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_obstacles" (
	"obstacle_id" serial PRIMARY KEY NOT NULL,
	"position" "point" NOT NULL,
	"size" integer NOT NULL,
	"map_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_waypoints" (
	"waypoint_id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"position" "point" NOT NULL,
	"map_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tb_routes" (
	"route_id" serial PRIMARY KEY NOT NULL,
	"start" "point" NOT NULL,
	"end" "point" NOT NULL,
	"distance" integer NOT NULL,
	"map_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_maps" ADD CONSTRAINT "tb_maps_user_id_tb_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tb_users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_maps" ADD CONSTRAINT "tb_maps_best_path_id_tb_routes_route_id_fk" FOREIGN KEY ("best_path_id") REFERENCES "public"."tb_routes"("route_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_obstacles" ADD CONSTRAINT "tb_obstacles_map_id_tb_maps_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."tb_maps"("map_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_waypoints" ADD CONSTRAINT "tb_waypoints_map_id_tb_maps_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."tb_maps"("map_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_routes" ADD CONSTRAINT "tb_routes_map_id_tb_maps_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."tb_maps"("map_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
