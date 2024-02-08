#!/bin/bash

# Check if a parameter has been passed
if [ -z "$1" ]
then
    echo "No .env file path provided. Usage: source load_env.sh <path_to_env_file>"
    exit 1
fi

# Export all variables
set -o allexport && source $1 && set +o allexport

 
# Start the Docker container
docker run -d -p $POSTGRES_PORT:$POSTGRES_PORT --name $POSTGRES_CONTAINER -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD $POSTGRES_CONTAINER

# Wait for the PostgreSQL database to start
echo "Waiting for PostgreSQL to start..."
while ! pg_isready -h $POSTGRES_HOST -p $POSTGRES_PORT -U $POSTGRES_USER > /dev/null 2> /dev/null; do
    sleep 1
done
echo "PostgreSQL started"