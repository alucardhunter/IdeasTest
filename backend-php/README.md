Laravel Backend (MVC) - Catálogo Colaborativo

This folder contains a Laravel-style backend skeleton configured for PostgreSQL.

Instructions (after placing into a Laravel project or running composer install):

1. Copy .env.example to .env and set DB credentials.
2. composer install
3. php artisan key:generate
4. php artisan migrate --seed
5. php artisan serve --host=0.0.0.0 --port=8000

Swagger UI available at: http://localhost:8000/docs (serves swagger.yaml)
