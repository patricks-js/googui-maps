ALTER TABLE "tb_maps" DROP CONSTRAINT "tb_maps_best_path_id_tb_routes_route_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tb_maps" ADD CONSTRAINT "tb_maps_best_path_id_tb_routes_route_id_fk" FOREIGN KEY ("best_path_id") REFERENCES "public"."tb_routes"("route_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
