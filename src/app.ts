import fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

// PLUGINS
import { fastifyCors } from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import { bullmqPlugin, prismaPlugin } from "./plugins";

// ROUTES
import { homeRoute } from "./routes/home.route";
import { userRoute } from "./routes/users.route";
import { fastifyHelmet } from "@fastify/helmet";

enum ENVS {
  LOCAL = ".env.local",
  STAGING = ".env.staging",
  PRODUCTION = ".env.production",
}

const getEnvFile = (): string => {
  switch (process.env.NODE_ENV) {
    case "production":
      return ENVS.PRODUCTION;
    case "staging":
      return ENVS.STAGING;
    default:
      return ENVS.LOCAL;
  }
};

const server = fastify({
  logger: true,
}).withTypeProvider<JsonSchemaToTsProvider>();

export const bootstrapServer = async (): Promise<FastifyInstance> => {
  try {
    const envFilePath = getEnvFile();

    server.log.info(`This is ${process.env.NODE_ENV || "local"} environment`);

    dotenv.configDotenv({
      path: envFilePath,
    });

    // database and other necessary services registration
    await server.register(prismaPlugin);

    // Use this plugin for redis mq
    // await server.register(bullmqPlugin, {
    //   name: "QueueName",
    // });

    await server.register(fastifyHelmet);
    await server.register(fastifyCors, {
      allowedHeaders: [
        "Accept",
        "Authorization",
        "Content-Type",
        "If-None-Match",
      ], // default allowed headers
    });
    await server.register(fastifyFormbody);

    // routes registration
    await server.register(homeRoute);
    await server.register(userRoute);

    return server;
  } catch (err) {
    throw err;
  }
};
