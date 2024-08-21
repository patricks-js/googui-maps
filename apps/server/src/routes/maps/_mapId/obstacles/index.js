import { z } from 'zod'
import { createObstacle } from '../../../../use-cases/obstacles/create-obstacle.js'
import { deleteObstacle } from '../../../../use-cases/obstacles/delete-obstacle.js'
import { getAllObstacles } from '../../../../use-cases/obstacles/get-all-obstacles.js'
import { updateObstacle } from '../../../../use-cases/obstacles/update-obstacle.js'
import {
  createObstacleSchema,
  deleteObstacleSchema,
  getAllObstaclesSchema,
  updateObstacleSchema,
} from './schema.js'

const mapParamSchema = z.object({
  mapId: z.coerce.number(),
})

const mapObstacleParamSchema = z.object({
  obstacleId: z.coerce.number(),
  mapId: z.coerce.number(),
})

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  app.addHook('onRequest', app.authenticate)

  app.get('/', { schema: getAllObstaclesSchema }, async (request, reply) => {
    const { mapId } = mapParamSchema.parse(request.params)

    return getAllObstacles(mapId)
  })

  app.post('/', { schema: createObstacleSchema }, async (request, reply) => {
    const { mapId } = mapParamSchema.parse(request.params)

    const createSchema = z.object({
      position: z.object({
        x: z.number(),
        y: z.number(),
      }),
      size: z.number(),
    })

    const data = createSchema.parse(request.body)

    const { newObstacle } = await createObstacle({ mapId, ...data })

    return reply.status(201).send({ newObstacle })
  })

  app.put(
    '/:obstacleId',
    { schema: updateObstacleSchema },
    async (request, reply) => {
      const { obstacleId, mapId } = mapObstacleParamSchema.parse(request.params)

      const obstacleChangesSchema = z.object({
        position: z
          .object({
            x: z.number().optional(),
            y: z.number().optional(),
          })
          .optional(),
        size: z.number().optional(),
      })

      const changes = obstacleChangesSchema.parse(request.body)

      const { updatedObstacle } = await updateObstacle(obstacleId, {
        ...changes,
        mapId,
      })

      return { updatedObstacle }
    },
  )

  app.delete(
    '/:obstacleId',
    { schema: deleteObstacleSchema },
    async (request, reply) => {
      const { obstacleId, mapId } = mapObstacleParamSchema.parse(request.params)

      await deleteObstacle(obstacleId, mapId)

      return reply.status(204).send()
    },
  )
}
