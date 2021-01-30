#!/bin/bash

set -e
php artisan migrate --seed --force --no-interaction
exec "$@"