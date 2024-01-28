# Simplygo

Simplygo is a lightweight, easy-to-use PHP library designed to streamline the process of setting up redirects. With a minimalistic approach, Simplygo focuses on simplicity and ease of use, making it an ideal choice for small projects or for those just starting with PHP.

The setup process is as straightforward as it gets. If you're using Docker, you can have Simplygo up and running with just a single command. Even if you prefer to run it locally, all you need is PHP and a simple command to start the server.

Simplygo also comes with a simple database interface for managing redirects, making it easy to add, update, or delete redirects as needed. The database schema is designed to be simple yet flexible, allowing for soft deletes and unique constraints on paths and URLs.

In short, if you're looking for a simple, easy-to-use solution for managing redirects in PHP, simply go to Simplygo.

# Using

## URL structure
`example.com/<path>`  
Create a redirect at `<path>`.  
The next time you go to `example.com/<path>` you will be redirected to the url you entered.  


`example.com/<path>/delete`  
Delete the redirect at `<path>`.  
The next time you to go `example/com/<path>` you will be prompted to enter a url.  

That's it. That's the api.




# Installing
## Run dockerized and simply  (start here)
* Ensure you have a directory for your database to live: `sudo mkdir -p db && sudo chown -R www-data:www-data db`  
* Build and run your simplygo server: `docker build -t simplygo . && docker run --rm -p 8000:80 -v $(pwd)/db:/var/www/html/db simplygo`  
* Visit `localhost:8000`
* Your database will persist at `$(pwd)/db`. Feel free to delete or modify as you need. Feel free to change this if you'd like it stored elsewhere.


## Run locally and simply
`php -S localhost:8000 -c php.ini`   

* You might have to edit the php.ini file if your php is in a different location.  
* You might have to ensure all the plugins are installed  
