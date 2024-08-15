import { ServerError } from './errors.js'

export const badRequest = (error) => ({
  statusCode: 400,
  body: error,
})

export const serverError = (error) => ({
  statusCode: 500,
  body: new ServerError(error.message),
})

export const notFound = (error) => ({
  statusCode: 404,
  body: error,
})

export const ok = (data) => ({
  statusCode: 200,
  body: data,
})

export const created = (data) => ({
  statusCode: 201,
  body: data,
})
