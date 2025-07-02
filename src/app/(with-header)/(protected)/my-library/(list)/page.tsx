'use client'

import { useEffect, useState, useCallback } from 'react'
import LibraryBookItem from '../_components/library-book-item'
import { Search } from 'lucide-react'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { useDebounce } from '@/hooks/use-debounce'

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

const LIMIT = 9

export default function MyLibraryPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  const fetchBooks = useCallback(
    async (reset = false) => {
      try {
        setLoading(true)
        const currentOffset = reset ? 0 : offset
        const res = await fetchWithAuth<Book[]>(
          `/api/library?offset=${currentOffset}&limit=${LIMIT}&q=${debouncedQuery}`,
          { auth: true },
        )

        if (reset) {
          setBooks(res)
          setOffset(LIMIT)
        } else {
          setBooks((prev) => [...prev, ...res])
          setOffset((prev) => prev + LIMIT)
        }

        setHasMore(res.length === LIMIT)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    [debouncedQuery, offset],
  )

  useEffect(() => {
    fetchBooks(true)
  }, [debouncedQuery, fetchBooks])

  return (
    <div>
      {/* 검색창 */}
      <div className="mb-8 space-y-4">
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

      {/* 상태 표시 */}
      {loading && books.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          불러오는 중...
        </p>
      )}
      {!loading && books.length === 0 && (
        <p className="text-center text-gray-500 mt-20">
          아직 저장된 책이 없습니다.
        </p>
      )}

      {/* 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <LibraryBookItem
            key={book.id}
            {...book}
          />
        ))}
      </div>

      {/* 더 보기 버튼 */}
      {hasMore && (
        <div className="text-center mt-6">
          <button
            disabled={loading}
            onClick={() => fetchBooks()}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer disabled:opacity-50"
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  )
}
