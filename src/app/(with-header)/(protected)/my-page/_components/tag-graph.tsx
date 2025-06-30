import groupExtraTags from '@/utils/group-extra-tags'
import { TagBookType, TagType } from '../_types'
import { FC } from 'react'
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
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-800 mb-1">
            기타: {data.count}
          </p>
          <p className="text-xs text-gray-600">
            {data.originalItems
              .map((item) => `${item.tag}(${item.count})`)
              .join(', ')}
          </p>
        </div>
      )
    }

    return (
      <div className="bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-800">
          {data.tag}: {data.count}
        </p>
      </div>
    )
  }
  return null
}

export default function TagGraph({ data }: { data: TagBookType[] }) {
  if (data.length === 0)
    return (
      <h3 className="flex h-full justify-center items-center font-medium">
        작성한 독후감이 없습니다
      </h3>
    )
  const groupingData = groupExtraTags(data)

  return (
    <div className="flex flex-col w-full h-full ">
      <ResponsiveContainer
        width="100%"
        height="72%"
      >
        <PieChart>
          <Pie
            data={groupingData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="count"
            nameKey="tag"
            label={({ tag, percent }) => `${tag} (${percent}%)`}
            labelLine={true}
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
      <div className="flex flex-wrap gap-2 mt-4 items-center">
        {groupingData.map((tag, index) => (
          <div
            key={tag.tag}
            className="flex items-center gap-1 text-sm bg-gray-100 w-auto px-1.5 rounded-xl"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            {tag.tag} ({tag.count})
          </div>
        ))}
      </div>
    </div>
  )
}
