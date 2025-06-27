'use client'

import { useState } from 'react'
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
      const apiKey = process.env.NEXT_PUBLIC_ALADIN_API_KEY // .env에서 API 키 불러오기

      if (!apiKey) {
        console.error('API 키가 없습니다. .env 파일을 확인해주세요.')
        return
      }

      const response = await fetch(
        `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${encodeURIComponent(
          query,
        )}&QueryType=Keyword&MaxResults=10&start=1&SearchTarget=Book&output=JS&Version=20131101`,
      )

      const text = await response.text()
      const data = JSON.parse(text)

      const mappedBooks: BookType[] = (data.item || []).map(
        (item: RawBookItemType) => ({
          id: item.itemId,
          cover:
            item.cover ||
            'https://via.placeholder.com/96x144?text=No+Image',
          title: item.title || '제목 없음',
          author: item.author || '저자 미상',
        }),
      )

      setBooks(mappedBooks)
    } catch (error) {
      console.error('검색 실패:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-3xl mx-auto pt-2 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        당신만의 독서 여행을 시작해보세요
      </h1>

      <div className="relative w-full mb-6">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="책 제목이나 저자를 검색해보세요"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-[672px] pl-10 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder-gray-500"
        />
      </div>

      {/* 검색 결과 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {!loading && books.length === 0 && (
          <p>검색 결과가 없습니다.</p>
        )}
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </div>
    </main>
  )
}
