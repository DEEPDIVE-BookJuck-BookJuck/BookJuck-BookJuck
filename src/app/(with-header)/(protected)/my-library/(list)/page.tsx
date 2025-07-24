// 'use client'

// import { useEffect, useState, useRef, useCallback } from 'react'
// import LibraryBookItem from '../_components/_list/library-book-item'
// import ListPageSkeleton from '../_components/skeleton/list-page-skeleton'
// import { Search } from 'lucide-react'
// import { fetchWithAuth } from '@/lib/fetch-with-auth'
// import { useDebounce } from '@/hooks/use-debounce'
// import { BookType } from '../../_types'

// const LIMIT = 6

// export default function MyLibraryPage() {
//   const [books, setBooks] = useState<BookType[]>([])
//   const [query, setQuery] = useState('')
//   const debouncedQuery = useDebounce(query, 500)
//   const offsetRef = useRef(0)
//   const [hasMore, setHasMore] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [isMobile, setIsMobile] = useState(false)

//   const fetchBooks = useCallback(
//     async (reset = false) => {
//       setLoading(true)
//       try {
//         const currentOffset = reset ? 0 : offsetRef.current
//         const res = await fetchWithAuth<BookType[]>(
//           `/api/library?offset=${currentOffset}&limit=${LIMIT}&q=${debouncedQuery}`,
//           {
//             auth: true,
//             credentials: 'include', // ! 추가
//           },
//         )
//         if (reset) {
//           setBooks(res)
//           offsetRef.current = LIMIT
//         } else {
//           setBooks((prev) => {
//             const existingIds = new Set(prev.map((b) => b.id))
//             const filtered = res.filter((b) => !existingIds.has(b.id))
//             return [...prev, ...filtered]
//           })
//           offsetRef.current += LIMIT
//         }
//         setHasMore(res.length === LIMIT)
//       } catch (e) {
//         console.error(e)
//       } finally {
//         setLoading(false)
//       }
//     },
//     [debouncedQuery],
//   )

//   useEffect(() => {
//     fetchBooks(true)
//   }, [fetchBooks])

//   useEffect(() => {
//     const onFocus = () => {
//       if (!loading && books.length === 0) {
//         fetchBooks(true)
//       }
//     }
//     window.addEventListener('focus', onFocus)
//     return () => window.removeEventListener('focus', onFocus)
//   }, [fetchBooks, loading, books.length])

//   useEffect(() => {
//     const mql = window.matchMedia('(max-width: 767px)')
//     const onChange = (e: MediaQueryListEvent) =>
//       setIsMobile(e.matches)
//     setIsMobile(mql.matches)
//     mql.addEventListener('change', onChange)
//     return () => mql.removeEventListener('change', onChange)
//   }, [])

//   useEffect(() => {
//     if (!isMobile) return

//     const handleScroll = () => {
//       if (loading || !hasMore) return
//       const { scrollTop, clientHeight, scrollHeight } =
//         document.documentElement
//       if (scrollHeight - scrollTop - clientHeight < 100) {
//         fetchBooks()
//       }
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [isMobile, loading, hasMore, fetchBooks])

//   if (loading && books.length === 0) {
//     return <ListPageSkeleton />
//   }

//   return (
//     <>
//       <div className="mb-8 space-y-4">
//         <div className="flex gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <input
//               type="text"
//               placeholder="제목 또는 저자 검색"
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm pl-10 focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:outline-none"
//             />
//           </div>
//         </div>
//       </div>
//       {loading && books.length === 0 && (
//         <p className="text-center text-gray-500 mt-20">
//           불러오는 중...
//         </p>
//       )}
//       {!loading && books.length === 0 && (
//         <p className="text-center text-gray-500 mt-20">
//           아직 저장된 책이 없습니다.
//         </p>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {books.map((book) => (
//           <LibraryBookItem
//             key={book.id}
//             {...book}
//           />
//         ))}
//       </div>
//       {!isMobile && hasMore && (
//         <div className="text-center mt-8">
//           <button
//             disabled={loading}
//             onClick={() => fetchBooks()}
//             className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer disabled:opacity-50"
//           >
//             더 보기
//           </button>
//         </div>
//       )}
//     </>
//   )
// }

'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import LibraryBookItem from '../_components/_list/library-book-item'
import ListPageSkeleton from '../_components/skeleton/list-page-skeleton'
import CustomSelectBox from '../_components/_list/custom-selectbox'
import CustomToggle from '../_components/_list/custom-toggle'

import { Search } from 'lucide-react'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import { useDebounce } from '@/hooks/use-debounce'
import { BookType } from '../../_types'

const LIMIT = 6

// Todo: 추가!
type FilterType = 'all' | 'review'
type SortType = 'latest' | 'oldest' | 'title'

export default function MyLibraryPage() {
  const [books, setBooks] = useState<BookType[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  // Todo: 추가! 필터 & 정렬 상태
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortType>('latest')

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
          `/api/library?offset=${currentOffset}&limit=${LIMIT}&q=${debouncedQuery}&sort=${sort}`, // Todo: sort 추가!
          {
            auth: true,
            credentials: 'include', // ! 추가
          },
        )
        if (reset) {
          setBooks(res)
          offsetRef.current = LIMIT
        } else {
          setBooks((prev) => {
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
    [debouncedQuery, filterType, sort], // Todo: filterType, sort 추가!
  )

  useEffect(() => {
    fetchBooks(true)
  }, [fetchBooks])

  useEffect(() => {
    const onFocus = () => {
      if (!loading && books.length === 0) {
        fetchBooks(true)
      }
    }
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [fetchBooks, loading, books.length])

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const onChange = (e: MediaQueryListEvent) =>
      setIsMobile(e.matches)
    setIsMobile(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

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

  if (loading && books.length === 0) {
    return <ListPageSkeleton />
  }

  return (
    <>
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="제목 또는 저자 검색"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm pl-10 focus:ring-1 focus:ring-inset focus:ring-gray-400 focus:outline-none"
            />
          </div>
          <div className="flex w-full items-center justify-between overflow-visible">
            <CustomToggle
              options={[
                { value: 'all', label: '전체' },
                { value: 'review', label: '독후감' },
              ]}
              value={filterType}
              onChange={(v) => setFilterType(v as FilterType)}
            />

            <CustomSelectBox
              options={[
                { value: 'latest', label: '최신 순' },
                { value: 'oldest', label: '오래된 순' },
                { value: 'title', label: '이름 순' },
              ]}
              value={sort}
              onChange={(v) => setSort(v as SortType)}
            />
          </div>
        </div>
      </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <LibraryBookItem
            key={book.id}
            {...book}
          />
        ))}
      </div>
      {!isMobile && hasMore && (
        <div className="text-center mt-8">
          <button
            disabled={loading}
            onClick={() => fetchBooks()}
            className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300 cursor-pointer disabled:opacity-50"
          >
            더 보기
          </button>
        </div>
      )}
    </>
  )
}
