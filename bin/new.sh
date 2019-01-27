if [[ -z "${NAME}" ]]; then
    echo "NO NAME provided"
    exit 1
fi

printf "\033[0;36mInitializing for ${NAME}\033[0m\n"

docker-compose up -d $NAME
docker-compose exec $NAME bash /scripts/new.sh