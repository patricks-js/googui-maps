import { z } from "zod";
import { updateWaypoint } from "../../../data/usecases/waypoint/update-waypoint.js";

const paramsSchema = z.object({ id: z.string() });

const bodySchema = z.object({
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
  const { id } = paramsSchema.parse(request.params);
  const body = bodySchema.parse(request.body);

  return updateWaypoint(id, body);
}
