import { z } from "zod";
import { findObstacle } from "../../../data/usecases/obstacle/find-obstacle.js";

const paramsSchema = z.object({
  id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function findObstacleController(request, reply) {
  try {
    paramsSchema.parse(request.params);
    const obstacle = await findObstacle(request.params.id);

    return reply.status(200).send(obstacle);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: "Bad Request", message: error.errors });
    }
    return reply.status(404).send(error);
  }
}
