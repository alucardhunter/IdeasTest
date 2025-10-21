# 🧩 Catálogo Colaborativo de Ideias

![Docker](https://img.shields.io/badge/Docker-Compose-blue?logo=docker)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green?logo=node.js)
![PHP](https://img.shields.io/badge/PHP-Laravel-purple?logo=php)
![Frontend](https://img.shields.io/badge/Vite+React-Frontend-orange?logo=react)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

> Projeto colaborativo que reúne ideias e contribuições em um ambiente com backends em **Node** e **PHP**, banco de dados **PostgreSQL** e frontend em **React (Vite)**.

---

## Índice

- [Requisitos](#requisitos)
- [Quick Start — PHP + Frontend](#quick-start--php--frontend)
- [Quick Start — Node + Frontend](#quick-start--node--frontend)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Observação importante](#observação-importante)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Tecnologias](#tecnologias)
- [Contribuição](#contribuição)
- [Autor](#autor)
- [Licença](#licença)

---

## Requisitos

Certifique-se de ter instalado:

- Docker
- Docker Compose
- Git

---

## Quick Start — PHP + Frontend

1. Inicie o banco de dados:
   ```bash
   docker-compose up postgres -d
   ```

2. Copie o arquivo de exemplo de variáveis e renomeie:
   ```bash
   cp .env.example .env
   ```

3. Suba o backend PHP (executa seeds/migrations conforme configuração do container):
   ```bash
   docker-compose up backend-php -d
   ```

4. Ajuste a variável no frontend (`VITE_API_BASE`) para:
   ```
   http://localhost:8000/api
   ```

5. Suba o frontend:
   ```bash
   docker-compose up frontend -d
   ```

6. Abra no navegador:
   [http://localhost:3000](http://localhost:3000)

---

## Quick Start — Node + Frontend

1. Inicie o banco de dados:
   ```bash
   docker-compose up postgres -d
   ```

2. Suba o backend Node (executa seeds/migrations conforme configuração do container):
   ```bash
   docker-compose up backend-node -d
   ```

3. Ajuste a variável no frontend (`VITE_API_BASE`) para:
   ```
   http://localhost:4000
   ```

4. Suba o frontend:
   ```bash
   docker-compose up frontend -d
   ```

5. Abra no navegador:
   [http://localhost:3000](http://localhost:3000)

---

## Variáveis de ambiente

- `.env` (copiar de `.env.example`) deve conter pelo menos:
  - Configurações do banco (POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB)
  - `VITE_API_BASE` usado pelo frontend (ajustar dependendo se está usando o backend PHP ou Node)
  - Outros segredos/keys conforme necessário por cada backend

---

## Observação importante

Os formatos de relacionamentos utilizados por **Eloquent (Laravel/PHP)** e **Prisma (Node)** são diferentes.  
Rodar **as duas APIs ao mesmo tempo conectadas ao mesmo banco** pode causar conflitos de esquema/relacionamento.

**Recomendação:** rode apenas um backend por vez contra o mesmo banco de dados para evitar inconsistências.

---

## Estrutura do projeto

```
projeto/
├── backend-node/     # API Node.js (Prisma + Express)
├── backend-php/      # API PHP (Laravel)
├── frontend/         # Vite + React
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Tecnologias

- Backend: Node.js (Express + Prisma), PHP (Laravel / Eloquent)
- Frontend: React + Vite (opcional TypeScript)
- Banco: PostgreSQL
- Infra: Docker, Docker Compose

---

## Contribuição

1. Fork do repositório  
2. `git checkout -b feature/sua-feature`  
3. Commit das alterações: `git commit -m "feat: descrição"`  
4. `git push origin feature/sua-feature`  
5. Abra um Pull Request

---

## Autor

**Luiz Filipe Alves**  
Desenvolvedor Full Stack

---

## Licença

Este projeto está licenciado sob a **MIT License**. Consulte o arquivo `LICENSE` para detalhes.
