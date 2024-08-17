import { db } from '../db/connection.js'
import { users as tbUsers } from '../db/schema/user.js'

export async function getAllUsers() {
  const users = await db.select().from(tbUsers)

  return { users }
}
