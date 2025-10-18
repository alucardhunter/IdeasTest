FROM php:8.3-fpm

# install dependencies incl. pdo_pgsql and sqlite for phpunit
RUN apt-get update && apt-get install -y libpq-dev libzip-dev zip unzip git curl sqlite3 libsqlite3-dev     && docker-php-ext-install pdo pdo_pgsql pdo_sqlite

# install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# install PHP dependencies (may fail if vendor not present; intended to be run in environment with composer available)
RUN composer install --no-interaction --prefer-dist || true

# run migrations & seed (requires DB available) and run phpunit (phpunit uses in-memory sqlite per phpunit.xml)
RUN php artisan migrate --force || true
RUN php artisan db:seed || true
RUN ./vendor/bin/phpunit || (echo 'PHPUnit failed' && exit 1)

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
