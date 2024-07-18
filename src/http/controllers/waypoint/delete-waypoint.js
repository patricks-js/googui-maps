import { z } from "zod";
import { deleteWaypoint } from "../../../data/usecases/waypoint/delete-waypoint.js";

const waypointSchema = z.object({
  id: z.string()
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */

export function deleteWaypointController(request, reply) {
  try {
    waypointSchema.parse(request.params);

    deleteWaypoint(request.params.id);
    return reply.status(204).send();
  } catch (error) {
    reply.status(404).send(error);
  }
}
