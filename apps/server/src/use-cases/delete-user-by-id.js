import { eq } from 'drizzle-orm'
import { db } from '../db/connection.js'
import { users } from '../db/schema/user.js'
import { NotFoundError } from './_errors/not-found.js'

export async function deleteUserById(id) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, id),
    columns: { id: true },
  })

  if (!user) {
    throw new NotFoundError('User not found.')
  }

  await db.delete(users).where(eq(users.id, user.id))
}
