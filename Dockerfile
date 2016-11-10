FROM node:7.1

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /code/

COPY npm-shrinkwrap.json .

RUN npm install

#we use .dockerignore file to exclude some files
COPY . .

EXPOSE 8000

CMD ["make", "run"]
