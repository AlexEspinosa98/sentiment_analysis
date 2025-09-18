This project is a FastAPI-based API for processing geographic points. The main flow is as follows:

1. **API Structure**  
	- The main application code is in `geo-processor/app/`.
	- Logging utilities are in `geo-processor/common/logger.py`.
	- Unit tests are in `geo-processor/test/test.py`.

2. **Running the API**  
	- The API can be run locally or inside a Docker container.
	- When running, it exposes endpoints for processing geographic data (e.g., calculating centroids and bounds).

3. **Docker Usage**  
	- The project includes a `Dockerfile` and `requirements.txt` in the root directory.
	- You can build the Docker image from the root with:
	  ```bash
	  docker build -t geo-processor-api .
	  ```
	- Run the API container with:
	  ```bash
	  docker run --rm -p 8000:8000 geo-processor-api
	  ```
	- The API will be available at [http://localhost:8000](http://localhost:8000).

4. **Testing**  
	- Tests can be run locally:
	  ```bash
	  pip install -r requirements.txt
	  pytest geo-processor/test/test.py
	  ```
	- Or inside Docker:
	  ```bash
	  docker run --rm geo-processor-api pytest geo-processor/test/test.py
	  ```
	- If you need to set the Python path for imports, use:
	  ```bash
	  PYTHONPATH=geo-processor pytest
	  ```

5. **Logs**  
	- All logs from the API and custom logger are shown in the container or local console.


---

## Running Backend and Frontend with Docker Compose

This project uses Docker Compose to orchestrate three services:

- **geo-processor**: Python FastAPI backend (port 8000)
- **nest-api**: NestJS API proxy (port 3001)
- **next-frontend**: Next.js frontend (port 3000)

### Steps to Run Everything Locally

1. Make sure Docker and Docker Compose are installed.
2. From the project root, build and start all services:

		```bash
		docker-compose up --build
		```

		> **Note:** The Dockerfiles for NestJS and Next.js now include a build step (`npm run build`) before starting the production server. This ensures all compiled files are present.

3. Access the services:
		- FastAPI docs: [http://localhost:8000/docs](http://localhost:8000/docs)
		- NestJS API: [http://localhost:3001](http://localhost:3001)
		- Next.js frontend: [http://localhost:3000](http://localhost:3000)

### Local Development (without Docker)

For development, use the dev commands in each service folder:

- **NestJS:**
	```bash
	npm run start:dev
	```
- **Next.js:**
	```bash
	npm run dev
	```

### How Connections Work

- The Next.js frontend sends requests to the NestJS API (`http://localhost:3001`).
- The NestJS API validates, caches, and forwards requests to the FastAPI backend (`http://localhost:8000`).
- Results are returned and visualized in the frontend.

### Stopping the Services

To stop all containers:

```bash
docker-compose down
```

---
```
