import { z } from "zod";
import { updatePath } from "../../../data/usecases/path/update-path.js";

const paramsSchema = z.object({ id: z.string() });

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
 *
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updatePathController(request, reply) {
  const { id } = paramsSchema.parse(request.params);
  const body = bodySchema.parse(request.body);

  return updatePath(id, body);
}
