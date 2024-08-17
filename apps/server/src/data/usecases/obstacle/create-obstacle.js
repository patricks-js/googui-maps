import { NotFoundError } from '../../../http/errors.js'
import { Maps } from '../../models/map.js'
import { Obstacle } from '../../models/obstacle.js'

export async function createObstacle(obstacle) {
  const mapExists = await Maps.findById(obstacle.mapId)

  if (!mapExists) {
    throw new NotFoundError('Map not found for obstacle')
  }

  return Obstacle.create(obstacle)
}
