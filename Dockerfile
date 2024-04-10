# Use the official Node.js 20 image as the build environment
FROM node:20 as builder

# Define build arguments
ARG FEATURE_SET

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install project dependencies
RUN npm install -f && \
    npm cache clean --force

# Copy the whole project
COPY . .

# Conditionally remove unwanted features based on the FEATURE_SET argument
# Ensure only the directory for the specified FEATURE_SET remains
RUN if [ "$FEATURE_SET" = "vistaar" ]; then rm -rf ./src/features/eadp ./src/features/kadp; fi && \
    if [ "$FEATURE_SET" = "eadp" ]; then rm -rf ./src/features/vistaar ./src/features/kadp; fi && \
    if [ "$FEATURE_SET" = "kadp" ]; then rm -rf ./src/features/eadp ./src/features/vistaar; fi

# Expose ports
EXPOSE 3000

# Start server
CMD ["npm", "run", "start"]