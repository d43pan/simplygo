#!/bin/bash

# Check if a parameter has been passed
if [ -z "$1" ]
then
    echo "No .env file path provided. Usage: source load_env.sh <path_to_env_file>"
    exit 1
fi

# Export all variables
set -o allexport && source $1 && set +o allexport


# Check if the necessary environment variables are set
if [[ -z "$POSTGRES_USER" || -z "$POSTGRES_USER_PW" || -z "$POSTGRES_DB" ]]; then
    echo "Error: Necessary environment variables are not set"
    exit 1
fi

# Connect to the PostgreSQL database and set up the user
docker exec -it dsimplygo_postgres_dev psql -U postgres -c "CREATE USER $POSTGRES_USER WITH PASSWORD '$POSTGRES_USER_PW';"
docker exec -it dsimplygo_postgres_dev psql -U postgres -c "ALTER USER $POSTGRES_USER WITH SUPERUSER;"
docker exec -it dsimplygo_postgres_dev psql -U postgres -c "CREATE DATABASE $POSTGRES_DB;"
docker exec -it dsimplygo_postgres_dev psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"