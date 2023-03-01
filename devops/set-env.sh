#!/bin/bash
set -e
export CURRENT_UID=$(id -u):$(id -g)
export PSQL_URL=postgres://${PSQL_USERNAME}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_DATABASE}?schema=public
