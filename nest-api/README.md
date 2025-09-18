# NestJS API

This service validates input, caches results, and forwards requests to the Python FastAPI service.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run in development:
   ```bash
   npm run start:dev
   ```

## Docker

Build and run with Docker Compose:
```bash
docker-compose up --build
```

---

# Orchestration

All services are orchestrated via `docker-compose.yml`. Each service is accessible on its respective port:
- FastAPI: 8000
- NestJS: 3001
- Next.js: 3000
