FROM node:12

WORKDIR /app

COPY ./app .

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
