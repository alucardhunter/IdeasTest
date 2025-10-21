# Catálogo Colaborativo de ideias

## Subir ambiente PHP + Frontend

1 - `docker-compose up postgres -d` para subir o serviço de banco de dados.
2 - Crie uma copia do ".env.example" e renomeie para ".env:
3 - `docker-compose up backend-php -d` para subir o container do backend em PHP com suas seeds e migrations.
4 - Altere o argumento "VITE_API_BASE" para "http://localhost:8000/api"
5 - `docker-compose up frontend -d` para subir o container do frontend.
6 - Acesse o frontend em http://localhost:3000

## Subir ambiente Node + Frontend

1 - `docker-compose up postgres -d` para subir o serviço de banco de dados.
2 - `docker-compose up backend-node -d` para subir o container do backend em node com suas seeds e migrations.
3 - Altere o argumento "VITE_API_BASE" para "http://localhost:4000"
4 - `docker-compose up frontend -d` para subir o container do frontend.
5 - Acesse o frontend em http://localhost:3000

# OBS

O formato dos relacionamentos do eloquent e do prisma são diferentes, o que causa conflito em subir as duas API's ao mesmo tempo.
