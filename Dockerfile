FROM node:lts
WORKDIR /app
COPY package.json ./
COPY .npmrc ./
ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" >> .npmrc
RUN npm i
RUN rm -f .npmrc
COPY . .
RUN npm start
EXPOSE 5999
