import { z } from "zod";
import { createMap } from "../../../data/usecases/map/create-map.js";

const mapSchema = z.object({
  name: z.string(),
  dimensions: z.object({
    width: z.number().min(1).max(500),
    height: z.number().min(1).max(500)
  }),
  obstacles: z.array(z.object({ x: z.number(), y: z.number() }))
});

/**
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function createMapControllers(request, reply) {
  const validatedMap = mapSchema.parse(request.body);
  const newMap = await createMap(validatedMap);

  return reply.status(201).send(newMap);
}
