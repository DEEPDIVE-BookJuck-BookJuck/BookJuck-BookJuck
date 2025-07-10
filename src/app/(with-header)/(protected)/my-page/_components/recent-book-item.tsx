import TagList from '../../_components/tag-list'

interface RecentBookItemPropsType {
  title: string
  author: string
  date: string
  rating: number
  tags: string[]
}

export default function RecentBookItem({
  title,
  author,
  date = '',
  rating,
  tags,
}: RecentBookItemPropsType) {
  return (
    <div className="flex justify-between items-center h-28 bg-blue-50/50 border-blue-50 rounded-lg px-2 md:px-6">
      <div className="w-3/5">
        <p className="font-bold truncate">{title}</p>
        <p className="text-sm text-gray-600 truncate">{author}</p>
        <p className="text-xs text-gray-400 mb-2">{date}</p>
        <div className="overflow-hidden h-6">
          <TagList
            tags={tags}
            style="text-gray-600 bg-slate-200/50"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <span className="text-yellow-500">{'★'.repeat(rating)}</span>
        <span className="text-gray-300">
          {'★'.repeat(5 - rating)}
        </span>
      </div>
    </div>
  )
}
