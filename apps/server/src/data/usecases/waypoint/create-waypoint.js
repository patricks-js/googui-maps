import { BadRequestError } from '../../../http/errors.js'
import { Waypoint } from '../../models/waypoint.js'

export async function createWaypoint(waypoint) {
  const existingWaypoint = await Waypoint.findOne({ name: waypoint.name })

  if (existingWaypoint) {
    throw new BadRequestError('Waypoint already exists')
  }

  return Waypoint.create(waypoint)
}
