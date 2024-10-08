import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'
import { getMapById } from '../maps/get-map-by-id.js'

export async function getBestRouteByMapId(mapId) {
  const { map } = await getMapById(mapId)

  const route = await db.query.routes.findFirst({
    where: (routes, { eq, and }) => eq(routes.mapId, mapId),
  })

  if (!route) {
    throw new NotFoundError('Route not found.')
  }

  return { route }
}
