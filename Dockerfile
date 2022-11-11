FROM node:alpine3.15

WORKDIR /app

COPY . .

EXPOSE ${PORT}

RUN npm install

CMD ["npm", "start"]
