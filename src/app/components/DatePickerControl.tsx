import React, { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker'
import { DateRange } from './Map'

export type DatePickerControlProps = {
  onDateSelection: (updatedDate: DateRange) => void;
  dateSelection: DateRange
}

export default function DatePickerControl({ onDateSelection, dateSelection }: DatePickerControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, endDate] = dateSelection

  const toggleDatePicker = () => {
    setIsOpen(!isOpen)
  }

   const handleDateChange = (update: DateRange) => {
    onDateSelection(update)
    setIsOpen(false)
  }

  return (
    <div className='leaflet-control-datepicker-container'>
      <div className="leaflet-bar">
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
          <div className="leaflet-control-datepicke">
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