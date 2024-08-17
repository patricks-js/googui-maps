export function verifyUserRole(role) {
  /**
   *
   * @param {import("fastify").FastifyRequest} request
   * @param {import("fastify").FastifyReply} reply
   * @returns
   */
  return async (request, reply) => {
    const user = request.user

    if (user.role !== role) {
      return reply.forbidden('Insufficient permissions')
    }
  }
}
