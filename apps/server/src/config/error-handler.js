import { ZodError } from 'zod'
import { BadRequestError, NotFoundError, ServerError } from '../http/errors.js'
import { badRequest, notFound, serverError } from '../http/http-helpers.js'

/**
 *
 * @param {import('fastify').FastifyError} error
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 * @returns
 */
export async function errorHandler(error, request, reply) {
  if (error instanceof ZodError) {
    return reply.status(400).send(
      badRequest({
        message: 'Validation Error',
        errors: error.flatten().fieldErrors,
      }),
    )
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send(
      badRequest({
        message: error.message,
        errors: error.stack || [],
      }),
    )
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send(
      notFound({
        message: error.message,
      }),
    )
  }

  if (error instanceof ServerError) {
    return reply.status(500).send(
      serverError({
        message: error.message,
      }),
    )
  }

  return reply.status(500).send(
    serverError({
      message: 'Internal Server Error',
    }),
  )
}
