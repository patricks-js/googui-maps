import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { obstacles } from '../../db/schema/obstacle.js'
import { verifyObstacleById } from './verify-obstacle-by-id.js'

export async function updateObstacle(obstacleId, changes) {
  const { obstacle } = await verifyObstacleById(obstacleId, changes.mapId)

  for (const key in changes) {
    if (changes[key]) {
      obstacle[key] = changes[key]
    }
  }

  const [updatedObstacle] = await db
    .update(obstacles)
    .set(obstacle)
    .where(eq(obstacles.id, obstacleId))
    .returning({
      id: obstacles.id,
      position: obstacles.position,
      size: obstacles.size,
    })

  return { updatedObstacle }
}
