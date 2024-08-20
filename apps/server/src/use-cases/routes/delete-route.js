import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { routes } from '../../db/schema/route.js'
import { getBestRouteByMapId } from './get-best-route.js'

export async function deleteRoute(routeId, mapId) {
  await getBestRouteByMapId(mapId)

  await db.delete(routes).where(eq(routes.id, routeId))
}
