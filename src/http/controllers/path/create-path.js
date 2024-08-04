import { z } from "zod";
import { createPath } from "../../../data/usecases/path/create-path.js";

const bodySchema = z.object({
  mapId: z.string(),
  start: z.object({
    x: z.number(),
    y: z.number()
  }),
  end: z.object({
    x: z.number(),
    y: z.number()
  }),
  distance: z.number()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function createPathController(request, reply) {
  const body = bodySchema.parse(request.body);

  return createPath(body);
}
