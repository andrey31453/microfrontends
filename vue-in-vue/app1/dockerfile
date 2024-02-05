FROM node:20.10-alpine

ARG workdir

WORKDIR $workdir
COPY package*.json .
RUN npm i
COPY . .
CMD npm run dev