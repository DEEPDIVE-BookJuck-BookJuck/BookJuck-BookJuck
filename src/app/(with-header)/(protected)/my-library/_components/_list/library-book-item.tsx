'use client'

import { useRouter } from 'next/navigation'
import { PenLine } from 'lucide-react'
import BookThumbnail from './book-thumbnail'
import TagList from '../../../_components/tag-list'
import RatingStars from './rating-stars'
import { BookType } from '../../../_types'

export default function LibraryBookItem({
  id,
  title,
  author,
  thumbnailUrl,
  review,
}: BookType) {
  const router = useRouter()
  const hasReview = Boolean(review?.endDate)
  const rating = review?.rating ?? 0

  const goToDetail = () => {
    if (hasReview) router.push(`/my-library/${id}/view`)
    else router.push(`/my-library/${id}`)
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow break-words">
      <div className="flex">
        <div className="flex-shrink-0">
          <BookThumbnail
            title={title}
            src={thumbnailUrl}
            className="w-[120px] h-[152px]"
            priority={true}
          />
        </div>
        <div className="flex-1 min-w-0  pl-4">
          <h3 className="font-semibold text-lg mb-2 truncate h-6">
            {title || '\u00A0'}
          </h3>
          <p className="text-gray-600 text-sm mb-2 truncate h-5">
            {author || '\u00A0'}
          </p>
          {hasReview && rating > 0 && (
            <RatingStars
              value={rating}
              showNumber
              className="mb-2"
            />
          )}
          <p className="text-gray-500 text-xs mb-3 truncate h-4">
            {hasReview
              ? `독후감 작성 날짜 : ${review.endDate}`
              : '\u00A0'}
          </p>
          <div className="mb-2 h-5 overflow-hidden">
            <TagList tags={review?.tags ?? []} />
          </div>
          <button
            onClick={goToDetail}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium h-9 rounded-md px-3 mt-2 cursor-pointer
              ${
                hasReview
                  ? 'text-white bg-slate-950 hover:bg-slate-800'
                  : 'text-gray-800 bg-white border border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <PenLine className="h-3 w-3" />
            {hasReview ? '독후감 보기' : '독후감 작성'}
          </button>
        </div>
      </div>
    </div>
  )
}
