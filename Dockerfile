# Use an official PHP runtime as a parent image
FROM php:7.4-apache


# Enable Apache mod_rewrite
RUN a2enmod rewrite




# Install any needed packages 
RUN apt-get update && apt-get install -y libsqlite3-dev sqlite3 


RUN mkdir -p /var/www/html/db
RUN sqlite3 /var/www/html/db/redirects.db ".databases"

# Change the owner of the db directory to www-data
RUN chown -R www-data:www-data /var/www/html/db


# Install php extensions
RUN docker-php-ext-install pdo_sqlite

# Copy the current directory contents into the container at /app
COPY src/ /var/www/html/


# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
# ENV NAME World

# Copy the entrypoint script into the Docker image
COPY entrypoint.sh /entrypoint.sh

# Make the script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]