FROM php:7.4.4-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libpq-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    zip \
    curl \
    libssl-dev \
    libonig-dev \
    libzip-dev \
    gnupg \
    nano \
    procps \
    wget
    #procps for ps aux

#################################Apache block#################################

#Set environment variables for apache
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2/apache2.pid
ENV APACHE_RUN_DIR /var/run/apache2
ENV COMPOSER_MEMORY_LIMIT=-1

#configure apache for non root usage
RUN apt-get install -y libcap2-bin
RUN setcap cap_net_bind_service=+ep /usr/sbin/apache2

#Copy apache2 config
COPY configs/dev/apache/apache2.conf /etc/apache2/apache2.conf

#Copy virtual config to apache
RUN rm -rf /etc/apache2/sites-enabled/*
COPY configs/dev/apache/virtualhost.conf /etc/apache2/sites-enabled/000-default.conf

# Enabling some apache2 mods
RUN a2enmod rewrite ssl headers proxy_fcgi
RUN rm -rf /var/www/html
#################################End of apache block#################################


##Create folder for app
RUN mkdir /var/www/aston
RUN chown www-data:www-data /var/www/aston

#Set workdir
WORKDIR /var/www/aston

#Install extensions for php
RUN docker-php-ext-install pdo_pgsql mbstring zip exif pcntl
RUN docker-php-ext-configure gd  --with-freetype --with-jpeg
RUN docker-php-ext-install gd


#This commands will be runned by makefile
## Install composer & node
#RUN curl -sS https://getcomposer.org/installer | php --  --install-dir=/usr/local/bin --filename=composer \
#    && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash && . ~/.bashrc \
#    && nvm i 12.13.0 && nvm alias default 12.13.0
#
#RUN bash \
#    && . ~/.bashrc \
#    && npm install \
#    && composer install

# Change owner for project
#RUN chown www-data:www-data -R  /var/www/fakefolder

COPY ./entrypoint.sh /var/www/entrypoint.sh

#Set permissions for entrypoint
RUN chmod 755 /var/www/entrypoint.sh
#################################End of root commands#################################


##Uncommnet if not development
##Create user and set it to default, runs as non root
#USER www-data


ENTRYPOINT ["/var/www/aston/entrypoint.sh"]
CMD ["apache2ctl", "-DFOREGROUND"]

# Exposing ports 80 and 443
EXPOSE 8080


