FROM node:12-alpine
WORKDIR /usr/src/app
COPY ./ .
RUN npm i --production

EXPOSE 3000
CMD ["node", "start.js"]
