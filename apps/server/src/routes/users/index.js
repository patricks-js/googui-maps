import { z } from 'zod'
import { deleteUser } from '../../data/usecases/user/delete-user.js'
import { findUser } from '../../data/usecases/user/find-user.js'
import { updateUser } from '../../data/usecases/user/update-user.js'
import { db } from '../../db/connection.js'
import { users } from '../../db/schema/user.js'
import { validators } from '../../http/validators.js'
import { verifyUserRole } from '../../middlewares/verify-user-role.js'
import { authenticateUser } from '../../use-cases/users/authenticate.js'
import { deleteUserById } from '../../use-cases/users/delete-user-by-id.js'
import { getAllUsers } from '../../use-cases/users/get-all-users.js'
import { getUserById } from '../../use-cases/users/get-user-by-id.js'
import { registerUser } from '../../use-cases/users/register-user.js'
import { updateUserProfile } from '../../use-cases/users/update-user-profile.js'
import {
  deleteUserSchema,
  getAllUsersSchema,
  getUserByIdSchema,
  loginSchema,
  registerSchema,
  updateUserProfileSchema,
} from './schema.js'

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  app.post(
    '/auth/register',
    { schema: registerSchema },
    async (request, reply) => {
      const registerSchema = z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string(),
      })

      const data = registerSchema.parse(request.body)

      const userId = await registerUser(data)

      return reply.status(201).send({ userId })
    },
  )

  app.post('/auth/login', { schema: loginSchema }, async (request, reply) => {
    const authSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const data = authSchema.parse(request.body)

    const { user } = await authenticateUser(data)

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return { token }
  })

  app.get(
    '/',
    {
      onRequest: [app.authenticate, verifyUserRole('admin')],
      schema: getAllUsersSchema,
    },
    async (request, reply) => {
      const { users } = await getAllUsers()

      return { users }
    },
  )

  app.get(
    '/profile',
    { onRequest: [app.authenticate], schema: getUserByIdSchema },
    async (request, reply) => {
      const user = await getUserById(request.user.sub)

      return { user }
    },
  )

  app.put(
    '/',
    { onRequest: [app.authenticate], schema: updateUserProfileSchema },
    async (request, reply) => {
      const userChangesSchema = z.object({
        username: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
      })

      const changes = userChangesSchema.parse(request.body)

      const { user } = await updateUserProfile(request.user.sub, changes)

      return reply.send({ user })
    },
  )

  app.delete(
    '/',
    { onRequest: [app.authenticate], schema: deleteUserSchema },
    async (request, reply) => {
      const { id } = userParamsSchema.parse(request.params)

      await deleteUserById(request.user.sub)

      return reply.status(204).send()
    },
  )
}
