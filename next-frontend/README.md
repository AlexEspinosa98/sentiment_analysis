# Next.js Frontend

This will be a React-based frontend for submitting coordinates and visualizing the bounding box and centroid on a map.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run in development:
   ```bash
   npm run dev
   ```

## Docker

Build and run with Docker Compose:
```bash
docker-compose up --build
```

---

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

# FastAPI (geo-processor)

Already set up. See main README for details.

---

# Orchestration

All services are orchestrated via `docker-compose.yml`. Each service is accessible on its respective port:
- FastAPI: 8000
- NestJS: 3001
- Next.js: 3000
