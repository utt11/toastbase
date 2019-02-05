#!/bin/bash

docker build -t toastbase:basement -f basement/Dockerfile .

printf "\033[0;36mToastbase initialized\033[0m\n"
