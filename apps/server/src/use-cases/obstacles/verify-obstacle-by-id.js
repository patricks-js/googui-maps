import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'
import { getMapById } from '../maps/get-map-by-id.js'

export async function verifyObstacleById(obstacleId, mapId) {
  const { map } = await getMapById(mapId)

  const obstacle = await db.query.obstacles.findFirst({
    where: (obstacles, { eq, and }) =>
      and(eq(obstacles.id, obstacleId), eq(obstacles.mapId, mapId)),
  })

  if (!obstacle) {
    throw new NotFoundError('Obstacle not found.')
  }

  return { obstacle }
}
