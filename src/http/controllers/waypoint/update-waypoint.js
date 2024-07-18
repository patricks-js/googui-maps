import { z } from "zod";
import { updateWaypoint } from "../../../data/usecases/waypoint/update-waypoint.js";

const idWaypointSchema = z.object({ id: z.string() });

const waypointSchema = z.object({
  mapId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  name: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} response
 */
export async function updateWaypointController(request, reply) {
  try {
    idWaypointSchema.parse(request.params);
    waypointSchema.parse(request.body);

    const updatedWaypoint = await updateWaypoint(
      request.params.id,
      request.body
    );
    return reply.status(200).send(updatedWaypoint);
  } catch (error) {
    reply.status(404).send(error);
  }
}
