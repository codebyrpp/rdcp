FROM node:20.17-alpine AS build-stage

WORKDIR /app

# Copy package.json and yarn.lock for faster installation
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the Vite app for production
RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built app from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Set the default Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
