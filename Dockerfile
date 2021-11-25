FROM node:lts AS builder

COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY ./src ./src
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./nest-cli.json ./

RUN npm run build

FROM node:lts-alpine

WORKDIR /usr/app

COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./dist ./dist
COPY package.json ./

EXPOSE 3000

CMD ["npm", "run", "start:prod"]