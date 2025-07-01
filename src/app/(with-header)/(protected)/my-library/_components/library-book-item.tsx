'use client'

import { useRouter } from 'next/navigation'
import { PenLine } from 'lucide-react'
import BookThumbnail from './book-thumbnail'
import TagList from './tag-list'

interface LibraryBookItemProps {
  id: string
  title: string
  author: string
  thumbnailUrl: string
  review: {
    endDate: string
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
  const goToDetail = () => router.push(`/my-library/${id}`)

  const hasReview = Boolean(review?.endDate)

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        <BookThumbnail
          title={title}
          src={thumbnailUrl}
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-2">{author}</p>
          {hasReview && (
            <p className="text-gray-500 text-xs mb-3">
              읽은 날: {review.endDate}
            </p>
          )}

          <TagList tags={review?.tags ?? []} />

          {/* 버튼 */}
          <button
            onClick={goToDetail}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-9 rounded-md px-3 cursor-pointer
              ${
                hasReview
                  ? 'text-white bg-slate-950 hover:bg-slate-800'
                  : 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <PenLine className="h-3 w-3 mr-1" />
            {hasReview ? '독후감 보기' : '독후감 작성'}
          </button>
        </div>
      </div>
    </div>
  )
}
