#!/bin/bash

if [[ -z "${NAME}" ]]; then
    echo "No NAME provided"
    exit 1
fi

printf "\033[0;36mStarting ${NAME}\033[0m\n"

docker-compose up -d $NAME
docker-compose exec $NAME bash /scripts/start.sh