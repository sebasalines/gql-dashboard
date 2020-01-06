FROM node:10

WORKDIR /usr/src/app

RUN npm i -g serve
RUN chown node:node .
USER node

COPY --chown=node:node . /usr/src/app/
RUN npm install

EXPOSE 3000

# CMD ["serve", "-s", "-l", "3000", "build"]
CMD ["npm", "start"]
