FROM node:latest

# prepara dependencias npm
ADD .npmrc /tmp
ADD package.json /tmp/package.json
ADD node_modules /tmp/node_modules
RUN cd /tmp && npm install

# copia dependencias pra pasta da aplicação
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

# muda pra pasta destino
WORKDIR /opt/app
ADD . /opt/app

CMD ["npm", "start"]