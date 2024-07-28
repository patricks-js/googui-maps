import { z } from "zod";
import { findWaypoint } from "../../../data/usecases/waypoint/find-waypoint.js";

const waypointSchema = z.object({
  id: z.string()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export async function findWaypointController(request, reply) {
  const { id } = waypointSchema.parse(request.params);
  return findWaypoint(id);
}
