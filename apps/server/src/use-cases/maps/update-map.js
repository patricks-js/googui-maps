import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { maps } from '../../db/schema/map.js'
import { getMapById } from './get-map-by-id.js'

export async function updateMap(mapId, changes) {
  const { map } = await getMapById(mapId)

  if (changes.width) {
    map.width = changes.width
  }

  if (changes.height) {
    map.height = changes.height
  }

  const [updatedMap] = await db
    .update(maps)
    .set(map)
    .where(eq(maps.id, mapId))
    .returning()

  return { updatedMap }
}
