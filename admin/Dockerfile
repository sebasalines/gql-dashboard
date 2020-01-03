FROM node:10

WORKDIR /usr/src/app
RUN npm install -g serve
RUN chown node:node .
USER node

COPY --chown=node:node . /usr/src/app/
RUN npm install

EXPOSE 4200

# CMD ["serve", "-s", "-l", "4200", "dist/testangular"]
CMD ["npm", "start"]
