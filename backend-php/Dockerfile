# Dockerfile - Laravel backend (runs PHPUnit during build; build fails on test failures)
FROM php:8.3-fpm

# install dependencies incl. sqlite
RUN apt-get update && apt-get install -y libpq-dev libzip-dev zip unzip git curl sqlite3 libsqlite3-dev     && docker-php-ext-install pdo pdo_pgsql pdo_sqlite

# install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

# install php dependencies
RUN composer install --no-interaction --prefer-dist || true

# run migrations and tests using in-memory sqlite (phpunit.xml sets DB to :memory:)
RUN php artisan migrate --force || true
RUN ./vendor/bin/phpunit || (echo 'PHPUnit failed' && exit 1)

EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
