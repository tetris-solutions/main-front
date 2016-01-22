FROM node:latest
ADD .npmrc /code/
RUN mkdir -p /code
WORKDIR /code
ADD package.json /code/
RUN npm install
ADD . /code/