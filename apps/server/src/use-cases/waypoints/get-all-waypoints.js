import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { waypoints as tbWaypoints } from '../../db/schema/waypoint.js'

export async function getAllWaypoints(mapId) {
  const waypoints = await db
    .select()
    .from(tbWaypoints)
    .where(eq(tbWaypoints.mapId, mapId))

  return { waypoints }
}
