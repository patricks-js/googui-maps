import { db } from '../../db/connection.js'
import { NotFoundError } from '../_errors/not-found.js'

export async function getUserById(userId) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    columns: {
      id: true,
      username: true,
      email: true,
      role: true,
    },
  })

  if (!user) {
    throw new NotFoundError('User not found.')
  }

  return { user }
}
