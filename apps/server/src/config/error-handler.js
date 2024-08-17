import { ZodError } from 'zod'
import { InvalidCredentialsError } from '../use-cases/_errors/invalid-credentials.js'
import { NotFoundError } from '../use-cases/_errors/not-found.js'
import { UserAlreadyExistsError } from '../use-cases/_errors/user-already-exists.js'

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

  if (error instanceof InvalidCredentialsError) {
    return reply.badRequest(error.message)
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.conflict(error.message)
  }

  if (error instanceof NotFoundError) {
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
