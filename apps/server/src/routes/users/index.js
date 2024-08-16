import { z } from 'zod'
import { createUser } from '../../../data/usecases/user/create-user.js'
import { deleteUser } from '../../../data/usecases/user/delete-user.js'
import { findUser } from '../../../data/usecases/user/find-user.js'
import { updateUser } from '../../../data/usecases/user/update-user.js'
import { validators } from '../../validators.js'

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  _id: z.string(),
})

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */

export default async function (app) {
  app.post('/', async (request, reply) => {
    const body = userSchema.parse(request.body)

    return createUser(body)
  })

  app.get('/:id', async (request, reply) => {
    const { id } = validators.idParamSchema(request.params)

    return findUser(id)
  })

  app.put('/:id', async (request, reply) => {
    const { id } = validators.idParamSchema(request.params)
    const changes = userSchema.parse(request.body)

    return updateUser(id, changes)
  })

  app.delete('/:id', async (request, reply) => {
    const { id } = validators.idParamSchema(request.params)

    return deleteUser(id)
  })
}
