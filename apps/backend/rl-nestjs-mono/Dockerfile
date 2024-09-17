# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine as base

LABEL fly_launch_runtime="NestJS"

# NestJS app lives here
WORKDIR /app

# Set production environment
ARG NODE_ENV

# Throw-away build stage to reduce size of final image
FROM base as build

WORKDIR /app

# Install node modules
COPY package*.json ./

RUN yarn install

# Copy application code
COPY --link . .

RUN yarn run db:generate

# Build application
RUN yarn run build

FROM base

COPY --from=build /app /app

EXPOSE 4000

ARG DATABASE_URL
ARG EMAIL_PASSWORD
ARG EMAIL_USER
ARG FRONT_END_URL
ARG JWT_EXPIRES_IN
ARG JWT_SECRET
ARG NODE_ENV
ARG STRIPE_API_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG SUPABASE_URL
ARG SUPABASE_KEY
ARG SUPABASE_JWT_SECRET
ARG ENV

CMD [ "yarn", "run", "start:prod" ]
