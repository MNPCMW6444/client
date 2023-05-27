# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY .npmrc ./
ENV NPM_TOKEN=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

# Install dependencies
RUN npm i

# Copy the rest of the application code to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Use the official Nginx image to serve the built application
FROM nginx:stable-alpine

# Copy the built application from the Node.js container to the Nginx container
COPY --from=0 /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
