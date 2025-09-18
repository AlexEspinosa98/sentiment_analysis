"""Service functions for geographical computations."""
from typing import List
from .models import Point, GeoResponse, Centroid, Bounds
from common.logger import app_logger

def process_points(points: List[Point]) -> GeoResponse:
    """Compute the centroid and geographic bounds for the given points.

    Args:
        points (List[Point]): Non-empty list of points with latitude/longitude in decimal degrees.

    Returns:
        GeoResponse: Response containing the centroid and bounds (north, south, east, west).
    """
    app_logger.debug(f"Received {len(points)} points for processing.")

    latitudes = [p.lat for p in points]
    longitudes = [p.lng for p in points]

    centroid = Centroid(
        lat=sum(latitudes) / len(latitudes),
        lng=sum(longitudes) / len(longitudes)
    )

    bounds = Bounds(
        north=max(latitudes),
        south=min(latitudes),
        east=max(longitudes),
        west=min(longitudes)
    )

    return GeoResponse(centroid=centroid, bounds=bounds)
