'use client'

import Image from 'next/image'
import { BookType } from '@/app/_types/index'
import { FC, useState } from 'react'
import { BookOpen, Star } from 'lucide-react'

export interface BookCardPropsType {
  book: BookType
}

const BookCard: FC<BookCardPropsType> = ({ book }) => {
  const [isRead, setIsRead] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  return (
    <div className="bg-white border rounded-lg shadow-sm p-0 w-full h-full flex flex-col">
      
      {/* 사진 박스 (relative) */}
      <div className="relative bg-gray-100 border-b border-gray-300 flex justify-center p-4 rounded-t-lg">
        <Image
          src={book.cover}
          alt={book.title}
          width={96}
          height={144}
          className="object-cover rounded"
        />

        {/* 읽음 / 즐겨찾기 버튼 (오른쪽 상단) */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => setIsRead(!isRead)}
            className="w-10 h-10 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 transition"
            aria-label="읽음 버튼"
          >
            <BookOpen
              className="w-4 h-4"
              stroke={isRead ? '#22C55E' : 'black'}
              fill={isRead ? '#22C55E' : 'none'}
            />
          </button>

          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-yellow-100 transition ${
              isFavorited ? 'bg-yellow-100' : 'bg-white'
            }`}
            aria-label="즐겨찾기 버튼"
          >
            <Star
              className="w-4 h-4"
              stroke={isFavorited ? '#FACC15' : 'black'}
              fill={isFavorited ? '#FACC15' : 'none'}
            />
          </button>
        </div>

        {/* 읽음 상태 표시 박스 (왼쪽 하단) */}
        {isRead && (
          <div
            className="absolute bottom-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md select-none"
            style={{ backgroundColor: '#22C55E' }}
          >
            읽음
          </div>
        )}
      </div>

      {/* 제목, 작가 */}
      <div className="flex flex-col items-center p-4">
        <h3 className="text-sm font-semibold text-center mb-1 line-clamp-2 h-[40px]">
          {book.title}
        </h3>

        <p className="text-xs text-gray-500 text-center mb-0 line-clamp-1 h-[20px]">
          {book.author}
        </p>
      </div>
    </div>
  )
}

export default BookCard
