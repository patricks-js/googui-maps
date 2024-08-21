import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { maps } from '../../db/schema/map.js'
import { getMapById } from './get-map-by-id.js'

export async function updateMap(mapId, changes) {
  const { map } = await getMapById(mapId)

  for (const key in changes) {
    if (changes[key]) {
      map[key] = changes[key]
    }
  }

  const [updatedMap] = await db
    .update(maps)
    .set(map)
    .where(eq(maps.id, mapId))
    .returning()

  return { updatedMap }
}
