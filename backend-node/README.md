Node Backend

1. Copy .env.example to .env and set DB credentials.
2. npm install
3. prisma generate || true
4. npm run test
5. prisma migrate dev --name init
6. npm run seed
7. npm run dev

Swagger UI available at: http://localhost:4000/api/docs (serves /api/swagger.yaml)
