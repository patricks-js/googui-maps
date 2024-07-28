import { z } from "zod";
import { findObstacle } from "../../../data/usecases/obstacle/find-obstacle.js";

const paramsSchema = z.object({
  id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} response
 */
export async function findObstacleController(request, response) {
  const { id } = paramsSchema.parse(request.params);
  return findObstacle(id);
}
