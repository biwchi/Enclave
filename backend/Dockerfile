FROM node:20.4.0

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY . ./

RUN npm run build

CMD [ "npm", "run", "start:prod" ]