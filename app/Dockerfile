FROM node:18-alpine

WORKDIR /app 

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
  pnpm install && \
  rm -rf /node_modules/.vite

COPY . .

ENV DOCKER=true

EXPOSE 51818
