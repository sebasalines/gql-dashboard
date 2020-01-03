FROM node:10

WORKDIR /usr/src/app
RUN chown node:node .
USER node

COPY . /usr/src/app/
RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start"]
