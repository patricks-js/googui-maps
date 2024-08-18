import { db } from '../../db/connection.js'
import { routes } from '../../db/schema/route.js'
import { getMapById } from '../maps/get-map-by-id.js'

export async function createBestRoute(route) {
  await getMapById(route.mapId)

  const [newRoute] = await db
    .insert(routes)
    .values({
      ...route,
      mapId: route.mapId,
    })
    .returning({
      id: routes.id,
      start: routes.start,
      end: routes.end,
      distance: routes.distance,
    })

  return { newRoute }
}
