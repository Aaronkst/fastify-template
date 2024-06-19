import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

export async function home(req: FastifyRequest, res: FastifyReply) {
  return res.code(200).send("Server is live ✨");
}
