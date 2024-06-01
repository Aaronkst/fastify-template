import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import User from "../models/Users";

export const list = async (req: FastifyRequest, res: FastifyReply) => {
  const users = await User.find();
  const count = await User.countDocuments();
  return res.code(200).send({ users, count });
};
