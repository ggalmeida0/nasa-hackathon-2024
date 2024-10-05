import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export default function IntervalPickerControl() {
  const [isOpen, setIsOpen] = useState(false)
  const [interval, setInterval] = useState('daily')

  const toggleIntervalPicker = () => {
    setIsOpen(!isOpen)
  }

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value)
    console.log(`Selected interval: ${e.target.value}`)
    setIsOpen(false) // Close the picker after selecting an interval
  }

  return (
    <div className="leaflet-control-intervalpicker-container"> 
      <div className="leaflet-bar">
        <a 
          href="#" 
          role="button" 
          title="Select Time Interval"
          onClick={(e) => {
            e.preventDefault()
            toggleIntervalPicker()
          }}
          className="leaflet-control-interval-picker"
        >
          <FontAwesomeIcon icon={faClock} />
        </a>
        {isOpen && (
          <div className="interval-picker-popup">
            <select value={interval} onChange={handleIntervalChange}>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}
      </div>
    </div>
  )
}