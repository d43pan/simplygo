#!/bin/bash

# Check the operating system
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    if ! id -u www-data >/dev/null 2>&1; then
        sudo groupadd www-data
        sudo useradd -g www-data www-data
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    if ! id "www-data" >/dev/null 2>&1; then
        # Create www-data user
        sudo dscl . -create /Users/www-data
        sudo dscl . -create /Users/www-data UserShell /usr/bin/false
        sudo dscl . -create /Users/www-data RealName "www-data"
        
        # Find a unique ID for the new user
        uid=5000
        while id -u $uid >/dev/null 2>&1; do
            uid=$((uid+1))
        done
        sudo dscl . -create /Users/www-data UniqueID "$uid"
        
        sudo dscl . -create /Users/www-data PrimaryGroupID 20
        sudo dscl . -create /Users/www-data NFSHomeDirectory /usr/local/var/www
    fi

    # Check if www-data group exists
    if ! dscl . -read /Groups/www-data >/dev/null 2>&1; then
        # Create www-data group
        sudo dseditgroup -o create www-data
    fi

    # Add www-data user to www-data group
    sudo dseditgroup -o edit -a www-data -t user www-data
fi

# Create db directory and set correct permissions
sudo mkdir -p db
sudo chown -R www-data:www-data db