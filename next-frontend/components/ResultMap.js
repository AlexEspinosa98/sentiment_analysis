import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Rectangle = dynamic(() => import('react-leaflet').then(mod => mod.Rectangle), { ssr: false });

export default function ResultMap({ centroid, bounds }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  // Validate data
  const validCentroid = centroid && typeof centroid.lat === 'number' && typeof centroid.lng === 'number';
  const validBounds = bounds && typeof bounds.min_lat === 'number' && typeof bounds.min_lng === 'number' && typeof bounds.max_lat === 'number' && typeof bounds.max_lng === 'number';

  if (!isClient || !validCentroid || !validBounds) return null;

  // Import Leaflet CSS only on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet/dist/leaflet.css');
    }
  }, []);

  return (
    <div style={{ margin: '2rem auto', width: '100%', maxWidth: 500, height: 300 }}>
      <MapContainer
        center={[centroid.lat, centroid.lng]}
        zoom={4}
        style={{ height: '100%', width: '100%', borderRadius: 12 }}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[centroid.lat, centroid.lng]} />
        <Rectangle
          bounds={[
            [bounds.min_lat, bounds.min_lng],
            [bounds.max_lat, bounds.max_lng]
          ]}
          pathOptions={{ color: 'blue', weight: 2 }}
        />
      </MapContainer>
    </div>
  );
}
