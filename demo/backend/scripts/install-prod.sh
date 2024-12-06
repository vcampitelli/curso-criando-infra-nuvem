#!/bin/sh
cd $(dirname "$0")/../
composer install --no-dev --no-progress --no-interaction --optimize-autoloader
chown -R nginx:nginx vendor/
