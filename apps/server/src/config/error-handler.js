import { ZodError } from 'zod'

/**
 *
 * @param {import('fastify').FastifyError} error
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 * @returns
 */
export async function errorHandler(error, request, reply) {
  if (error instanceof ZodError) {
    return reply.badRequest(
      `Validation Error: ${JSON.stringify(error.flatten().fieldErrors)}`,
    )
  }

  if (error.name === 'InvalidCredentialsError') {
    return reply.badRequest(error.message)
  }

  if (error.name === 'UserAlreadyExistsError') {
    return reply.conflict(error.message)
  }

  if (error.name === 'NotFoundError') {
    return reply.notFound(error.message)
  }

  if (error.statusCode === 401) {
    return error
  }

  if (error.statusCode === 403) {
    return error
  }

  if (error)
    return reply.internalServerError(`Internal Server Error: ${error.message}`)
}
