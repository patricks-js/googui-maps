import { Schema, z } from "zod";
import { findObstacle } from "../../../data/usecases/obstacle/find-obstacle.js";

const obstacleSchema = z.object({
  id: z.string()
});

/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} response
 */
export async function findObstacleController(request, response) {
  try {
    obstacleSchema.parse(request.params);
    const obstacles = await findObstacle(request.params.id);

    return response.status(200).send(obstacles);
  } catch (error) {
    throw new Error("Error fetching obstacles: ", error);
  }
}
