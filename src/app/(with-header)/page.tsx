'use client'

import { useState, useEffect } from 'react'
import BookCard from '@/app/_components/book-card'
import { BookType, RawBookItemType } from '@/app/_types/index'
import { Search } from 'lucide-react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)

    try {
      const response = await fetch(
        `/api/aladin-search?query=${encodeURIComponent(query)}`
      )
      const text = await response.text()
      const data = JSON.parse(text)

      const mappedBooks: BookType[] = (data.item || []).map((item: RawBookItemType) => ({
        id: item.itemId,
        cover: item.cover || 'https://via.placeholder.com/96x144?text=No+Image',
        title: item.title || '제목 없음',
        author: item.author || '저자 미상',
        isbn: item.isbn || '',
      }))

      setBooks(mappedBooks)
    } catch (error) {
      console.error('검색 실패:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const fetchDefaultBooks = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/aladin-list')
      const text = await response.text()
      const data = JSON.parse(text)

      const mappedBooks: BookType[] = (data.item || []).map((item: RawBookItemType) => ({
        id: item.itemId,
        cover: item.cover || 'https://via.placeholder.com/96x144?text=No+Image',
        title: item.title || '제목 없음',
        author: item.author || '저자 미상',
        isbn: item.isbn || '',
      }))

      setBooks(mappedBooks)
    } catch (error) {
      console.error('기본 리스트 불러오기 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDefaultBooks()
  }, [])

  return (
    <main className="flex flex-col justify-center w-full mx-auto pt-2 p-8">
      <h1 className="text-4xl font-bold mb-12 text-center w-full">
        당신만의 독서 여행을 시작해보세요
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
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500"
          />
        </div>

        {!loading && query.trim() && books.length === 0 && (
          <p className="text-center w-full">검색 결과가 없습니다.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </main>
  )
}
