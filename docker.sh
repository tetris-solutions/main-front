source .env

case $1 in
  start)
    docker-compose -f docker/docker-compose.${DOCKER_ENV}.yml --project-directory=./ up --build -d
    ;;
  restart)
    docker-compose -f docker/docker-compose.${DOCKER_ENV}.yml --project-directory=./ stop
    docker-compose -f docker/docker-compose.${DOCKER_ENV}.yml --project-directory=./ up --build -d
    ;;
  logs)
    if [ -z "$2" ]; then
      docker-compose -f docker/docker-compose.${DOCKER_ENV}.yml --project-directory=./ logs -f
    else
      docker-compose -f docker/docker-compose.${DOCKER_ENV}.yml --project-directory=./ logs -f $2
    fi
    ;;
  ps)
    docker-compose -f docker/docker-compose.${DOCKER_ENV}.yml --project-directory=./ ps

    ;;
  *)
    echo "Opcao Invalida!"
    ;;
esac

