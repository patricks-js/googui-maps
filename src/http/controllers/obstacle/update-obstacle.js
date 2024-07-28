import { z } from "zod";
import { updateObstacle } from "../../../data/usecases/obstacle/update-obstacle.js";

const paramsSchema = z.object({
  id: z.string()
});

const obstacleSchema = z.object({
  mapId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  size: z.number()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function updateObstacleController(request, reply) {
  try {
    paramsSchema.parse(request.params);
    obstacleSchema.parse(request.body);

    const updatedObstacle = await updateObstacle(
      request.params.id,
      request.body
    );
    return reply.status(200).send(updatedObstacle);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply
        .status(400)
        .send({ error: "Bad Request", message: error.errors });
    }
    return reply.status(404).send(error);
  }
}
