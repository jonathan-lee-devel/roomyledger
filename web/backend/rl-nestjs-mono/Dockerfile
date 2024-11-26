FROM --platform=linux/amd64 node:20.17.0-alpine3.20 AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

FROM --platform=linux/amd64 node:20.17.0-alpine3.20 AS build

WORKDIR /usr/src/app

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node prisma/ ./prisma

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn run build

RUN npx prisma generate

ENV NODE_ENV production

USER node

FROM --platform=linux/amd64 node:20.17.0-alpine3.20 AS production

COPY --chown=node:node --from=build /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD [ "sh", "-c", "yarn run start:prod" ]
