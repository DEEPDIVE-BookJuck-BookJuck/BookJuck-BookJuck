import { RecentBookType } from '../_types'
import RecentBookItem from './recent-book-item'

export default function RecentBook({
  data,
}: {
  data: RecentBookType[]
}) {
  return (
    <div className="bg-white border-1 border-gray-300 rounded-xl px-6 py-6">
      <p className="text-2xl font-bold mb-3">최근 읽은 책</p>
      {data.length === 0 ? (
        <span className="flex justify-center items-center w-full h-14 font-medium">
          최근 작성한 독후감이 없습니다
        </span>
      ) : (
        <div className="grid gap-6">
          {data.map((recentBook) => (
            <RecentBookItem
              key={recentBook.id}
              title={recentBook.title}
              author={recentBook.author}
              date={recentBook.review.endDate}
              rating={recentBook.review.rating}
            />
          ))}
        </div>
      )}
    </div>
  )
}
