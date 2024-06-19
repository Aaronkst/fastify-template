import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { FastifyInstance } from "fastify";

export async function list(
  this: FastifyInstance,
  req: FastifyRequest,
  res: FastifyReply,
) {
  const users = await this.prisma.users.findMany();
  const count = await this.prisma.users.count();
  return res.code(200).send({ users, count });
}
