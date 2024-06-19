# Fastify Boilerplate

-- Edit Me

This boilerplate uses prisma as an ORM

## Usage
```bash
# ignore commit history
git clone --depth 1 -b prisma

# replace origin remote
git remove origin
git add origin <your-repo-link>
```

## Quick Start
```bash
# install packages
yarn

# dev mode
yarn dev

# build
yarn build

# production mode
NODE_ENV=production
yarn start
```

## Customization
See `app.ts` to customize the services being used in this server.

- Prisma DB Orm (decorates `FastifyInstance` with `prisma` connection)
- Mq (decorates `FastifyInstance` with `mq` object that maps queue names to `Queue` objects)

Edit the necessary files under `src/plugin` directory to meet your needs.

## Structure
`/routes` - The api routes\
`/controllers` - The business logics to attach to the api routes\
`/middleware` - Refer to [fastify lifecycles](https://fastify.dev/docs/latest/Reference/Lifecycle/#lifecycle) for proper middleware usage and hooks\
`/plugins` - Fastify plugins to subscribe to necessary services (eg. redis, socket.io, etc...)

## Resources
- [Serverless](https://fastify.dev/docs/v4.15.x/Guides/Serverless/)
- [Plugins and ecosystem](https://fastify.dev/ecosystem/)
