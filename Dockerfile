FROM node:alpine

# Create app directory
WORKDIR /app

# Copy Repository
COPY ./ /app

# Install packages with yarn
RUN yarn

# Set env to production
ENV NODE_ENV production

# Build the nestjs app
RUN yarn build

# Start the app
CMD yarn start

# bind to port 3000
EXPOSE 3000
