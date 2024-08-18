import { db } from '../../db/connection.js'
import { waypoints } from '../../db/schema/waypoint.js'
import { getMapById } from '../maps/get-map-by-id.js'

export async function createWaypoint(waypoint) {
  const map = await getMapById(waypoint.mapId)

  const [newWaypoint] = await db
    .insert(waypoints)
    .values({
      ...waypoint,
      mapId: waypoint.mapId,
    })
    .returning({
      id: waypoints.id,
      position: waypoints.position,
      name: waypoints.name,
    })

  return { newWaypoint }
}
