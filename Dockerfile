FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json* ./

# Install build dependencies for native modules and project dependencies
RUN apk add --no-cache make gcc g++ python3 && \
    npm i -f && \
    npm cache clean --force

COPY . .

ARG FEATURE_SET

# RUN case "$FEATURE_SET" in \
#     vistaar) rm -rf ./src/features/eadp ./src/features/kadp ;; \
#     eadp) rm -rf ./src/features/vistaar ./src/features/kadp ;; \
#     kadp) rm -rf ./src/features/eadp ./src/features/vistaar ;; \
#     *) echo "No feature set specified, or unknown FEATURE_SET value" ;; \
#     esac

EXPOSE 3000

CMD ["npm", "run", "start"]