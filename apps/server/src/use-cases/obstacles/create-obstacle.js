import { db } from '../../db/connection.js'
import { obstacles } from '../../db/schema/obstacle.js'
import { getMapById } from '../maps/get-map-by-id.js'

export async function createObstacle(obstacle) {
  const map = await getMapById(obstacle.mapId)

  const [newObstacle] = await db
    .insert(obstacles)
    .values({
      ...obstacle,
      mapId: obstacle.mapId,
    })
    .returning({
      id: obstacles.id,
      position: obstacles.position,
      size: obstacles.size,
    })

  return { newObstacle }
}
