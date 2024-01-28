# Simplygo

Simplygo is a lightweight, easy-to-use PHP library designed to streamline the process of setting up redirects. With a minimalistic approach, Simplygo focuses on simplicity and ease of use, making it an ideal choice for small projects or for those just starting with PHP.

The setup process is as straightforward as it gets. If you're using Docker, you can have Simplygo up and running with just a single command. Even if you prefer to run it locally, all you need is PHP and a simple command to start the server.

Simplygo also comes with a simple database interface for managing redirects, making it easy to add, update, or delete redirects as needed. The database schema is designed to be simple yet flexible, allowing for soft deletes and unique constraints on paths and URLs.

In short, if you're looking for a simple, easy-to-use solution for managing redirects in PHP, simply go to Simplygo.

# Using

## URL structure
`example.com/<path>` create a redirect at `<path>`. The next time you go to `example.com/<path>` you will be redirected to the url you entered.
`example.com/<path>/delete` delete the redirect at `<path>`. The next time you to go `example/com/<path>` you will be prompted to enter a url.




# Installing
## Run dockerized and simply  (start here)
`docker build -t simplygo . && docker run --rm -p 8000:80 simplygo`  
* You shouldn't have to do anything


## Run locally and simply
`php -S localhost:8000 -c php.ini`   

* You might have to edit the php.ini file if your php is in a different location.  
* You might have to ensure all the plugins are installed  
