'use client'
import React from 'react'
import { Star } from 'lucide-react'

export default function RatingInput({
  rating,
  setRating,
}: {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <div>
      <label className="text-base font-medium mb-3 block">평점</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((v) => (
          <Star
            key={v}
            size={24}
            fill={v <= rating ? '#FBBF24' : '#D1D5DB'}
            stroke="none"
            className="cursor-pointer"
            onClick={() => setRating((prev) => (prev === v ? 0 : v))}
            aria-label={`${v}점 별`}
          />
        ))}
        <span className="ml-2 text-gray-600">({rating}/5)</span>
      </div>
    </div>
  )
}
