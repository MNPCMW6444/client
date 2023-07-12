# Use the Node.js LTS release
FROM node:lts

# Set the working directory
WORKDIR /app

# Set up environment variable for npm
ARG NPM_TOKEN

# Copy package.json into the Docker image
COPY package.json ./

# Create the .npmrc file
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc
RUN echo "@failean:registry=https://npm.pkg.github.com" >> .npmrc

# Install the npm dependencies
RUN npm install

# Build the production assets
RUN npm run prod

# Expose port 5999
EXPOSE 5999

# The command that starts our app
CMD [ "npm", "start" ]
