import fastifyMongodb from "@fastify/mongodb";
import fastifyPlugin from "fastify-plugin";
import { env } from "../config/env.js";

export const mongodb = fastifyPlugin(async (app) => {
  await app.register(fastifyMongodb, {
    forceClose: true,
    url: env.MONGODB_URL
  });
});
