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

6. **Documentation**  
	- Interactive API docs are available at [http://localhost:8000/docs](http://localhost:8000/docs).

---
```
