import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { maps } from '../../db/schema/map.js'
import { getMapById } from './get-map-by-id.js'

export async function deleteMap(mapId) {
  const { map } = await getMapById(mapId)

  await db.delete(maps).where(eq(maps.id, map.id))
}
