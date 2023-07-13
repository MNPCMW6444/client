FROM node:lts

WORKDIR /app

RUN touch /app/testfile
RUN ls -al /app
