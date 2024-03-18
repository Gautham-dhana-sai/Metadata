FROM node:16.20-alpine AS node

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "src/server.js"]

FROM mongo:latest AS mongo

EXPOSE 27017

CMD ["mongod"]