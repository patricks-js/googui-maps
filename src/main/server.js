import mongoose from "mongoose";
import app from "./config/app.js";
import { env } from "./config/env.js";

// * Server
const port = env.PORT || 3333;
const host = "0.0.0.0";

try {
  app.log.info("Connecting to MongoDB...");
  await mongoose.connect(env.MONGODB_URL);
  app.log.info("Connected to MongoDB");

  app.log.info("Starting server...");
  await app.listen({ port, host });
  app.log.info(`HTTP server up. Docs available at http://${host}:${port}/docs`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
