import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { waypoints } from '../../db/schema/waypoint.js'
import { verifyWaypointById } from './verify-waypoint-by-id.js'

export async function updateWaypoint(waypointId, changes) {
  const waypoint = await verifyWaypointById(waypointId, changes.mapId)

  for (const key in changes) {
    if (changes[key]) {
      waypoint[key] = changes[key]
    }
  }

  const [updatedWaypoint] = await db
    .update(waypoints)
    .set(waypoint)
    .where(eq(waypoints.id, waypointId))
    .returning({
      id: waypoints.id,
      position: waypoints.position,
      name: waypoints.name,
    })

  return { updatedWaypoint }
}
