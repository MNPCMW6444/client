FROM node:lts
WORKDIR /app
COPY package.json ./
ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc
RUN npm run prod
RUN npm start
EXPOSE 5999
