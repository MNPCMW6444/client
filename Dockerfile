# First stage: complete build with devDependencies
FROM node:lts AS builder

WORKDIR /app

# Set up environment variable for npm
ARG NPM_TOKEN

# Copy package.json into the Docker image
COPY package.json /app/package.json

# Create the .npmrc file
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc
RUN echo "@failean:registry=https://npm.pkg.github.com" >> .npmrc

# Install the npm dependencies

COPY public /app/public
COPY src /app/src
COPY website /app/website
COPY server.js /app/server.js


# If you have a typescript compile step, add it here
# RUN npm run tsc

# Build the production assets
RUN npm run prod

# Remove the .npmrc file after installing dependencies
RUN rm -rf .npmrc

# Second stage: setup for production
FROM node:lts

WORKDIR /app

COPY packageserver.json /app/package.json

# Install only production dependencies
RUN npm install

# Copy built assets from builder stage
COPY --from=builder /app/build /app/build
COPY --from=builder /app/website /app/website

# Copy server file
COPY server.js /app/server.js

# Expose port 5999
EXPOSE 5999
