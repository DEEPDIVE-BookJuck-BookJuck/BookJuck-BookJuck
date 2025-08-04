'use client'

import Image from 'next/image'
import { BookType } from '../../../_types'

export default function BookThumbnail({ book }: { book: BookType }) {
  const endDate = book.review?.endDate

  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg border border-gray-300 bg-white shadow-sm p-6 text-left break-words">
        <Image
          src={book.thumbnailUrl || '/images/placeholder-book.svg'}
          width={150}
          height={200}
          alt={book.title}
          className="mx-auto mb-4 rounded"
        />
        <h3 className="mb-1 font-semibold text-lg">{book.title}</h3>
        <p className="mb-2 text-gray-600">{book.author}</p>
        {endDate && (
          <p className="text-sm text-gray-400">
            독후감 작성 날짜 : {endDate}
          </p>
        )}
      </div>
    </div>
  )
}
