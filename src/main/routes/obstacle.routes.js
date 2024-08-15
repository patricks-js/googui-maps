import { createObstacleController } from '../../http/controllers/obstacle/create-obstacle.js'
import { deleteObstacleController } from '../../http/controllers/obstacle/delete-obstacle.js'
import { findObstacleController } from '../../http/controllers/obstacle/find-obstacle.js'
import { updateObstacleController } from '../../http/controllers/obstacle/update-obstacle.js'
import {
  obstacleDeleteSchema,
  obstacleGetSchema,
  obstaclePostSchema,
  obstaclePutSchema,
} from '../config/schemas/obstacle-schema.js'
/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function obstacleRoutes(app) {
  app.post('/', obstaclePostSchema, createObstacleController)
  app.get('/:id', obstacleGetSchema, findObstacleController)
  app.put('/:id', obstaclePutSchema, updateObstacleController)
  app.delete('/:id', obstacleDeleteSchema, deleteObstacleController)
}
