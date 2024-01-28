# Use an official PHP runtime as a parent image
FROM php:7.4-apache


# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set the working directory in the container to /app
WORKDIR /var/www/html/

# Copy the current directory contents into the container at /app
COPY . /var/www/html/


RUN mkdir -p /var/www/html/db
RUN chown -R www-data:www-data /var/www/html/db

# Change the ownership and permissions of the SQLite database file
# RUN chown www-data:www-data /var/www/html/redirects.db
# RUN chmod 664 /var/www/html/redirects.db


# Install any needed packages specified in requirements.txt
RUN apt-get update && apt-get install -y libsqlite3-dev

# Install php extensions
RUN docker-php-ext-install pdo_sqlite

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
# ENV NAME World

# Run app.py when the container launches
CMD ["apache2-foreground"]