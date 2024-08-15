import Fastify from 'fastify'
import { cors } from '../middlewares/cors.js'
import { errorHandler } from '../middlewares/error-handler.js'
import { openapi } from '../plugins/openapi.js'
import { scalarUi } from '../plugins/scalar.js'
import { routeMapper } from '../routes/_mapper.js'

const app = Fastify({
  logger: true,
})

// * Plugins & Middlewares
app.register(cors)
app.register(openapi)
app.register(scalarUi)

// * Routes
app.register(routeMapper)

// * Error Handler
app.setErrorHandler(errorHandler)

export default app
