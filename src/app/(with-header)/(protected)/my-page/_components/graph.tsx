'use client'

import { Calendar, Tag } from 'lucide-react'
import { useState } from 'react'
import MonthlyGraph from './monthly-graph'
import TagGraph from './tag-graph'
import PeriodToggle from './period-toggle'
import { MonthlyBookType, TagBookType } from '../_types'
import { fetchWithAuth } from '@/lib/fetch-with-auth'

type GraphProps<T> = T extends MonthlyBookType[]
  ? { title: 'MonthlyGraph'; data: MonthlyBookType[] }
  : { title: 'TagGraph'; data: TagBookType[] }

export default function Graph<
  T extends MonthlyBookType[] | TagBookType[],
>({ title, data }: GraphProps<T>) {
  const [currentData, setCurrentData] = useState(data)
  const [isLoading, setIsLoading] = useState(false)

  const handlePeriodChange = async (months: 6 | 12) => {
    if (title !== 'MonthlyGraph') return

    setIsLoading(true)
    try {
      const newData = await fetchWithAuth<MonthlyBookType[]>(
        `/api/reading/monthly?months=${months}`,
      )

      setCurrentData(newData)
    } catch (error) {
      console.error('기간별 데이터 로딩 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[400px] min-w-80 justify-between  bg-white border-1 border-gray-300 rounded-xl px-6 py-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {title == 'MonthlyGraph' ? <Calendar /> : <Tag />}
          <p className="text-2xl font-bold">
            {title == 'MonthlyGraph'
              ? '월별 독서량'
              : '태그별 독후감 분포'}
          </p>
        </div>
        {title === 'MonthlyGraph' && (
          <PeriodToggle onChange={handlePeriodChange} />
        )}
      </div>
      <div className={isLoading ? 'opacity-50' : ''}>
        {title == 'MonthlyGraph' && (
          <MonthlyGraph data={currentData as MonthlyBookType[]} />
        )}
        {title == 'TagGraph' && (
          <TagGraph data={data as TagBookType[]} />
        )}
      </div>
    </div>
  )
}
