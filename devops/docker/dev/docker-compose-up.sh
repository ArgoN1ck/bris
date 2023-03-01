#!/bin/bash
set -e
source ./set-env.sh

docker volume create --name=bris-postgres-volume --label=bris-postgres-volume
docker volume create --name=bris-pgadmin-volume --label=bris-pgadmin-volume

export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d bris-postgres

until docker exec --tty $(docker ps -aqf "name=bris-postgres") pg_isready -U $PSQL_USERNAME; do
    echo "Waiting for postgres..."
    sleep 2
done

cd ..
npm run migrate
prisma db pull
prisma generate
cd ./devops

export PSQL_HOST=bris-postgres
export PSQL_URL=postgres://${PSQL_USERNAME}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_DATABASE}?schema=public

export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml --compatibility up -d
