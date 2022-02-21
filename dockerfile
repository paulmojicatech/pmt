FROM node:lts-alpine

WORKDIR /app/marvintherapy-public
COPY ./dist/apps/marvintherapy-public/.next ./.next
COPY ./dist/apps/marvintherapy-public/public ./public
COPY ./dist/apps/marvintherapy-public/next.config.js ./next.config.js
COPY ./dist/apps/marvintherapy-public/package.json ./package.json
RUN npm i

CMD ["node_modules/.bin/next", "start"]


