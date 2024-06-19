import { FastifyInstance } from "fastify";
import mongoose from "mongoose";

export default async function connectDb(fastify: FastifyInstance) {
  try {
    await mongoose.connect(process.env.MONGOURI!);
    fastify.log.info("mongoose connected");
  } catch (e) {
    fastify.log.error("mongoose err", e);
  }
}
