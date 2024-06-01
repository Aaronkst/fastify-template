# Fastify Boilerplate

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

## Structure
`/routes` - The api routes\
`/controllers` - The business logics to attach to the api routes\
`/middleware` - Refer to [fastify lifecycles](https://fastify.dev/docs/latest/Reference/Lifecycle/#lifecycle) for proper middleware usage and hooks\
`/plugins` - Fastify plugins to subscribe to necessary services (eg. redis, socket.io, etc...)

## Resources
- [Serverless](https://fastify.dev/docs/v4.15.x/Guides/Serverless/)
- [Plugins and ecosystem](https://fastify.dev/ecosystem/)
