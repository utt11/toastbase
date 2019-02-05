#!/bin/bash

if [[ -z "${NAME}" ]]; then
    echo "No NAME provided"
    exit 1
fi

printf "\033[0;36mLogs ${NAME}\033[0m\n"

docker-compose logs --follow $NAME
