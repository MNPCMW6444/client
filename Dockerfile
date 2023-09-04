FROM node:lts as BUILDER
ARG NPMTOKEN
RUN echo $NPMTOKEN
WORKDIR /app
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY public /app/public
COPY src /app/src
COPY website /app/website
COPY server.js /app/server.js
COPY .npmrc /app/.npmrc
RUN npm run prod
RUN npm run clean:prod
RUN npm i --omit=dev
RUN rm -rf .npmrc
FROM node:lts-slim
WORKDIR /app
COPY package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
COPY --from=builder /app/website /app/website
COPY --from=builder /app/src/manifestJSONData.js /app/src/manifestJSONData.js
COPY server.js /app/server.js
CMD ["node", "./server.js"]
EXPOSE 5999