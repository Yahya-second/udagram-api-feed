FROM node:10.19.0

WORKDIR /www/app

COPY . .

RUN npm install

RUN npm install @types/express --save-dev

RUN npm install dotenv --save

EXPOSE 8080

CMD ["npm", "run", "dev"]
