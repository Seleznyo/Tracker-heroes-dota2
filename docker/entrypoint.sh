#!/bin/sh
set -e

mkdir -p /var/www/html/public/build

cp -a /vite-build/. /var/www/html/public/build/

exec "$@"