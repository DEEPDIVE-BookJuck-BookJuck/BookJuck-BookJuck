'use client'

import { useState } from 'react'
import LibraryBookItem from '@/app/(with-header)/my-library/_components/library-book-item'
import { Search } from 'lucide-react'

interface Review {
  endDate: string
  memo: string
  rating: number
  tags: string[]
}

interface Book {
  id: string
  title: string
  author: string
  thumbnailUrl: string
  review: Review
}

// 샘플 데이터
const SAMPLE_BOOKS: Book[] = Array.from({ length: 6 }, (_, i) => ({
  id: `${i}`,
  title: `책 제목 예시 ${i + 1}`,
  author: `저자 ${i + 1}`,
  thumbnailUrl: '/images/placeholder-book.png',
  review: {
    endDate: '2025-06-16',
    memo: '간단한 독후감 예시입니다.',
    rating: Math.floor(Math.random() * 6),
    tags: ['감동', '추천', '지식'],
  },
}))

export default function MyLibraryPage() {
  const [query, setQuery] = useState('')

  // 검색된 리스트
  const filtered = SAMPLE_BOOKS.filter(
    (book) =>
      book.title.includes(query) || book.author.includes(query),
  )

  return (
    <div>
      <div className="mb-8 space-y-4">
        {/* 검색창 */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="제목 또는 저자 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm pl-10"
            />
          </div>
        </div>
      </div>

      {/* 저장된 책이 없을 때 */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20">
          아직 저장된 책이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book) => (
            <LibraryBookItem
              key={book.id}
              {...book}
            />
          ))}
        </div>
      )}

      {/* 더 보기 버튼 */}
      {filtered.length > 0 && (
        <div className="text-center mt-6">
          <button className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer">
            더 보기
          </button>
        </div>
      )}
    </div>
  )
}
