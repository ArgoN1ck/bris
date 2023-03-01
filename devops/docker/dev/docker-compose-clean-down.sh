#!/bin/bash
set -e
source ./set-env.sh
export COMPOSE_INTERACTIVE_NO_CLI=1 && docker-compose -f ./docker/dev/docker-compose.yml down
docker volume rm bris-postgres-volume --force
docker volume rm bris-pgadmin-volume --force
