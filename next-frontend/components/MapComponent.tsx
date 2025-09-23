"use client";

import L from "leaflet";
import React, { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
} from "react-leaflet";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)
  ._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface MapComponentProps {
  centroid: {
    lat: number;
    lng: number;
  };
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

function ResizeMap() {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({ centroid, bounds }) => {
  const rectangleBounds: [[number, number], [number, number]] = [
    [bounds.south, bounds.west],
    [bounds.north, bounds.east],
  ];

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[centroid.lat, centroid.lng]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ResizeMap />
        <Marker position={[centroid.lat, centroid.lng]}>
          <Popup>
            <div className="text-center">
              <strong>Centroide</strong>
              <br />
              Lat: {centroid.lat}
              <br />
              Lng: {centroid.lng}
            </div>
          </Popup>
        </Marker>

        <Rectangle
          bounds={rectangleBounds}
          pathOptions={{
            color: "#3b82f6",
            weight: 2,
            opacity: 0.8,
            fillColor: "#3b82f6",
            fillOpacity: 0.1,
          }}
        >
          <Popup>
            <div className="text-center">
              <strong>Bounding Box</strong>
              <br />
              Norte: {bounds.north}
              <br />
              Sur: {bounds.south}
              <br />
              Este: {bounds.east}
              <br />
              Oeste: {bounds.west}
            </div>
          </Popup>
        </Rectangle>
      </MapContainer>
    </div>
  );
};

export default MapComponent;