import { FastifyInstance } from "fastify";
import mongoose from "mongoose";

export const connectDb = async (fastify: FastifyInstance) => {
  try {
    const mongoConnection = await mongoose.connect(process.env.MONGOURI!);
    fastify.log.info("mongoose connected");
  } catch (e) {
    fastify.log.error("mongoose err", e);
  }
};
