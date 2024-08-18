import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'
import { getMapById } from '../maps/get-map-by-id.js'

export async function verifyWaypointById(waypointId, mapId) {
  const { map } = await getMapById(mapId)

  const waypoint = await db.query.waypoints.findFirst({
    where: (waypoints, { eq, and }) =>
      and(eq(waypoints.id, waypointId), eq(waypoints.mapId, mapId)),
  })

  if (!waypoint) {
    throw new NotFoundError('Waypoint not found.')
  }

  return { waypoint }
}
