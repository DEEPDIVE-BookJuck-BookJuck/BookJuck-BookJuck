'use client'

import { useRouter } from 'next/navigation'

interface LibraryBookItemProps {
  id: string
  title: string
  author: string
  thumbnailUrl: string
  review: {
    endDate: String
    tags: string[]
  }
}

export default function LibraryBookItem({
  id,
  title,
  author,
  thumbnailUrl,
  review,
}: LibraryBookItemProps) {
  const router = useRouter()
  const goToDetail = () => router.push(`/mylibrary/${id}`)

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <img
          // src={thumbnailUrl}
          src="https://kzmofp7ao28a6ox52yiz.lite.vusercontent.net/placeholder.svg?height=200&width=150"
          alt={title}
          className="w-16 h-20 object-cover rounded"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{author}</p>
          <p className="text-gray-500 text-xs mb-3">
            읽은 날: {review.endDate}
          </p>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1 mb-3">
            {review.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 rounded-full text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* 독후감 보기 버튼 */}
          <button
            onClick={goToDetail}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-white bg-slate-950 hover:bg-slate-800 h-9 rounded-md px-3 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pen-line h-3 w-3 mr-1"
            >
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
            독후감 보기
          </button>
        </div>
      </div>
    </div>
  )
}
