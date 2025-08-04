'use client'

import { Star } from 'lucide-react'

interface RatingStarsProps {
  value: number
  max?: number
  size?: number
  showNumber?: boolean
  className?: string
}

export default function RatingStars({
  value,
  max = 5,
  size = 20,
  showNumber = false,
  className = '',
}: RatingStarsProps) {
  return (
    <div
      className={`flex items-center gap-1 pointer-events-none ${className}`}
      role="img"
      aria-label={`별점 ${value}점 / ${max}점`}
    >
      {Array.from({ length: max }, (_, i) => {
        const v = i + 1
        return (
          <Star
            key={v}
            size={size}
            fill={v <= value ? '#FBBF24' : '#E5E7EB'}
            stroke="none"
          />
        )
      })}
      {showNumber && (
        <span className="ml-1 text-xs text-gray-600">
          ({value}/{max})
        </span>
      )}
    </div>
  )
}
