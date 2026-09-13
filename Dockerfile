# syntax=docker/dockerfile:1

ARG NODE_IMAGE=node:26-alpine
ARG RUNTIME_IMAGE=alpine:3.22

FROM ${NODE_IMAGE} AS builder

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
WORKDIR /app

RUN npm install -g corepack@0.36.0 && corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable

COPY tsconfig.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src
RUN yarn build


FROM builder AS test

COPY test ./test
RUN yarn typecheck && yarn test


FROM ${RUNTIME_IMAGE} AS runtime

RUN apk upgrade --no-cache

COPY --from=builder /app/build /app/build

CMD ["sh", "-c", "find /export -mindepth 1 -delete && cp -a /app/build/. /export/"]
