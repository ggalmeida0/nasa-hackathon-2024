import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint } from '@fortawesome/free-solid-svg-icons'

interface WaterUsageControlProps {
  onFetchWaterUsage: () => Promise<void>;
}

export default function WaterUsageControl({ onFetchWaterUsage }: WaterUsageControlProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onFetchWaterUsage()
    } catch (error) {
      console.error('Error fetching water usage:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='leaflet-bottom leaflet-left'>
      <div className="leaflet-control leaflet-bar">
        <a 
          href="#" 
          role="button" 
          title="Get Water Usage"
          onClick={handleClick}
          className={`leaflet-control-water-usage ${isLoading ? 'loading' : ''}`}
        >
          <FontAwesomeIcon icon={faTint} spin={isLoading} />
        </a>
      </div>
    </div>
  )
}
