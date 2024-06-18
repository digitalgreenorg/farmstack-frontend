FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json* ./

# Install build dependencies for native modules and project dependencies
RUN apk add --no-cache make gcc g++ python3 && \
    npm i -f && \
    npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]