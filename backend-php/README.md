PHP backend

1. Copy .env.example to .env and set DB credentials.
2. composer install
3. php artisan key:generate
4. Create postgress database with name "product_ideas"
5. php artisan migrate --seed
6. php artisan serve --host=0.0.0.0 --port=8000

Swagger UI available at: http://localhost:8000/api/docs (serves /api/swagger.yaml)
