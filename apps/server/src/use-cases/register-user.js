import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../db/connection.js'
import { users } from '../db/schema/user.js'
import { UserAlreadyExistsError } from './_errors/user-already-exists.js'

export async function registerUser(user) {
  if (await userAlreadyExists(user)) {
    throw new UserAlreadyExistsError()
  }

  const id = randomUUID()
  const hashedPassword = await bcrypt.hash(user.password, 8)

  await db.insert(users).values({
    id,
    username: user.username,
    email: user.email,
    password: hashedPassword,
  })

  return id
}

async function userAlreadyExists(user) {
  const existsWithSameEmail = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, user.email),
    columns: { id: true },
  })

  const existsWithSameUsername = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, user.username),
    columns: { id: true },
  })

  return existsWithSameEmail || existsWithSameUsername
}
