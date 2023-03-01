#!/bin/bash
set -e
export TEST_PROJECT_URL=http://localhost:3000
export PSQL_PORT=5432
export PSQL_HOST=localhost
export PSQL_URL=postgres://${PSQL_USERNAME}:${PSQL_PASSWORD}@${PSQL_HOST}:${PSQL_PORT}/${PSQL_DATABASE}?schema=public

source ./test/test.sh
