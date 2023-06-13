# # Build react app
# FROM node:14 as build-image
# WORKDIR /app
# COPY . ./
# RUN npm install --force
# RUN npm run build

# # copy static files and run nginx server
# FROM nginx:alpine
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-image /app/build /usr/share/nginx/html
# COPY ./public.crt /etc/nginx/cert/public.crt
# COPY ./private.key /etc/nginx/cert/private.key
# EXPOSE 80
# EXPOSE 443
# CMD ["nginx", "-g", "daemon off;"]


# Build react app
FROM node:14-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install --production --silent
COPY . .
RUN npm run build

# Production image
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
ADD nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

