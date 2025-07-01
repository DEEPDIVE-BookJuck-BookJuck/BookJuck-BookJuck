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
    <div className="bg-white border rounded-lg shadow-sm w-full h-[300px] flex flex-col overflow-hidden">
      
      {/* 상단: 이미지 & 버튼 (60%) */}
      <div className="relative bg-gray-100 border-b border-gray-300 flex justify-center items-center h-[60%] p-4 rounded-t-lg">
        <Image
          src={book.cover}
          alt={book.title}
          width={96}
          height={144}
          className="object-contain rounded max-h-full"
        />

        {/* 버튼들: 오른쪽 상단 */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => setIsRead(!isRead)}
            className="w-8 h-8 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 transition"
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
            className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full transition ${
              isFavorited ? 'bg-yellow-100' : 'bg-white hover:bg-yellow-100'
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

        {/* 왼쪽 하단: 읽음 표시 */}
        {isRead && (
          <div
            className="absolute bottom-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md select-none"
            style={{ backgroundColor: '#22C55E' }}
          >
            읽음
          </div>
        )}
      </div>

      {/* 하단: 텍스트 정보 (40%) */}
      <div className="h-[40%] px-3 py-2 flex flex-col justify-center items-center text-center">
        <h3 className="text-sm font-semibold line-clamp-2 h-[40px] leading-tight">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1 h-[20px]">
          {book.author}
        </p>
      </div>
    </div>
  )
}

export default BookCard
