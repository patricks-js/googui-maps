import { createWaypointController } from "../../http/controllers/waypoint/create-waypoint.js";
import { deleteWaypointController } from "../../http/controllers/waypoint/delete-waypoint.js";
import { findWaypointController } from "../../http/controllers/waypoint/find-waypoint.js";
import { updateWaypointController } from "../../http/controllers/waypoint/update-waypoint.js";
import {
  waypointDeleteSchema,
  waypointGetSchema,
  waypointPostSchema,
  waypointPutSchema
} from "../config/waypoint-schema.js";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */

export async function waypointsRoutes(app) {
  app.post("/", waypointPostSchema, createWaypointController);
  app.get("/:id", waypointGetSchema, findWaypointController);
  app.put("/:id", waypointPutSchema, updateWaypointController);
  app.delete("/:id", waypointDeleteSchema, deleteWaypointController);
}
