#!/bin/sh
cd $(dirname "$0")/../
mkdir vendor
chown nginx:nginx vendor
sudo -u nginx composer install --no-dev --no-progress --no-interaction --optimize-autoloader
