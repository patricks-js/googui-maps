import { z } from "zod";
import { updatePath } from "../../../data/usecases/path/update-path.js";

const idPathSchema = z.object({ id: z.string() });

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
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updatePathController(request, reply) {
  try {
    idPathSchema.parse(request.params);
    pathSchema.parse(request.body);

    const updatedPath = await updatePath(request.params.id, request.body);
    return reply.status(200).send(updatedPath);
  } catch (error) {
    reply.status(404).send(error);
  }
}
