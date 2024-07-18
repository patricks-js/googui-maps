import Fastify from "fastify";
import mongoose from "mongoose";
import { env } from "./config/env.js";
import { cors } from "./middlewares/cors.js";
import { openapi } from "./plugins/openapi.js";
import { scalarUi } from "./plugins/scalar.js";
import { mapRoutes } from "./routes/map.routes.js";
import { obstacleRoutes } from "./routes/obstacle.routes.js";
import { pathRoutes } from "./routes/path.routes.js";
import { userRoutes } from "./routes/user.routes.js";

const app = Fastify({
  logger: true
});

// * Middlewares
app.register(cors);

// * Plugins
app.register(openapi);
app.register(scalarUi);

// * Routes
app.register(userRoutes, { prefix: "/api/users" });
app.register(mapRoutes, { prefix: "/api/maps" });
app.register(obstacleRoutes, { prefix: "/api/obstacles" });

app.register(pathRoutes, { prefix: "api/path" });
// * Server
const port = env.PORT || 3333;
const host = "0.0.0.0";

try {
  await mongoose.connect(env.MONGODB_URL);
  await app.listen({ port, host });
  console.info(`HTTP server listen on: ${port}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
