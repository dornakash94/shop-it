FROM node:lts-alpine as build
WORKDIR /usr/shop-it/frontend
COPY shared ../shared
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
COPY frontend/tsconfig.json ./
RUN npm ci --silent
COPY frontend/public ./public
COPY frontend/src ./src
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /usr/shop-it/frontend/build /usr/share/nginx/html
COPY frontend/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]