import { z } from "zod";
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

    return await response.status(200).send(obstacles);
  } catch (error) {
    response
      .status(400)
      .send({ message: "Error fetching obstacle: ", error: error.message });
  }
}
