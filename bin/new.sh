#!/bin/bash

if [[ -z "${NAME}" ]]; then
    echo "No NAME provided"
    exit 1
fi

if [[ -z "${API_KEY}" ]]; then
    echo "No API_KEY provided"
    exit 1
fi

if [[ -z "${SENDER_ID}" ]]; then
    echo "No SENDER_ID provided"
    exit 1
fi

if [[ -z "${PROJECT_ID}" ]]; then
    echo "No PROJECT_ID provided"
    exit 1
fi

printf "\033[0;36mInitializing for ${NAME}\033[0m\n"

SERVICE_COUNT=$(ls toasts | wc -l)
PORT=$(($SERVICE_COUNT + 4000))

DOCKER_SERVICE_INFO="  ${NAME}:
    build:
      context: .
      dockerfile: toasts/${NAME}/Dockerfile
    volumes:
      - ./basement/docker-entrypoint.sh:/docker-entrypoint.sh
      - ./basement/scripts:/scripts
      - ./toasts/${NAME}:/var/www/repo
    env_file:
      - ./toasts/${NAME}/.env
    ports:
      - ${PORT}:3000
    restart: always"

echo "${DOCKER_SERVICE_INFO}" >> docker-compose.yml

cp -r toasts/template toasts/${NAME}

DOT_ENV="NODE_PATH=src/
REACT_APP_API_KEY=${API_KEY}
REACT_APP_PROJECT_ID=${PROJECT_ID}
REACT_APP_DATABASE_NAME=${PROJECT_ID}
REACT_APP_BUCKET=${PROJECT_ID}
REACT_APP_SENDER_ID=${SENDER_ID}"

echo "${DOT_ENV}" > toasts/${NAME}/.env

FIREBASE_RC="{
  \"projects\": {
    \"default\": \"${PROJECT_ID}\"
  }
}"

echo "${FIREBASE_RC}" >> toasts/${NAME}/.firebaserc

docker-compose build
