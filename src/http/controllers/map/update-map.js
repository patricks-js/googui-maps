import { z } from "zod";
import { updateMap } from "../../../data/usecases/map/update-map.js";

const mapSchema = z.object({
  name: z.string(),
  dimensions: z.object({
    width: z.number(),
    height: z.number()
  }),
  obstacles: z.array(z.object({ x: z.number(), y: z.number() }))
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updateMapController(request, reply) {
  const { id } = validators.idParamSchema(request.params);
  const body = mapSchema.parse(request.body);

  return updateMap(id, body);
}
