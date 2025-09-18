# Dockerfile for FastAPI geo-processor
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./geo-processor/app ./app
COPY ./common ./common

# Expose port for FastAPI
EXPOSE 8000

# Run the FastAPI app with uvicorn, show logs in console
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--log-level", "debug"]
