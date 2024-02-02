#!/bin/bash
echo "ServerName $SERVER_NAME" >> /etc/apache2/apache2.conf
exec apache2-foreground