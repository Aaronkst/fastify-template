import { FastifyInstance } from "fastify";
import { list } from "@/controllers/users.controller";
import { bearerAuth } from "@/middlewares/auth";
import { listValidation } from "@/schemas/users/users.validation";
import { responseSerialization } from "@/schemas/response.serialization";

export const userRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    "/api/users",
    {
      preHandler: bearerAuth,
      schema: {
        querystring: listValidation,
        response: responseSerialization("users", "array"),
      },
    },
    list,
  );
};
