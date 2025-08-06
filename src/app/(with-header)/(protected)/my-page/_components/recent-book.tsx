import Link from 'next/link'
import { BookType } from '../../_types'
import RecentBookItem from './recent-book-item'
import { ChevronRight } from 'lucide-react'

export default function RecentBook({ data }: { data: BookType[] }) {
  return (
    <div className="bg-white border-1 border-gray-300 rounded-xl px-6 py-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold mb-3">최근 작성된 독후감</p>
        <Link
          href={'/my-library'}
          className="flex items-center font-semibold text-sm"
        >
          내 서재
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
      {data.length === 0 ? (
        <span className="flex justify-center items-center w-full h-14 font-medium">
          최근 작성한 독후감이 없습니다
        </span>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {data.map((recentBook) => (
            <RecentBookItem
              key={recentBook.id}
              id={recentBook.id}
              title={recentBook.title}
              author={recentBook.author}
              date={recentBook.review.endDate}
              rating={recentBook.review.rating}
              tags={recentBook.review.tags}
            />
          ))}
        </div>
      )}
    </div>
  )
}
