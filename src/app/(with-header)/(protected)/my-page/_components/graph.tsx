'use client'

import { Calendar, Tag } from 'lucide-react'
import MonthlyGraph from './monthly-graph'
import TagGraph from './tag-graph'
import { MonthlyBookType, TagBookType } from '../_types'

type GraphProps<T> = T extends MonthlyBookType[]
  ? { title: 'MonthlyGraph'; data: MonthlyBookType[] }
  : { title: 'TagGraph'; data: TagBookType[] }

export default function Graph<
  T extends MonthlyBookType[] | TagBookType[],
>({ title, data }: GraphProps<T>) {
  return (
    <div className="flex flex-col h-[400px] min-w-80 justify-between  bg-white border-1 border-gray-300 rounded-xl px-6 py-6">
      <div className="flex items-center gap-2 mb-3">
        {title == 'MonthlyGraph' ? <Calendar /> : <Tag />}
        <p className="text-2xl font-bold">
          {title == 'MonthlyGraph'
            ? '월별 독서량'
            : '태그별 독후감 분포'}
        </p>
      </div>
      {title == 'MonthlyGraph' && <MonthlyGraph data={data} />}
      {title == 'TagGraph' && <TagGraph data={data} />}
    </div>
  )
}
