'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import GetWaterUsageButton from './GetWaterUsageButton';
import CropSelectionModal from './CropSelectionModal';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import _ from 'lodash';
import { CropType, GrowthStage } from '../croptable';

export type DateRange = [Date | null, Date | null];

const Map = () => {
  const [drawingCoordinates, setDrawingCoordinates] = useState<number[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('')
  const [selectedGrowthStage, setSelectedGrowthStage] = useState('')

  useEffect(() => {
    // This is needed to fix Leaflet icons not displaying
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }, []);

  const handleCreated = (e: any) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON().geometry.coordinates as number[];
    setDrawingCoordinates(coordinates.flat());
  };

  const handleFetchWaterUsage = async () => {
    if (_.isEmpty(drawingCoordinates) || !selectedCrop || !selectedGrowthStage) {
      console.log(_.isEmpty(drawingCoordinates));
      alert(
        `Please fill all required fields \nSelected coodinates: ${drawingCoordinates}
        \nSelected CropType:${selectedCrop}\nSelected GrowthStage:${selectedGrowthStage}`,
      );
      return;
    }
    const input: Record<string, string> = {
      geometry: JSON.stringify(drawingCoordinates),
      croptype: selectedCrop as string,
      growthrate: selectedGrowthStage as string
    };
    const result = await (await fetch('/api/getwaterusage?' + new URLSearchParams(input).toString())).json();
    console.log(result);
  };

  return (
    <MapContainer center={[36.7783, -119.4179]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={{
            rectangle: false,
            polygon: true,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
      <GetWaterUsageButton onFetchWaterUsage={handleFetchWaterUsage} />
      <CropSelectionModal
        onSubmit={(cropType, growthStage) => {
          setSelectedCrop(cropType);  // Update crop type
          setSelectedGrowthStage(growthStage);  // Update growth stage
        }}
      />
    </MapContainer>
  );
};

export default Map;
