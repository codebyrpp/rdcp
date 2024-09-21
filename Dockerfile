# Stage 1: Build the Vite app
FROM node:16-alpine as build-stage

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]