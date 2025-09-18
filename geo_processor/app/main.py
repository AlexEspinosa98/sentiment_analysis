"""Main application file for the geo-processor microservice."""

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.models import GeoRequest, GeoResponse
from app.services import process_points
from common.logger import app_logger


app = FastAPI(
    title="Geo-Processor Microservice",
    description="Minimal microservice to compute centroid and bounds from coordinates",
    version="1.0.0"
)

# Permitir llamadas desde cualquier origen (útil en microservicios)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/process", response_model=GeoResponse, responses={
    400: {"description": "Invalid input format"},
})
async def process_geo(request: GeoRequest) -> GeoResponse:
    """
    Process a list of latitude/longitude points.
    Returns centroid and bounding box.
    """
    try:
        app_logger.info(f"Processing request with {len(request.points)} points.")
        return process_points(request.points)
    except Exception as e:
        app_logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Invalid request: {str(e)}")
