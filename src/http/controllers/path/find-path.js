import { z } from "zod";
import { findPath } from "../../../data/usecases/path/find-path.js";

const pathSchema = z.object({
  id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findPathController(request, reply) {
  try {
    pathSchema.parse(request.params);
    const path = await findPath(request.params.id);

    return reply.status(200).send(path);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: "Bad Request", message: error.errors });
    }
    return reply.status(404).send(error);
  }
}
