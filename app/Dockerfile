FROM node:lts-alpine

COPY package.json pnpm-lock.yaml /app/

WORKDIR /app 

RUN npm install -g pnpm

RUN pnpm install

RUN rm -rf /node_modules/.vite

COPY . /app

ENV DOCKER=true

EXPOSE 51818
