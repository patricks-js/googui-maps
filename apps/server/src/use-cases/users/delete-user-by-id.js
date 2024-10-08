import { eq } from 'drizzle-orm'
import { db } from '../../db/connection.js'
import { users } from '../../db/schema/user.js'
import { NotFoundError } from '../_errors/not-found.js'

export async function deleteUserById(userId) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    columns: { id: true },
  })

  if (!user) {
    throw new NotFoundError('User not found.')
  }

  await db.delete(users).where(eq(users.id, userId))
}
