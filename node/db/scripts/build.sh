#!/bin/bash

# Check if a parameter has been passed
if [ -z "$1" ]
then
    echo "No .env file path provided. Usage: source load_env.sh <path_to_env_file>"
    exit 1
fi

# Export all variables
set -o allexport && source $1 && set +o allexport

 

echo "POSTGRES_CONTAINER=$POSTGRES_CONTAINER"
# Remove if it exists
docker stop $POSTGRES_CONTAINER || true && docker rm $POSTGRES_CONTAINER || true

# Build the Docker image
docker build -t $POSTGRES_CONTAINER ..