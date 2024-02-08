#!/bin/bash


# Change to the directory of the script
#cd "$(dirname "$0")"

# Check if a parameter has been passed
if [ -z "$1" ]
then
  echo "No .env file path provided. Usage: bash 01_build...seed.sh <path_to_env_file> <path_to_knex>"
  exit 1
fi

if [ -z "$2" ]
then
  echo "No path to knex given. Usage: bash 01_build...seed.sh <path_to_env_file> <path_to_knex>"
  exit 1
fi

echo $1

FILE=$1

if [[ -f "$FILE" ]]; then
    echo "The file '$FILE' exists."
else
    echo "The file '$FILE' does not exist."
fi

# Load environment variables
echo '# source $1'
source $1

# Run the build script
echo '# build.sh'
bash build.sh $1

# Run the run script
echo '# run.sh'
bash run.sh $1

# Run the run script
echo '# db_init.sh'
bash db_init.sh $1

# Run the migrate script
echo '# migrate.sh'
bash migrate.sh $1 $2

# Run the seed script
echo '# seed.sh'
bash seed.sh $1 $2

# Confirm the databases are there
echo '# confirm_setup.js'
node confirm_setup.js