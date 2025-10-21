#!/bin/sh
set -e

# Clear Laravel caches so runtime env vars (from docker-compose) are used
if [ -f artisan ]; then
  php artisan config:clear || true
  php artisan cache:clear || true
  php artisan route:clear || true
  php artisan migrate --force || true
  php artisan db:seed || true
fi

exec "$@"
