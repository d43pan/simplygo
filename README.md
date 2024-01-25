

# Run dockerized and simply  (start here)
`docker build -t simplygo . && docker run --rm -p 8000:80 simplygo`  
* You shouldn't have to do anything



# Run locally and simply
`php -S localhost:8000 -c php.ini`   

* You might have to edit the php.ini file if your php is in a different location.  
* You might have to ensure all the plugins are installed  
