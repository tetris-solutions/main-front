#Tetris Front

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Preparação

- certifique-se que você está rodando Linux ou OS X
- instale o node & npm
- `npm login` - _pra ter acesso aos módulos privados_
- `npm install`

## Serviços requiridos

O front precisa ter uma conexão para:
- a [user-api](https://github.com/tetris-solutions/user-api), que pode estar rodando na mesma máquina ou não - configurável através da variável de ambiente `USER_API_URL`.
- uma instância do logstash - configurável através da variável de ambiente `LOGSTASH_HOST`

## Configuração

[A configuração é feita através de variáveis ambiente](http://12factor.net/config). Existem duas opções: 
- arquivo `.env` na raiz do projeto - que é lido pelo [dotenv](http://npmjs.com/dotenv) e injetado como variáveis de ambiente no processo.
- variáveis ambiente já previamente definidas - que conforme descrito na documentação do **dotenv**, sobrescreve as variáveis do `.env`

Fica a critério se você pretende usar uma delas ou as duas. Usar apenas o `.env` é o mais fácil.

## Instalando localmente

Caso não tenha uma instalação remota acessível, você pode  clonar o projeto [user-api](https://github.com/tetris-solutions/user-api) e o projeto [infra](https://github.com/tetris-solutions/infra) e executá-los localmente.

## Iniciando a aplicação

```sh
npm start
```

Agora você já pode abrir $FRONT_URL:3000 no browser, $FRONT_URL é uma variável definida no `.env`.

## Arquitetura

Todo código editável se encontra em `src`. A aplicação segue o paradigma [javascript universal](https://strongloop.com/strongblog/the-foundations-of-universal-or-isomorphic-javascript/), utilizando [express](http://expressjs.com/) como servidor e [React](https://facebook.github.io/react) (+[Baobab](http://npmjs.com/baobab) e [React-Router](http://npmjs.com/react-router)) para construção da UI. Existem dois pontos de entrada, e os nomes devem ser bem auto-explicativos: `client.js` e `server.js`.

## Estilo

Javascript, [ES2015](https://babeljs.io/docs/learn-es2015/), seguindo o [standard](http://standardjs.com/). 