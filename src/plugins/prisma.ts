import fp from "fastify-plugin";
import { FastifyPluginAsync } from "fastify";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

type PrismaOperation =
  | "create"
  | "update"
  | "delete"
  | "findUnique"
  | "findFirst"
  | "findMany"
  | "aggregate"
  | "count"
  | "groupBy"
  | "upsert"
  | "findRaw"
  | "aggregateRaw";

interface PrismaArgs {
  data: {
    [key: string]: any;
  };
  where?: {
    [key: string]: any;
  };
  [key: string]: any;
}

interface QueryFunction {
  (args: PrismaArgs): Promise<any>;
}

const prismaPlugin: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient().$extends({
    query: {
      auth: {
        $allOperations({
          operation,
          args,
          query,
        }: {
          operation: PrismaOperation;
          args: PrismaArgs;
          query: QueryFunction;
        }) {
          if (
            ["create", "update"].includes(operation) &&
            args.data["password"]
          ) {
            args.data["password"] = bcrypt.hashSync(args.data["password"], 10);
          }
          return query(args);
        },
      },
    },
  });

  await prisma.$connect();

  // Make Prisma Client available through the fastify server instance: server.prisma
  server.decorate("prisma", prisma);

  server.addHook("onClose", async (server) => {
    await server.prisma.$disconnect();
  });
});

export default prismaPlugin;
