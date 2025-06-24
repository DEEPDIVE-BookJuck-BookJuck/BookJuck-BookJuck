'use client'

import { Calendar, Tag } from 'lucide-react'
import MonthlyGraph from './MonthlyGraph'
import TagGraph from './TagGraph'

export default function Graph({ title }: { title: string }) {
  return (
    <div className="h-96 bg-white border-1 border-gray-300 rounded-xl px-6 py-6">
      <div className="flex items-center gap-2 mb-3">
        {title == 'MonthlyGraph' ? <Calendar /> : <Tag />}
        <p className="text-2xl font-bold">
          {title == 'MonthlyGraph'
            ? '월별 독서량'
            : '태그별 독후감 분포'}
        </p>
      </div>
      {title == 'MonthlyGraph' && <MonthlyGraph />}
      {title == 'TagGraph' && <TagGraph />}
    </div>
  )
}
