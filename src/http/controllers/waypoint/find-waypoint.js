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
  try {
    waypointSchema.parse(request.params);
    const waypoint = await findWaypoint(request.params.id);

    return reply.status(200).send(waypoint);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: "Bad Request", message: error.errors });
    }
    return reply.status(404).send(error);
  }
}
