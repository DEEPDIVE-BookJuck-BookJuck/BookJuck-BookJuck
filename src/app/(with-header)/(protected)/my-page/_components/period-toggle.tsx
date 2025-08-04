'use client'

import { useState } from 'react'

type PeriodType = 6 | 12

interface PeriodToggleProps {
  initialPeriod?: PeriodType
  onChange: (period: PeriodType) => void
}

export default function PeriodToggle({ 
  initialPeriod = 6, 
  onChange 
}: PeriodToggleProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>(initialPeriod)

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period)
    onChange(period)
  }

  return (
    <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
      <button
        onClick={() => handlePeriodChange(6)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          selectedPeriod === 6
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        6개월
      </button>
      <button
        onClick={() => handlePeriodChange(12)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          selectedPeriod === 12
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        1년
      </button>
    </div>
  )
}