#FROM node:20-alpine as builder

#WORKDIR /app

#COPY package.json package-lock.json* ./

# Install build dependencies for native modules and project dependencies
#RUN apk add --no-cache make gcc g++ python3 && \
#    npm i -f && \
#    npm cache clean --force

#COPY . .

#EXPOSE 3000

#CMD ["npm", "run", "start"]


FROM node:20 as build-image
WORKDIR /app
COPY package*.json ./
RUN export NODE_OPTIONS=--max-old-space-size=4096
RUN npm install --force
COPY . .

RUN npm run build

# copy static files and run nginx server
FROM nginx:alpine

COPY --from=build-image /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]