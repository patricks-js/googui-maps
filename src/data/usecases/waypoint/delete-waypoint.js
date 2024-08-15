import { NotFoundError, ServerError } from '../../../http/errors.js'
import { Waypoint } from '../../models/waypoint.js'

export async function deleteWaypoint(id) {
  const waypoint = await Waypoint.findById(id)
  if (!waypoint) {
    throw new NotFoundError(`Waypoint with id ${id} not found`)
  }

  try {
    await Waypoint.findByIdAndDelete(id)
  } catch (error) {
    throw new ServerError('Error at deleting Waypoint')
  }
}
