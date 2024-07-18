import { z } from "zod";
import { createPath } from "../../../data/usecases/path/create-path.js";

const pathSchema = z.object({
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
  try {
    const data = pathSchema.parse(request.body);
    const createdPath = await createPath(data);

    return reply.status(201).send(createdPath);
  } catch (error) {
    reply.status(400).send({ error: error.message });
  }
}
