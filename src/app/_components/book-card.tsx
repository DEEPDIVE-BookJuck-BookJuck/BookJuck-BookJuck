'use client'

import Image from 'next/image'
import { BookType, AddBookResponse } from '@/app/_types/index'
import { FC, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { fetchWithAuth } from '@/lib/fetch-with-auth'

export interface BookCardPropsType {
  book: BookType
}

const BookCard: FC<BookCardPropsType> = ({ book }) => {
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()

  const handleAddToLibrary = async () => {
    try {
      const res = await fetchWithAuth<AddBookResponse>('/api/library', {
        method: 'POST',
        auth: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          thumbnailUrl: book.cover,
          isbn: book.isbn,
        }),
      })

      alert('내 서재에 추가되었습니다!')
      setIsAdded(true)
    } catch (error: any) {
      const msg = error.message || ''

      if (msg.includes('401')) {
        alert('로그인 후 이용해주세요.')
        router.push('/auth/log-in')
      } else if (msg.includes('409')) {
        alert('이미 내 서재에 있는 책입니다.')
        setIsAdded(true)
      } else {
        console.error('서재 추가 실패:', error)
        alert('서재 추가에 실패했습니다.')
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-[300px] flex flex-col overflow-hidden">
      <div className="relative bg-gray-100 border-b border-gray-300 flex justify-center items-center h-[60%] p-4 rounded-t-lg">
        <Image
          src={book.cover || '/images/placeholder-book.svg'}
          alt={book.title}
          width={96}
          height={144}
          className="object-contain rounded max-h-full"
        />

        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleAddToLibrary}
            className="w-8 h-8 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 transition"
            aria-label="내 서재 추가"
          >
            <BookOpen
              className="w-4 h-4"
              stroke={isAdded ? '#22C55E' : 'black'}
              fill={isAdded ? '#22C55E' : 'none'}
            />
          </button>
        </div>

        {isAdded && (
          <div
            className="absolute bottom-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md select-none"
            style={{ backgroundColor: '#22C55E' }}
          >
            추가됨
          </div>
        )}
      </div>

      <div className="h-[40%] px-3 py-2 flex flex-col justify-center items-center text-center">
        <h3 className="text-sm font-semibold w-full truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-xs text-gray-500 w-full truncate" title={book.author}>
          {book.author}
        </p>
      </div>
    </div>
  )
}

export default BookCard
