FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts as BUILDER
WORKDIR /app
ARG NPM_TOKEN
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY public /app/public
COPY src /app/src
COPY website /app/website
COPY server.js /app/server.js
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc
RUN echo "@failean:registry=https://npm.pkg.github.com" >> .npmrc
RUN npm run prod
RUN npm run clean:p
RUN npm i --omit=dev
RUN rm -rf .npmrc
RUN rm -rf .npmrc
FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts-slim
WORKDIR /app
COPY packageserver.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
COPY --from=builder /app/website /app/website
COPY server.js /app/server.js
CMD ["node", "./build"]
EXPOSE 5999
