import { z } from 'zod'
import { createObstacle } from '../../../../use-cases/obstacles/create-obstacle.js'
import { getAllObstacles } from '../../../../use-cases/obstacles/get-all-obstacles.js'

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  app.addHook('onRequest', app.authenticate)

  app.post('/', async (request, reply) => {
    const paramsSchema = z.object({
      mapId: z.coerce.number(),
    })

    const { mapId } = paramsSchema.parse(request.params)

    const createSchema = z.object({
      position: z.object({
        x: z.number(),
        y: z.number(),
      }),
      size: z.number(),
    })

    const data = createSchema.parse(request.body)

    return createObstacle({ mapId, ...data })
  })

  app.get('/', async (request, reply) => {
    const paramsSchema = z.object({
      mapId: z.coerce.number(),
    })

    const { mapId } = paramsSchema.parse(request.params)

    return getAllObstacles(mapId)
  })

  app.get('/:obstacleId', async (request, reply) => {
    const paramsSchema = z.object({
      obstacleId: z.coerce.number(),
      mapId: z.coerce.number(),
    })

    const { obstacleId, mapId } = paramsSchema.parse(request.params)

    // return getObstacleById(obstacleId, mapId)
  })

  app.delete('/:obstacleId', async (request, reply) => {
    return { message: 'Obstacle deleted' }
  })
}
