import { z } from "zod";
import { deleteObstacle } from "../../../data/usecases/obstacle/delete-obstacle.js";

const paramsSchema = z.object({
  id: z.string()
});
/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deleteObstacleController(request, reply) {
  try {
    const { id } = paramsSchema.parse(request.params);
    await deleteObstacle(id);

    reply.status(204).send();
  } catch (error) {
    reply.status(404).send(error);
  }
}
