'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import DatePickerControl from './DatePickerControl'
import GetWaterUsageButton from './GetWaterUsageButton'
import IntervalPickerControl from './IntervalPickerControl'  
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet'

const Map = () => {
  useEffect(() => {
    // This is needed to fix Leaflet icons not displaying
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png',
    })
  }, [])

  const handleCreated = (e: any) => {
    const { layer } = e
    // Handle the created shape here
    console.log(layer.toGeoJSON())
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <FeatureGroup>
        <EditControl
          position='topright'
          onCreated={handleCreated}
          draw={{
            rectangle: false,
            polygon:false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: true,
          }}
        />
      </FeatureGroup>
      {/* <GetWaterUsageButton onFetchWaterUsage={}/> */}
      <DatePickerControl onDateSelection={() => {}}/>
      <IntervalPickerControl />
    </MapContainer>
  )
}

export default Map