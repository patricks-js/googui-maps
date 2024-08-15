import { z } from 'zod'
import { deleteObstacle } from '../../../data/usecases/obstacle/delete-obstacle.js'

const paramsSchema = z.object({
  id: z.string(),
})
/**
 * @param {import("fastify").FastifyRequest} request
 * @param {import("fastify").FastifyReply} reply
 */
export async function deleteObstacleController(request, reply) {
  const { id } = paramsSchema.parse(request.params)

  return deleteObstacle(id)
}
