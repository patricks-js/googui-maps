import fastifySwagger from "@fastify/swagger";
import fastifyPlugin from "fastify-plugin";

export const openapi = fastifyPlugin(async (app) => {
  app.register(fastifySwagger, {
    openapi: {
      openapi: "3.1.0",
      info: {
        title: "Googui Maps",
        description: "OpenAPI specification for Googui Maps API",
        version: "1.0.0"
      },
      servers: [
        {
          url: "http://localhost:3333",
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
});
