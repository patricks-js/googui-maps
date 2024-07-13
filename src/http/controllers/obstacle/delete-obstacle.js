import { z } from "zod";
import { deleteObstacle } from "../../../data/usecases/obstacle/delete-obstacle.js";

const obstacleSchema = z.object({
  id: z.string()
});
/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deleteObstacleController(request, reply) {
  try {
    obstacleSchema.parse(request.params);
    await deleteObstacle(request.params.id);

    reply.status(204).send();
  } catch (error) {
    reply.status(404).send(error);
  }
}
