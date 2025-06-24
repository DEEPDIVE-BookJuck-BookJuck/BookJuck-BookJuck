import groupExtraTags from '@/\butils/groupExtraTags'
import { TagType, TooltipPropsType } from '@/app/types/mypage'
import { FC } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const data: TagType[] = [
  {
    tag: '인스타툰',
    count: 2,
    percent: 22.2,
  },
  {
    tag: '힐링',
    count: 1,
    percent: 11.1,
  },
  {
    tag: '유머',
    count: 1,
    percent: 11.1,
  },
  {
    tag: '노벨문학상',
    count: 1,
    percent: 11.1,
  },
  {
    tag: '에세이',
    count: 1,
    percent: 11.1,
  },
  {
    tag: '한국문학',
    count: 1,
    percent: 11.1,
  },
  {
    tag: '단편소설',
    count: 1,
    percent: 11.1,
  },
  {
    tag: '감동',
    count: 1,
    percent: 11.1,
  },
]

const data1 = groupExtraTags(data)

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

export default function TagGraph() {
  return (
    <div className="flex flex-col w-full h-full ">
      <ResponsiveContainer
        width="100%"
        height="72%"
      >
        <PieChart>
          <Pie
            data={data1}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="count"
            nameKey="tag"
            label={({ tag, percent }) => `${tag} (${percent}%)`}
            labelLine={true}
          >
            {data1.map((_, index) => (
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
        {data1.map((tag, index) => (
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
