# Stage 1: Install dependencies
FROM node:14 as dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --force

# Stage 2: Build the app
FROM node:14 as build
WORKDIR /app
COPY . ./
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# copy static files and run nginx server
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-image /app/build /usr/share/nginx/html
COPY ./public.crt /etc/nginx/cert/public.crt
COPY ./private.key /etc/nginx/cert/private.key
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

