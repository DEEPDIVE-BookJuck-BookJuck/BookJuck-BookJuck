'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import LibraryBookItem from '../_components/_list/library-book-item'
import ListPageSkeleton from '../_components/skeleton/list-page-skeleton'
import { Search } from 'lucide-react'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { useDebounce } from '@/hooks/use-debounce'
import { BookType } from '../../_types'

const LIMIT = 9

export default function MyLibraryPage() {
  const [books, setBooks] = useState<BookType[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)
  const offsetRef = useRef(0)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const fetchBooks = useCallback(
    async (reset = false) => {
      setLoading(true)
      try {
        const currentOffset = reset ? 0 : offsetRef.current
        const res = await fetchWithAuth<BookType[]>(
          `/api/library?offset=${currentOffset}&limit=${LIMIT}&q=${debouncedQuery}`,
          { auth: true },
        )
        if (reset) {
          setBooks(res)
          offsetRef.current = LIMIT
        } else {
          setBooks((prev) => {
            // 중복 id 거르기
            const existingIds = new Set(prev.map((b) => b.id))
            const filtered = res.filter((b) => !existingIds.has(b.id))
            return [...prev, ...filtered]
          })
          offsetRef.current += LIMIT
        }
        setHasMore(res.length === LIMIT)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    [debouncedQuery],
  )

  // 검색어 변경 시 첫 페이지(9개) 초기 로드
  useEffect(() => {
    fetchBooks(true)
  }, [fetchBooks])

  // 화면 크기 체크 (모바일 여부)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = (e: MediaQueryListEvent) =>
      setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  // 모바일: 무한 스크롤
  useEffect(() => {
    if (!isMobile) return

    const handleScroll = () => {
      if (loading || !hasMore) return
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement
      if (scrollHeight - scrollTop - clientHeight < 100) {
        fetchBooks()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile, loading, hasMore, fetchBooks])

  // 스켈레톤 노출
  if (loading && books.length === 0) {
    return <ListPageSkeleton />
  }

  return (
    <div className="min-h-screen">
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

      {/* 태블릿, 데스크탑: 더보기 버튼 */}
      {!isMobile && hasMore && (
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
