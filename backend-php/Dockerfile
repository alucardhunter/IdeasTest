FROM php:8.3-fpm

RUN apt-get update
RUN apt-get -y install --fix-missing \
  apt-utils \
  build-essential \
  git \
  curl \
  libcurl4 \
  libcurl4-openssl-dev \
  zlib1g-dev \
  libzip-dev \
  zip \
  libbz2-dev \
  locales \
  libmcrypt-dev \
  libicu-dev \
  libonig-dev \
  libxml2-dev

RUN docker-php-ext-install \
  exif \
  pcntl \
  bcmath \
  ctype \
  curl \
  pcntl \
  zip

RUN apt-get install -y libpq-dev \
  && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

# add entrypoint that clears config cache so runtime env vars are applied
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN composer install --no-interaction --prefer-dist || true

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
