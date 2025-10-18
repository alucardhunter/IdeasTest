# Copilot instructions for IdeasTest repository

Short, focused guidance so an AI coding assistant can be productive immediately in this codebase.

1. Big-picture architecture

   - Two backends and one frontend in repo root: `backend-node/`, `backend-php/`, and `frontend/`.
   - Primary development flow for tests and CI uses the Node backend. The Node backend is an Express + Prisma API (see `backend-node/src/app.ts`, `backend-node/src/controllers/*`, `backend-node/src/routes/*`).
   - The frontend (React + Vite) calls backend APIs at `VITE_API_BASE` (see `frontend/src/api/api.ts`). Default API base is `http://localhost:4000`.
   - Database schema is in `backend-node/prisma/schema.prisma` and seeded via `backend-node/prisma/seed.ts`.

2. Common developer workflows & commands

   - Full local stack (build + run tests) is intended to run via Docker Compose: `docker-compose up --build` (see top-level `README.md`). Build will run tests and fail on test failures.
   - Node backend quick dev: from `backend-node/` run `pnpm/npm/yarn install` then `npm run dev` (script: `ts-node-dev --respawn --transpile-only src/server.ts`).
   - Run backend tests: from `backend-node/` run `npm test` (Jest config in `backend-node/jest.config.js`). Tests mock Prisma in `__tests__/ideas.test.ts`.
   - Prisma workflow: `npm run prisma:generate`, `npm run prisma:migrate`, `npm run seed` (see `package.json`).

3. Project-specific patterns and conventions

   - Lightweight controllers: controller functions return JSON and use `prisma` directly from `backend-node/src/prismaClient.ts` (mocked in tests). Follow patterns in `ideasController.ts` (list, create, get, vote, addComment).
   - Routes register controllers directly; prefer adding new endpoints under `backend-node/src/routes/` and a matching controller in `controllers/`.
   - Error handling is rudimentary—use status codes + small JSON `{ error: 'message' }` as existing handlers do (see `ideasController.ts`). Match this style for consistency.
     - Swagger UI is served if `backend-node/swagger.yaml` exists; the UI is exposed at `/api/docs` and the raw YAML at `/api/swagger.yaml`. See `backend-node/src/app.ts` for integration.

4. Integrations & external dependencies

   - Database: PostgreSQL via Prisma. Connection string comes from `DATABASE_URL` in env. Migrations are in `backend-node/prisma/migrations`.
   - Frontend-to-backend: frontend uses `axios` with `VITE_API_BASE` pointing to backend; update env in `.env` files when changing host/port.

5. Testing and mocking notes

   - Backend unit tests mock Prisma by replacing `backend-node/src/prismaClient` (see `__tests__/ideas.test.ts`). When adding tests, mock Prisma methods the same way to avoid DB dependency.
   - Jest runs with `ts-jest` and `--runInBand` in package scripts to avoid flakiness in CI.

6. When editing code, prefer these entry points

   - Add API routes: `backend-node/src/routes/*.ts` and controllers in `backend-node/src/controllers/*.ts`.
   - Update DB model: `backend-node/prisma/schema.prisma` then run `prisma migrate` + `prisma generate` and `seed.ts` as needed.
   - Frontend fetches: helpers in `frontend/src/api/api.ts`; add or change client methods there.

7. Examples to follow
   - Add route + controller: copy pattern from `backend-node/src/routes/ideas.ts` + `backend-node/src/controllers/ideasController.ts`.
   - Mock Prisma in tests: see `backend-node/__tests__/ideas.test.ts`.

If anything in this file looks incomplete or you want more detail (env examples, Docker compose service names, or CI steps), tell me which area to expand.
