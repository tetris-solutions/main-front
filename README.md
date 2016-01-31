#Tetris Front

## Prerequisitos

- certifique-se que você está rodando Linux ou OS X
- arquivos de configuração - você vai precisar de dois arquivos ignorados pelo git:
    - `.npmrc` - esse arquivo contém um token que te permite instalar repositórios privados da tetris, você pode obter ele de duas formas:
        - logando no npm localmente e copiando o arquivo gerado (nesse caso você precisa instalar o node/npm) com o comando `npm login` seguido de `cp ~/.npmrc .`
        - pegando o arquivo de algum colega de trabalho
    - `.env` - esse é o arquivo que contém as _variáveis de ambiente_ que configuram a aplicação, ele segue o modelo do `.env.sample` 
        - se precisar usar as funcionalidades que enviam email, você vai precisar pedir os valores do SMTP a alguém do time
- [instale o docker e o docker-compose](https://docs.docker.com/)

## Rodando a aplicação

```sh
source .env
docker-compose up
```

Se você estiver no Linux, já pode abrir localhost:3000 no browser, no caso do OS X você provavelmente vai precisar descobrir o ip da máquina virtual com o docker-machine.