FROM node:19-alpine

WORKDIR /usr/app
RUN npm install -g pm2
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["pm2", "serve", "dist", "5432", "--spa", "--no-daemon"]
