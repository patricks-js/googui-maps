import { NotFoundError } from '../../../http/errors.js'
import { Obstacle } from '../../models/obstacle.js'

export async function findObstacle(id) {
  const obstacle = await Obstacle.findById(id)

  if (!obstacle) {
    throw new NotFoundError(`Obstacle with id ${id} not found`)
  }

  return obstacle
}
