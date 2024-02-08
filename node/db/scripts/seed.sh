#!/bin/bash


# Check if a parameter has been passed
if [ -z "$1" ]
then
    echo "No .env file path provided. Usage: source load_env.sh <path_to_env_file>"
    exit 1
fi

if [ -z "$2" ]
then
    echo "No location to run migration from provided. Usage: source load_env.sh <path_to_env_file> <path_to_dir_for_knex>"
    exit 1
fi

# Export all variables
set -o allexport && source $1 && set +o allexport

cd "$2" && \

# Run the knex seeds
knex seed:run