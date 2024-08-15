import { ServerError } from '../../../http/errors.js'
import { Obstacle } from '../../models/obstacle.js'

export async function updateObstacle(id, newObstacle) {
  const obstacle = await Obstacle.findById(id)
  if (!obstacle) {
    throw new NotFoundError(`Obstacle with id ${id} not found`)
  }

  try {
    return await Obstacle.findByIdAndUpdate(id, newObstacle, { new: true })
  } catch (error) {
    throw new ServerError('Error updating obstacle')
  }
}
