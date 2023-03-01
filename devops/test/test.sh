#!/bin/bash
set -e
source ./set-env.sh

if [ -z "${PSQL_HOST}" ]; then
    export PSQL_HOST=bris-postgres
fi

if [ -z "${TEST_PROJECT_URL}" ]; then
    echo "TEST_PROJECT_URL not set"
else
    export PROJECT_URL=$TEST_PROJECT_URL
fi

cd ../
export NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run jest -- --config ./tests/jest-all.json --detectOpenHandles --forceExit --passWithNoTests --reporters=default --includeConsoleOutput=true
export NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run test -- --config ./tests/jest-all.json --detectOpenHandles --forceExit --passWithNoTests --reporters=default --includeConsoleOutput=true
