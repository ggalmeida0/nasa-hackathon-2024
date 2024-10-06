import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { EditControl } from 'react-leaflet-draw';

function MapComponent() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onCreated = (e: any) => {
    const layer = e.layer;
    const { _latlngs } = layer;
    console.log('Polygon coordinates:', _latlngs);
    // Send coordinates to backend or handle here
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
            circlemarker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}

export default MapComponent;
