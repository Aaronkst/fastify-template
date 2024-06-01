import { bootstrapServer } from "./app";

bootstrapServer()
  .then((server) => {
    server.listen({ port: 3000 }, function (err, address) {
      if (err) {
        server.log.error(err);
        process.exit(1);
      }
      server.log.info(`Server is now listening on ${address}`);
    });
  })
  .catch((err) => {
    console.error("error starting server", err);
  });
