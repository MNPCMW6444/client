FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts as BUILDER
WORKDIR /app
RUN apt-get update && \
    apt-get install -y unzip curl && \
    curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install
COPY ~/.aws/credentials /root/.aws/credentials
COPY ~/.aws/config /root/.aws/config
COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
COPY public /app/public
COPY src /app/src
COPY website /app/website
COPY server.js /app/server.js
RUN npm run prod
RUN npm run clean:p
RUN npm i --omit=dev
RUN rm -rf .npmrc
FROM 988253048728.dkr.ecr.us-east-1.amazonaws.com/node:lts-slim
WORKDIR /app
COPY package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/build /app/build
COPY --from=builder /app/website /app/website
COPY server.js /app/server.js
CMD ["node", "./server.js"]
EXPOSE 5999