import { z } from "zod";
import { updateWaypoint } from "../../../data/usecases/waypoint/update-waypoint.js";
import { validators } from "../../validators.js";

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
  const { id } = validators.idParamSchema(request.params);

  const body = bodySchema.parse(request.body);

  return updateWaypoint(id, body);
}
