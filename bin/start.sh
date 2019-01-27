if [[ -z "${NAME}" ]]; then
    echo "NO NAME provided"
    exit 1
fi

printf "\033[0;36mStarting ${NAME}\033[0m\n"

docker-compose start $NAME
docker-compose exec $NAME bash /scripts/start.sh