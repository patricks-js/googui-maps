import { z } from "zod";
import { createWaypoint } from "../../../data/usecases/waypoint/create-waypoint.js";

const waypointSchema = z.object({
  mapId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  name: z.string()
});
/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export async function createWaypointController(request, reply) {
  const validatedWaypoint = waypointSchema.parse(request.body);
  const newWaypoint = await createWaypoint(validatedWaypoint);

  return reply.status(201).send(newWaypoint);
}
