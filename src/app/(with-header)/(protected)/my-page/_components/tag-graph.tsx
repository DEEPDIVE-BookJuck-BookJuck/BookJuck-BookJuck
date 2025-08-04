'use client'

import groupExtraTags from '@/utils/group-extra-tags'
import { TagBookType, TagType } from '../_types'
import { FC, useState, useEffect } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface TooltipPropsType {
  active?: boolean
  payload?: Array<{
    payload: TagType
  }>
}

const COLORS = [
  '#5B9BD5',
  '#70C7BA',
  '#87CEEB',
  '#B19CD9',
  '#48CAE4',
  '#72A9F7',
  '#52C292',
]

const CustomTooltip: FC<TooltipPropsType> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload

    if (data.tag === '기타' && data.originalItems) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <p className="text-xs md:text-sm font-medium text-gray-800 mb-1">
            기타: {data.count}
          </p>
          <p className="text-xs text-gray-600 break-words">
            {data.originalItems
              .map((item) => `${item.tag}(${item.count})`)
              .join(', ')}
          </p>
        </div>
      )
    }

    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-xs md:text-sm font-medium text-gray-800">
          {data.tag}: {data.count}
        </p>
      </div>
    )
  }
  return null
}

export default function TagGraph({ data }: { data: TagBookType[] }) {
  const [outerRadius, setOuterRadius] = useState(70)

  useEffect(() => {
    const calculateRadius = () => {
      const width = window.innerWidth
      if (width < 768) setOuterRadius(50)
      else if (width < 1024) setOuterRadius(60)
      else setOuterRadius(85)
    }

    calculateRadius()

    window.addEventListener('resize', calculateRadius)

    return () => window.removeEventListener('resize', calculateRadius)
  }, [])

  if (data.length === 0)
    return (
      <div className="flex h-full justify-center items-center">
        <h3 className="font-medium text-sm md:text-base text-gray-600">
          작성한 독후감이 없습니다
        </h3>
      </div>
    )

  const groupingData = groupExtraTags(data)

  return (
    <div className="flex flex-col w-full h-full">
      <ResponsiveContainer
        width="100%"
        height={250}
      >
        <PieChart>
          <Pie
            data={groupingData}
            cx="50%"
            cy="50%"
            outerRadius={outerRadius}
            dataKey="count"
            nameKey="tag"
            label={({ tag, percent }) => `${tag} (${percent}%)`}
            labelLine={true}
            className="text-xs lg:text-base"
          >
            {groupingData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-1.5 mt-2 items-center px-1">
        {groupingData.map((tag, index) => (
          <div
            key={tag.tag}
            className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 transition-colors duration-200 w-auto px-1.5 py-0.5 rounded-xl"
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />
            {tag.tag} ({tag.count})
          </div>
        ))}
      </div>
    </div>
  )
}
