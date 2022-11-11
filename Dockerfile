FROM node:alpine3.15

WORKDIR /app

COPY . .

EXPOSE 9001

RUN npm install

CMD ["npm", "start"]
