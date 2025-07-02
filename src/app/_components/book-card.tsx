'use client'

import Image from 'next/image'
import { BookType } from '@/app/_types/index'
import { FC, useState } from 'react'
import { BookOpen, Star } from 'lucide-react'
import { fetchWithAuth } from '@/lib/fetch-with-auth'

export interface BookCardPropsType {
  book: BookType
}

const BookCard: FC<BookCardPropsType> = ({ book }) => {
  const [isInLibrary, setIsInLibrary] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddToLibrary = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    setError(null)

    try {
      await fetchWithAuth('/api/library', {
        auth: true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          thumbnailUrl: book.cover,
          isbn: book.isbn, // 🔐 BookType에 isbn 필드 있어야 함
        }),
      })

      setIsInLibrary(true)
    } catch (err: any) {
      if (err.message?.includes('409')) {
        setError('이미 내 서재에 추가된 책입니다.')
      } else {
        console.error('서재 추가 실패:', err)
        setError('서재 추가 중 오류가 발생했습니다.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm w-full h-[300px] flex flex-col overflow-hidden">
      {/* 상단: 이미지 & 버튼 */}
      <div className="relative bg-gray-100 border-b border-gray-300 flex justify-center items-center h-[60%] p-4 rounded-t-lg">
        <Image
          src={book.cover}
          alt={book.title}
          width={96}
          height={144}
          className="object-contain rounded max-h-full"
        />

        {/* 오른쪽 상단 버튼들 */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleAddToLibrary}
            disabled={isSubmitting || isInLibrary}
            className="w-8 h-8 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 transition cursor-pointer"
            aria-label="내 서재 추가 버튼"
          >
            <BookOpen
              className="w-4 h-4"
              stroke={isInLibrary ? '#22C55E' : 'black'}
              fill={isInLibrary ? '#22C55E' : 'none'}
            />
          </button>

          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full transition cursor-pointer ${
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

        {/* 왼쪽 하단: 등록됨 표시 */}
        {isInLibrary && (
          <div
            className="absolute bottom-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md select-none"
            style={{ backgroundColor: '#22C55E' }}
          >
            내 서재 등록됨
          </div>
        )}
      </div>

      {/* 하단: 텍스트 정보 */}
      <div className="h-[40%] px-3 py-2 flex flex-col justify-center items-center text-center">
        <h3 className="text-sm font-semibold line-clamp-2 h-[40px] leading-tight">
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-1 h-[20px]">
          {book.author}
        </p>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>
    </div>
  )
}

export default BookCard
