FROM node:16-alpine

WORKDIR ./frontend/

COPY package*.json ./frontend/
RUN yarn install

COPY . ./frontend/

CMD ["yarn", "start"]