import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'

export default function DatePickerControl() {
  const [isOpen, setIsOpen] = useState(false)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

  const toggleDatePicker = () => {
    setIsOpen(!isOpen)
  }

   const handleDateChange = (update: [Date | null, Date | null]) => {
    console.log(update)
    setDateRange(update)
    if (update[0] && update[1]) {
      setIsOpen(false) // Close the picker when a range is selected
    }
  }

  return (
    <div className='leaflet-top leaflet-right'>
      <div className="leaflet-control leaflet-bar">
        <a 
          href="#" 
          role="button" 
          title="Select Date Range"
          onClick={(e) => {
            e.preventDefault()
            toggleDatePicker()
          }}
          className="leaflet-control-date-picker"
        >
          <FontAwesomeIcon icon={faCalendar} />
        </a>
        {isOpen && (
          <div className="date-picker-popup">
             <DatePicker
              selectsRange={true}
              startDate={startDate ?? undefined}
              endDate={endDate ?? undefined}
              onChange={handleDateChange}
              inline
            />
          </div>
        )}
      </div>
    </div>
  )
}