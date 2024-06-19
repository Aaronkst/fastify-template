import { FastifyPluginAsync } from "fastify";
import { Queue, QueueEvents, QueueOptions } from "bullmq";

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module "fastify" {
  interface FastifyInstance {
    mq: Record<string, Queue>;
  }
}

type MqOptions = {
  name: string;
};

const bullmqPlugin: FastifyPluginAsync<MqOptions> = async (
  server,
  { name },
) => {
  const redisOptions: QueueOptions = {
    connection: {
      host: process.env.REDIS_URI,
      // port: <port-here>
    },
  };

  const queue = new Queue(name, redisOptions);
  const queueEvents = new QueueEvents(name, redisOptions);

  server.decorate("mq", { [name]: queue });

  queueEvents.on(
    "failed",
    ({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
      server.log.error(`[bull-error:${name}:${jobId}]`, failedReason);
    },
  );
};

export default bullmqPlugin;
