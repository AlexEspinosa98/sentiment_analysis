"""Unit tests for the Geo Processor API using FastAPI's TestClient.
"""

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_valid_request():
    payload = {
        "points": [
            {"lat": 40.7128, "lng": -74.0060},
            {"lat": 34.0522, "lng": -118.2437},
            {"lat": 41.8781, "lng": -87.6298},
            {"lat": 29.7604, "lng": -95.3698},
        ]
    }
    response = client.post("/process", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "centroid" in data
    assert "bounds" in data


def test_invalid_request_missing_points():
    response = client.post("/process", json={})
    assert response.status_code == 422  # Pydantic validation error


def test_invalid_lat_lng():
    payload = {"points": [{"lat": "invalid", "lng": 10}]}
    response = client.post("/process", json=payload)
    assert response.status_code == 422

def test_empty_points_list():
    payload = {"points": []}
    response = client.post("/process", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Points list cannot be empty."
