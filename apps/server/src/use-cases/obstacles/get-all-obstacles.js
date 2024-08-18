import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { maps } from '../../db/schema/map.js'
import { obstacles as tbObstacles } from '../../db/schema/obstacle.js'
import { NotFoundError } from '../_errors/not-found.js'

export async function getAllObstacles(mapId) {
  const obstacles = await db
    .select()
    .from(tbObstacles)
    .where(eq(tbObstacles.mapId, mapId))

  return { obstacles }
}
