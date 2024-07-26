import { z } from "zod";
import { findMapById } from "../../../data/usecases/map/find-map.js";

const mapSchema = z.object({
  id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findMapByIdController(request, reply) {
  try {
    mapSchema.parse(request.params);
    const map = await findMapById(request.params.id);

    return reply.status(200).send(map);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: "Bad Request", message: error.errors });
    }
    return reply.status(404).send(error);
  }
}
