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
 * @param {import("fastify").FastifyReply} response
 */
export async function updateObstacleController(request, response) {
  const { id } = paramsSchema.parse(request.params);
  const data = obstacleSchema.parse(request.body);
  return updateObstacle(id, data);
}
