# syntax=docker/dockerfile:1
ARG NODE_VERSION=15-alpine

FROM node:${NODE_VERSION} as node

FROM node as base
WORKDIR /app
COPY [ "package.json", "package-lock.json", "babel.config.json", "wait-for.sh", "./" ]
RUN chmod +x wait-for.sh
ENV PORT 3000
EXPOSE ${PORT}

FROM base as build
RUN npm install
COPY . .
RUN npm run build

FROM base as prod
ENV NODE_ENV=production
RUN npm ci --only=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/nginx ./nginx
CMD [ "npm", "run", "start:prod" ]

FROM base as dev
ENV NODE_ENV=development
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]