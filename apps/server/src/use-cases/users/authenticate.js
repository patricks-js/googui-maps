import bcrypt from 'bcryptjs'
import { db } from '../../db/connection.js'
import { users } from '../../db/schema/user.js'
import { InvalidCredentialsError } from '../_errors/invalid-credentials.js'

export async function authenticateUser(credentials) {
  const userExists = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, credentials.email),
    columns: {
      id: true,
      username: true,
      email: true,
      password: true,
      role: true,
    },
  })

  if (!userExists) {
    throw new InvalidCredentialsError()
  }

  const isPasswordCorrect = await bcrypt.compare(
    credentials.password,
    userExists.password,
  )

  if (!isPasswordCorrect) {
    throw new InvalidCredentialsError()
  }

  return { user: userExists }
}
