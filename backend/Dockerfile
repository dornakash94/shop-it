FROM node:lts-alpine
RUN apk update && apk --no-cache --update add build-base 
WORKDIR /usr/shop-it/backend
COPY shared ../shared
COPY backend/package.json ./
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm install
RUN npm run build

FROM node:lts-alpine
WORKDIR /usr/shop-it/backend
COPY shared ../shared
COPY backend/package.json ./
COPY backend/tsconfig.json ./
RUN npm install --only=production
COPY --from=0 /usr/shop-it/backend/dist ./dist
RUN npm install pm2 -g
EXPOSE 80
USER node
CMD ["pm2-runtime","dist/index.js"]
