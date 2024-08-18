import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'

export async function getMapById(mapId) {
  const map = await db.query.maps.findFirst({
    where: (maps, { eq }) => eq(maps.id, mapId),
    with: {
      obstacles: true,
    },
  })

  if (!map) {
    throw new NotFoundError('Map not found.')
  }

  return { map }
}
