import { and, eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { obstacles } from '../../db/schema/obstacle.js'
import { verifyObstacleById } from './verify-obstacle-by-id.js'

export async function deleteObstacle(obstacleId, mapId) {
  await verifyObstacleById(obstacleId, mapId)

  await db
    .delete(obstacles)
    .where(and(eq(obstacles.id, obstacleId), eq(obstacles.mapId, mapId)))
}
