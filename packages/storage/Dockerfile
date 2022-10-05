ARG node_version=16.16-alpine
FROM node:${node_version} AS base

WORKDIR /app
COPY package*.json tsconfig.json ./
COPY packages packages

FROM base
WORKDIR /app

ENV NODE_ENV production

RUN npm ci --include-workspace-root -w packages/common -w packages/storage 

CMD ["npm", "run", "storage"]
