import { db } from '../../db/connection.js'
import { maps } from '../../db/schema/map.js'
import { getUserById } from '../users/get-user-by-id.js'

export async function createMap(map) {
  const user = await getUserById(map.userId)

  const [{ mapId }] = await db
    .insert(maps)
    .values({
      ...map,
      userId: map.userId,
    })
    .returning({ mapId: maps.id })

  return { mapId }
}
