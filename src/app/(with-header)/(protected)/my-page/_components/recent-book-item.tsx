interface RecentBookItemPropsType {
  title: string
  author: string
  date: string
  rating: number
}

export default function RecentBookItem({
  title,
  author,
  date = '',
  rating,
}: RecentBookItemPropsType) {
  return (
    <div className="flex justify-between items-center h-24 bg-gray-100 rounded-lg px-6">
      <div>
        <p className="font-bold">{title}</p>
        <p className="text-sm text-gray-600">{author}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <div>
        <span className="text-yellow-500">{'★'.repeat(rating)}</span>
        <span className="text-gray-500">
          {'★'.repeat(5 - rating)}
        </span>
      </div>
    </div>
  )
}
