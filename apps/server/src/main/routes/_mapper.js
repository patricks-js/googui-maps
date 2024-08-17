import fastifyPlugin from 'fastify-plugin'
import { mapRoutes } from './map.routes.js'
import { obstacleRoutes } from './obstacle.routes.js'
import { pathRoutes } from './path.routes.js'
import { routeRoutes } from './route.routes.js'
import { userRoutes } from './user.routes.js'
import { waypointsRoutes } from './waypoint.routes.js'

export const routeMapper = fastifyPlugin(async (app) => {
  app.register(registerRoutes, { prefix: '/api' })
})

async function registerRoutes(app) {
  app.register(userRoutes, { prefix: '/users' })
  app.register(mapRoutes, { prefix: '/map' })
  app.register(obstacleRoutes, { prefix: '/obstacles' })
  app.register(waypointsRoutes, { prefix: '/waypoints' })
  app.register(routeRoutes, { prefix: '/route' })
  app.register(pathRoutes, { prefix: '/path' })
}
