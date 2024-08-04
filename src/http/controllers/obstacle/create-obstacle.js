import { z } from "zod";
import { createObstacle } from "../../../data/usecases/obstacle/create-obstacle.js";

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
export async function createObstacleController(request, reply) {
  const body = obstacleSchema.parse(request.body);

  return createObstacle(body);
}
