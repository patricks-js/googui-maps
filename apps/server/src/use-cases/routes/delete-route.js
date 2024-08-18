import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { routes } from '../../db/schema/route.js'
import { getBestRouteById } from './get-best-route-by-id.js'

export async function deleteRoute(routeId, mapId) {
  await getBestRouteById(routeId, mapId)

  await db.delete(routes).where(eq(routes.id, routeId))
}
