import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { users } from '../../db/schema/user.js'
import { getUserById } from './get-user-by-id.js'

export async function updateUserProfile(userId, changes) {
  const userExists = await getUserById(userId)

  for (const key in changes) {
    if (changes[key] && key !== 'password') {
      userExists[key] = changes[key]
    }

    if (changes.password) {
      userExists.password = await bcrypt.hash(changes.password, 8)
    }
  }

  const [user] = await db
    .update(users)
    .set(userExists)
    .where(eq(users.id, userId))
    .returning()

  return { user }
}
