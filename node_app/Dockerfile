# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# docker build -t g2zero/node-web-app .

# this docker file would install node_modules inside docker
# and using volume mapping to start project
FROM node:8

ARG PROJECT_PATH=/usr/src/app
ARG NODE_PORT=8080

ENV NODE_PORT=$NODE_PORT

# Create app directory
RUN mkdir -p $PROJECT_PATH
WORKDIR $PROJECT_PATH

# Install app dependencies
# copy shrinkmap.json instead?
COPY package.json $PROJECT_PATH/
RUN npm install

# Bundle app source
# COPY . $PROJECT_PATH


RUN groupadd -r nodejs_user &&\
    useradd -r -g nodejs_user nodejs_user
    
USER nodejs_user

EXPOSE $NODE_PORT
CMD [ "node", "build/server/index.js" ]