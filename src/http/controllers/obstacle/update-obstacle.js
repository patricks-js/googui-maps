import { z } from "zod";
import { updateObstacle } from "../../../data/usecases/obstacle/update-obstacle.js";

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
  try {
    const data = obstacleSchema.parse(request.body);
    const updatedObstacle = await updateObstacle(request.params.id, data);

    return response.status(200).send(updatedObstacle);
  } catch (error) {
    response
      .status(400)
      .send({ message: "Error updating obstacle: ", error: error.message });
  }
}
