import fastifySwagger from "@fastify/swagger";
import fastifyScalar from "@scalar/fastify-api-reference";

/**
 *
 * @param {import("fastify").FastifyInstance} app
 */
export async function openAPISpec(app) {
  await app.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Googui Maps",
        description: "Testing the Fastify swagger API",
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server"
        }
      ],
      tags: [
        { name: "user", description: "User related end-points" },
        { name: "map", description: "Map related end-points" },
        { name: "obstacle", description: "Obstacle related end-points" },
        { name: "waypoint", description: "Waypoint related end-points" }
      ],
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here"
      }
    }
  });

  await app.register(fastifyScalar, {
    routePrefix: "/docs",
    configuration: {
      spec: {
        content: () => app.swagger()
      }
    }
  });
}
