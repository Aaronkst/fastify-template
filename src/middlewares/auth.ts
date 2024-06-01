import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { verify } from "jsonwebtoken";

declare module "fastify" {
  interface FastifyRequest {
    user?: string; // edit string to your desired object to pass
  }
}

export const basicAuth = async (req: FastifyRequest, res: FastifyReply) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Basic "))
    return res.code(401).send({ message: "Unauthorized" });
  const encoded = authorization.split(" ")[1];

  try {
    const decoded = verify(encoded, process.env.JWTSECRET!);
    // use decoded object to check user
    req.user = "your user object here";
  } catch (err) {
    req.log.error("Auth Err", err);
    return res.code(401).send({ message: "Unauthorized" });
  }
};

export const bearerAuth = async (req: FastifyRequest, res: FastifyReply) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer "))
    return res.code(401).send({ message: "Unauthorized" });
  const encoded = authorization.split(" ")[1];

  try {
    const decoded = verify(encoded, process.env.JWTSECRET!);
    // use decoded object to check user
    req.user = "your user object here";
  } catch (err) {
    req.log.error("Auth Err", err);
    return res.code(401).send({ message: "Unauthorized" });
  }
};
