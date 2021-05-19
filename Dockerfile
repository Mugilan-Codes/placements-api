# syntax=docker/dockerfile:1

FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

# COPY ["package.json", "package-lock.json*", "./"]
COPY package*.json ./

RUN npm install --production

COPY . .

RUN npm run build

USER node

CMD ['node', "dist/server.js"]