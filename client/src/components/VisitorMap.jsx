import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function VisitorMap({ pageviews }) {
  const points = pageviews.filter((p) => p.lat != null && p.lon != null);

  return (
    <div className="visitor-map-wrap">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={false}
        style={{ height: '420px', width: '100%', borderRadius: '12px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lon]}
            radius={6}
            pathOptions={{ color: '#39d98a', fillColor: '#39d98a', fillOpacity: 0.7 }}
          >
            <Popup>
              <strong>{p.city}, {p.country}</strong>
              <br />
              IP: {p.ip}
              <br />
              Page: {p.path}
              <br />
              {new Date(p.timestamp).toLocaleString()}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      <p className="text-muted small mt-2">
        {points.length} of {pageviews.length} visits mapped (some IPs — e.g. localhost/private networks — have no geolocation).
      </p>
    </div>
  );
}
