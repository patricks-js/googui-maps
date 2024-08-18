ALTER TABLE "tb_maps" DROP CONSTRAINT "tb_maps_user_id_tb_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "tb_obstacles" DROP CONSTRAINT "tb_obstacles_map_id_tb_maps_map_id_fk";
--> statement-breakpoint
ALTER TABLE "tb_waypoints" DROP CONSTRAINT "tb_waypoints_map_id_tb_maps_map_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_maps" ADD CONSTRAINT "tb_maps_user_id_tb_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."tb_users"("user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_obstacles" ADD CONSTRAINT "tb_obstacles_map_id_tb_maps_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."tb_maps"("map_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_waypoints" ADD CONSTRAINT "tb_waypoints_map_id_tb_maps_map_id_fk" FOREIGN KEY ("map_id") REFERENCES "public"."tb_maps"("map_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
