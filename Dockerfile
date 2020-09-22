FROM node:12-alpine

RUN  mkdir /usr/app
WORKDIR /usr/app
COPY  package.json tsconfig.json .sequelizerc ./
COPY src ./src
RUN  npm install
RUN ./node_modules/bin/sequelize db:migrate
CMD [ "npm", "run", "start" ]

