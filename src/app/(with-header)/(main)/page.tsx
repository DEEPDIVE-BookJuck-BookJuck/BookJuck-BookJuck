'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search } from 'lucide-react'
import { BookType, RawBookItemType } from './_types'
import BookCard from './_components/book-card'
import BookCardSkeleton from './_components/skeleton/book-card-skeleton'
import ListPageSkeleton from './_components/skeleton/list-page-skeleton'

// 각각 다른 페이지당 개수
const ITEMS_PER_PAGE_SEARCH = 5
const ITEMS_PER_PAGE_BESTSELLER = 10

// 각각 다른 최대 페이지 수
const MAX_SEARCH_PAGE = 10
const MAX_BESTSELLER_PAGE = 10

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

export default function Home() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const isSearching = debouncedQuery.trim().length > 0

  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const fetchBooks = useCallback(
    async (pageToLoad: number) => {
      setLoading(true)
      try {
        const ITEMS_PER_PAGE = isSearching ? ITEMS_PER_PAGE_SEARCH : ITEMS_PER_PAGE_BESTSELLER
        const baseUrl = isSearching
          ? `/api/aladin-search?query=${encodeURIComponent(debouncedQuery)}&page=${pageToLoad}&count=${ITEMS_PER_PAGE}`
          : `/api/aladin-list?page=${pageToLoad}&count=${ITEMS_PER_PAGE}`

        const res = await fetch(baseUrl)
        const text = await res.text()
        const data = JSON.parse(text)

        const mapped: BookType[] = (data.item || []).map((item: RawBookItemType) => ({
          id: item.itemId,
          cover: item.cover || 'https://via.placeholder.com/96x144?text=No+Image',
          title: item.title || '제목 없음',
          author: item.author || '저자 미상',
          isbn: item.isbn || '',
        }))

        setBooks((prev) => {
          const existingIds = new Set(prev.map((b) => b.id))
          const filteredNew = mapped.filter((book) => !existingIds.has(book.id))
          return pageToLoad === 1 ? filteredNew : [...prev, ...filteredNew]
        })

        const currentMaxPage = isSearching ? MAX_SEARCH_PAGE : MAX_BESTSELLER_PAGE
        const hasMoreData = data.item && data.item.length > 0 && pageToLoad < currentMaxPage
        setHasMore(hasMoreData)
      } catch (e) {
        console.error('책 불러오기 실패:', e)
        setHasMore(false)
      } finally {
        setLoading(false)
        setInitialLoading(false)
      }
    },
    [debouncedQuery, isSearching],
  )

  useEffect(() => {
    setPage(1)
    setBooks([])
    setHasMore(true)
    setInitialLoading(true)
  }, [debouncedQuery])

  useEffect(() => {
    fetchBooks(page)
  }, [page, fetchBooks])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !loading) {
        setPage((p) => p + 1)
      }
    }, {
      rootMargin: '200px',
      threshold: 0.1,
    })

    const el = loaderRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hasMore, loading])

  if (initialLoading) {
    return <ListPageSkeleton />
  }

  return (
    <main className="flex flex-col justify-center w-full mx-auto pt-2 p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center w-full leading-snug">
        당신만의 독서 여행을&nbsp;
        <br className="block sm:hidden" />
        시작해 보세요
      </h1>

      <div className="w-full flex flex-col items-center">
        <div className="relative w-full mb-12">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="책 제목이나 저자를 검색해보세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl bg-white placeholder-gray-500
            focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:outline-none
            hover:bg-gray-100 hover:border-gray-500 transition"
          />
        </div>

        {!loading && isSearching && books.length === 0 && (
          <p className="text-center w-full">검색 결과가 없습니다.</p>
        )}

        {!isSearching && (
          <h2 className="text-xl font-semibold mb-4 w-full text-left">📚 베스트셀러</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}

          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <BookCardSkeleton key={`skeleton-${i}`} />
            ))}

          {books.length > 0 &&
            Array.from({
              length: (4 - (books.length % 4)) % 4,
            }).map((_, i) => (
              <div key={i} className="h-[300px] invisible" />
            ))}
        </div>

        <div
          ref={loaderRef}
          className="h-8 flex justify-center items-center mt-4"
        >
          {loading && <p>로딩 중...</p>}
        </div>
      </div>
    </main>
  )
}
