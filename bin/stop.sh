#!/bin/bash

if [[ -z "${NAME}" ]]; then
    echo "No NAME provided"
    exit 1
fi

docker-compose stop $NAME

printf "\033[0;36m${NAME} stopped\033[0m\n"
