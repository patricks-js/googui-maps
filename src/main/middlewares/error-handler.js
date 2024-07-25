import { ZodError } from "zod";
import {
  BadRequestError,
  NotFoundError,
  ServerError
} from "../../http/errors.js";
import { badRequest, notFound, serverError } from "../../http/http-helpers.js";

export async function errorHandler(error, request, reply) {
  if (error instanceof ZodError) {
    return reply.status(400).send(
      badRequest({
        message: "Error validating request body",
        errors: error.flatten().fieldErrors
      })
    );
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send(
      badRequest({
        message: error.message,
        errors: error.details || []
      })
    );
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send(
      notFound({
        message: error.message
      })
    );
  }

  if (error instanceof ServerError) {
    return reply.status(500).send(
      serverError({
        message: error.message
      })
    );
  }

  return reply.status(500).send(
    serverError({
      message: "Internal Server Error"
    })
  );
}
