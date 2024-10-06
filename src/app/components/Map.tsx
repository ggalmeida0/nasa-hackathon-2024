'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from "react-leaflet-draw"
import DatePickerControl from './DatePickerControl'
import GetWaterUsageButton from './GetWaterUsageButton'
import IntervalPickerControl from './IntervalPickerControl'  
import CropSelectionModal from './CropSelectionModal'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet'
import _ from 'lodash'

export type DateRange = [Date | null, Date | null]


const Map = () => {
  const [selectedDates, setSelectedDates] = useState<DateRange>([null, null])
  const [drawingCoordinates, setDrawingCoordinates] = useState<string[]>([])

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
    const coordinates = layer.toGeoJSON().geometry.coordinates as number[]
    setDrawingCoordinates(coordinates.flat().flatMap(value => value.toString()))
  }

  const handleFetchWaterUsage = async () => {
    if (_.isEmpty(drawingCoordinates) || _.isEmpty(selectedDates[0]) || _.isEmpty(selectedDates[1])) {a
      console.log(_.isEmpty(drawingCoordinates))
      alert(`Please select the date range, and draw the coordinates. \nSelected coodinates: ${drawingCoordinates}\nSelected Dates: ${selectedDates}`)
      return
    }
    const [startDate, endDate] = selectedDates.map(date => date?.toISOString().split('T')[0])
      const input: Record<string,string> = {
        geometry: drawingCoordinates.join(','),
        startdate: startDate as string,
        enddate: endDate as string,
        interval: 'daily'
      }
      const result = await (await fetch('/api/getwaterusage?' + new URLSearchParams(input).toString())).json()
      console.log(result)
  }

  return (
    <MapContainer center={[36.7783, -119.4179]} zoom={13} style={{ height: '100vh', width: '100%' }}>
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
            polygon:true,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
          }}
        />
      </FeatureGroup>
      <GetWaterUsageButton onFetchWaterUsage={handleFetchWaterUsage}/>
      <CropSelectionModal  />
    </MapContainer>
  )
}

export default Map