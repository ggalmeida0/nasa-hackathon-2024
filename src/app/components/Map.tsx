'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import CropSelectionModal from './CropSelectionModal';
import ChatBotModal from './ChatBotModal';
import { ChatBotModalProps } from './ChatBotModal';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import SetFarmLocationButton from './SetFarmLocationButton';
import { isEmpty } from 'lodash';
import { Button } from '@nextui-org/react';

export type DateRange = [Date | null, Date | null];

const Map = () => {
  const [drawingCoordinates, setDrawingCoordinates] = useState<number[]>([]);
  const [selectedCrop, setSelectedCrop] = useState('')
  const [selectedGrowthStage, setSelectedGrowthStage] = useState('')
  const [irrigationType, setIrrigationType] = useState('')
  const [waterFlow, setWaterFlow] = useState('')

  useEffect(() => {
    // This is needed to fix Leaflet icons not displaying
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreated = (e: any) => {
    const { layer } = e;
    const coordinates = layer.toGeoJSON().geometry.coordinates as number[];
    setDrawingCoordinates(coordinates.flat());
  };

  const handleFetchWaterUsage = async () => {
    if (isEmpty(drawingCoordinates) || !selectedCrop || !selectedGrowthStage) {
      console.log(isEmpty(drawingCoordinates));
      alert(
        `Please fill all required fields \nSelected coodinates: ${drawingCoordinates}
        \nSelected CropType:${selectedCrop}\nSelected GrowthStage:${selectedGrowthStage}`,
      );
      return;
    }
    const input: Record<string, string> = {
      geometry: JSON.stringify(drawingCoordinates),
      croptype: selectedCrop as string,
      growthstage: selectedGrowthStage as string,
      flowrate: waterFlow
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
          onDrawStop={(e) => console.log(e)}
        />
      </FeatureGroup>
      <CropSelectionModal
        onSubmit={(cropType, growthStage, irrigationType, waterFlow) => {
          setSelectedCrop(cropType);  // Update crop type
          setSelectedGrowthStage(growthStage);  // Update growth stage
          setIrrigationType(irrigationType)
          setWaterFlow(waterFlow)
        }}
      />
      <ChatBotModal irrigationType={irrigationType} cropType={selectedCrop} growthStage={selectedGrowthStage} waterFlow={waterFlow}  />
      <SetFarmLocationButton />
      <Button className='get-water-usage-button' onClick={handleFetchWaterUsage}>Get water usage</Button>
    </MapContainer>
  );
};

export default Map;
