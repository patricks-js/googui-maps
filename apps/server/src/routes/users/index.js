/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export default async function (app) {
  const users = []

  app.post('/', async (request, reply) => {
    reply.notFound('User not found')
  })

  app.get('/:id', async (request, reply) => {
    return users.find((user) => user._id === request.params.id)
  })

  app.put('/:id', async (request, reply) => {
    const userIndex = users.findIndex((user) => user._id === request.params.id)
    users[userIndex] = request.body
    return { message: 'User updated', users }
  })

  app.delete('/:id', async (request, reply) => {
    const userIndex = users.findIndex((user) => user._id === request.params.id)
    users.splice(userIndex, 1)
    return { message: 'User deleted', users }
  })
}
