
# first step
#FROM node:18-alpine AS build
FROM node:16 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/front/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
