#!/bin/bash

psql -U postgres  -c "CREATE USER $DEV_POSTGRES_USER WITH PASSWORD '$DEV_POSTGRES_PASS';"
