# dudedid backend (FastAPI)

## Overview

This directory contains the backend API for the `dudedid` task management application. Built with FastAPI, it provides endpoints for users, authentication, and task CRUD operations.

Main package paths:
- `backend/app/main.py` : FastAPI app entrypoint
- `backend/app/routers/` : route declarations for `auth`, `users`, `tasks`
- `backend/app/controllers/` : business logic for each entity
- `backend/app/models/` : database ORM models
- `backend/app/schemas/` : Pydantic request/response schemas
- `backend/app/utils/` : auth/security helpers
- `backend/app/database.py` : DB engine/session
- `backend/app/config.py` : environment config

## Quickstart

1) From repository root:
```bash
cd backend
```

2) Create and activate venv:
```bash
python3 -m venv venv
source ./venv/bin/activate
```

3) Install dependencies:
```bash
pip install -r requirements.txt
```

4) Run local server:
```bash
uvicorn app.main:fastapi --reload --host 127.0.0.1 --port 8000
```

5) Open in browser:
- API base: http://127.0.0.1:8000
- Swagger UI: http://127.0.0.1:8000/docs
- ReDoc: http://127.0.0.1:8000/redoc

## Env configuration

Optional env vars (in `.env` or shell):
- `DATABASE_URL` (sqlite example: `sqlite:///./test.db`)
- `SECRET_KEY`
- `ACCESS_TOKEN_EXPIRE_MINUTES`

## Run tests

From `backend/`:
```bash
pytest
```

## Available endpoints

- `POST /auth/login` — obtain JWT token
- `POST /auth/register` — create new user
- `GET /users/` — list users (auth required)
- `GET /tasks/`, `POST /tasks/`, `PATCH /tasks/{id}`, `DELETE /tasks/{id}`

> Note: actual endpoint details and request schemas are available in OpenAPI docs after server startup.

## Notes

- This backend uses in-memory or sqlite (depending on config) and is meant for development/demo.
- For production, add proper DB migration and secrets management.
