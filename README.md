#Tetris Front

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Pré-requisitos

- certifique-se que você está rodando Linux ou OS X
- arquivos de configuração - você vai precisar de dois arquivos ignorados pelo git:
    - [.npmrc](https://www.npmjs.com/private-modules#logging-in) - esse arquivo contém um token que te permite instalar repositórios privados da tetris, você pode obter ele de duas formas:
        - logando no npm localmente e copiando o arquivo gerado (nesse caso você precisa instalar o node/npm) com o comando `npm login` seguido de `cp ~/.npmrc .`
        - pegando o arquivo de algum colega de trabalho
    - [.env](https://github.com/motdotla/dotenv) - esse é o arquivo que contém as _variáveis de ambiente_ que configuram a aplicação, ele segue o modelo do `.env.sample` 
        - se precisar usar as funcionalidades que enviam email, você vai precisar pedir os valores do SMTP a alguém do time
- [instale o docker e o docker-compose](https://docs.docker.com/)

## Iniciando a aplicação

```sh
npm install
source .env
docker-compose up
```

Se você estiver no Linux, já pode abrir localhost:3000 no browser, no caso do OS X você provavelmente vai precisar descobrir o ip da máquina virtual com o [docker-machine](https://docs.docker.com/machine/get-started/).

## Arquitetura

Todo código editável se encontra em `src`. A aplicação segue o paradigma [javascript universal](https://strongloop.com/strongblog/the-foundations-of-universal-or-isomorphic-javascript/), utilizando [express](http://expressjs.com/) como servidor e [React](https://facebook.github.io/react) (+[Baobab](http://npmjs.com/baobab) e [React-Router](http://npmjs.com/react-router)) para construção da UI. Existem dois pontos de entrada, e os nomes devem ser bem auto-explicativos: `client.js` e `server.js`.

## Estilo

Javascript, [ES2015](https://babeljs.io/docs/learn-es2015/), funcional arroz-com-feijão seguindo o [standard](http://standardjs.com/). 

## Infraestrutura

Não foi utilizado um task runner, apenas [npm scripts](http://substack.net/task_automation_with_npm_run) mesmo. A geração do bundle pro browser é feita com o webpack e o babel como transpiler.