FROM node:10.15.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]