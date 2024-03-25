FROM node:16.20-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 2000

CMD ["npm", "run", "start"]