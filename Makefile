start:
	docker-compose -f docker-compose.yml up -d --build && \
	docker-compose -f docker-compose.yml exec -T aston-app bash -c 'curl -sS https://getcomposer.org/installer | php --  --install-dir=/usr/local/bin --filename=composer && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash && . ~/.bashrc && nvm i 12.13.0 && nvm alias default 12.13.0 >> output.txt 2>&1' &&  \
	docker-compose -f docker-compose.yml exec -T aston-app bash -c '. ~/.bashrc && composer install && npm install  >> output.txt 2>&1 '  && \
	docker-compose -f docker-compose.yml exec -T aston-app bash -c 'chown www-data:www-data /var/www/aston >> output.txt 2>&1' && \
	docker-compose -f docker-compose.yml exec -T aston-app bash -c 'php artisan migrate --seed && php artisan key:generate'

stop:
	docker-compose -f docker-compose.yml stop
        
