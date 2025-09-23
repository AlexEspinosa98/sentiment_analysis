import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false });

export default function Home() {
  const [jsonInput, setJsonInput] = useState('[{"lat":40.7128,"lng":-74.0060},{"lat":34.0522,"lng":-118.2437}]');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showMap, setShowMap] = useState(false);

  const dummyData = {
    centroid: { lat: 37.7749, lng: -122.4194 },
    bounds: {
      north: 37.8324, 
      south: 37.7033, 
      east: -122.3537, 
      west: -122.5145
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);
    try {
      let points;
      try {
        points = JSON.parse(jsonInput);
        if (!Array.isArray(points)) throw new Error('Input must be a JSON array');
      } catch (err) {
        throw new Error('Invalid JSON format');
      }
      const res = await fetch(process.env.NEXT_PUBLIC_NEST_API_URL || 'http://localhost:8000/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Error processing request');
      setResult({ ...data, points });
      setShowMap(true); // Show map automatically after a successful result
    } catch (err) {
      setError(err.message);
      setShowMap(false);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMap = () => {
    setShowMap(!showMap);
  };

  const mapData = result ? result : dummyData;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#e0eafc,#cfdef3)', fontFamily: 'Segoe UI,Arial,sans-serif' }}>
      <header style={{ background: '#222', color: '#fff', padding: '2rem 0', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h1 style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '2px' }}>Geo Processor</h1>
        <p style={{ margin: '0.5rem 0 0', fontSize: '1.2rem', color: '#aee' }}>Alexander Espinosa &mdash; Python Developer</p>
        <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
          <a href="https://www.linkedin.com/in/alexespinosav/" target="_blank" rel="noopener noreferrer" style={{ color: '#aee', marginRight: '1.5rem', textDecoration: 'none' }}>LinkedIn</a>
          <a href="https://github.com/AlexEspinosa98/sentiment_analysis" target="_blank" rel="noopener noreferrer" style={{ color: '#aee', textDecoration: 'none' }}>GitHub</a>
        </div>
      </header>
      <main style={{ flex: 1, maxWidth: 600, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
        <h2 style={{ textAlign: 'center', color: '#222', marginBottom: '1.5rem' }}>Submit Coordinates (JSON Array)</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea
            rows={6}
            style={{ fontSize: '1rem', padding: '1rem', borderRadius: 8, border: '1px solid #ccc', resize: 'vertical', background: '#f7fafd' }}
            value={jsonInput}
            onChange={e => setJsonInput(e.target.value)}
            placeholder='[{"lat":40.7128,"lng":-74.0060},{"lat":34.0522,"lng":-118.2437}]'
            required
          />
          <button type="submit" disabled={loading} style={{ background: '#222', color: '#fff', border: 'none', borderRadius: 8, padding: '0.75rem', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</p>}
        
        <section style={{ marginTop: '2rem', textAlign: 'center' }}>
          {result && (
            <div>
              <h3 style={{ color: '#222' }}>Result</h3>
              <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                <strong>Centroid:</strong> {result.centroid ? `${result.centroid.lat}, ${result.centroid.lng}` : 'N/A'}
              </div>
              <div style={{ fontSize: '1.1rem' }}>
                <strong>Bounds:</strong> {result.bounds ? JSON.stringify(result.bounds) : 'N/A'}
              </div>
            </div>
          )}
          <button
            type="button"
            style={{ background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer', margin: '1rem 0' }}
            onClick={handleShowMap}
          >
            {showMap ? 'Hide Map' : 'Show Map'}
          </button>
          {showMap && mapData.centroid && mapData.bounds && (
            <MapComponent centroid={mapData.centroid} bounds={mapData.bounds} />
          )}
        </section>

      </main>
      <footer style={{ background: '#222', color: '#fff', textAlign: 'center', padding: '1rem 0', fontSize: '1rem', letterSpacing: '1px', marginTop: 'auto' }}>
        &copy; {new Date().getFullYear()} Alexander Espinosa &mdash; Python Developer<br />
        <a href="https://www.linkedin.com/in/alexespinosav/" target="_blank" rel="noopener noreferrer" style={{ color: '#aee', marginRight: '1.5rem', textDecoration: 'none' }}>LinkedIn</a>
        <a href="https://github.com/AlexEspinosa98/sentiment_analysis" target="_blank" rel="noopener noreferrer" style={{ color: '#aee', textDecoration: 'none' }}>GitHub</a>
      </footer>
    </div>
  );
}
