import { FastifySchema } from "fastify";

export const listValidation: FastifySchema["querystring"] = {
  type: "object",
  properties: {
    page: { type: "number" },
    perPage: { type: "number" },
  },
};
