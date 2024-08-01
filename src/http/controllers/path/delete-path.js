import { z } from "zod";
import { deletePath } from "../../../data/usecases/path/delete-path.js";

const paramsSchema = z.object({
  id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deletePathController(request, reply) {
  const { id } = paramsSchema.parse(request.params);
  await deletePath(id);

  return reply.status(204).send();
}
