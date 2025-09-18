"""Data models for the geo-processor application."""

from pydantic import BaseModel, Field
from typing import List


class Point(BaseModel):
    """A geographical point defined by latitude and longitude."""
    lat: float = Field(..., description="Latitude in decimal degrees")
    lng: float = Field(..., description="Longitude in decimal degrees")


class GeoRequest(BaseModel):
    """Request model containing a list of geographical points."""
    points: List[Point] = Field(
        ...,
        min_items=1,
        description="List of latitude/longitude points"
    )


class Centroid(BaseModel):
    """Geographical center point of a set of points."""
    lat: float
    lng: float


class Bounds(BaseModel):
    """Geographical bounding box defined by its corners."""
    north: float
    south: float
    east: float
    west: float


class GeoResponse(BaseModel):
    """Response model containing the centroid and bounds of the geographical points."""
    centroid: Centroid
    bounds: Bounds
