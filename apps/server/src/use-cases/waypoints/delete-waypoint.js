import { and, eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { waypoints } from '../../db/schema/waypoint.js'
import { verifyWaypointById } from './verify-waypoint-by-id.js'

export async function deleteWaypoint(waypointId, mapId) {
  await verifyWaypointById(waypointId, mapId)

  await db
    .delete(waypoints)
    .where(and(eq(waypoints.id, waypointId), eq(waypoints.mapId, mapId)))
}
