'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

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

export default function BookDetailPage() {
  const router = useRouter()
  const { id } = useParams()

  const [book, setBook] = useState<Book | null>(null)
  const [memo, setMemo] = useState('')
  const [rating, setRating] = useState('')
  const [tags, setTags] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/library/${id}`)
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.')
        const data: Book = await res.json()
        setBook(data)
        setMemo(data.review.memo)
        setRating(String(data.review.rating))
        setTags(data.review.tags.join(','))
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const onSave = async () => {
    setLoading(true)
    try {
      await fetch(`/api/library/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memo,
          rating: Number(rating),
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      })
      router.push('/mylibrary')
    } catch {
      setError('수정에 실패했습니다.')
      setLoading(false)
    }
  }

  const onDelete = async () => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    setLoading(true)
    try {
      await fetch(`/api/library/${id}`, { method: 'DELETE' })
      router.push('/mylibrary')
    } catch {
      setError('삭제에 실패했습니다.')
      setLoading(false)
    }
  }

  if (loading) return <p className="p-4 text-center">로딩 중...</p>
  if (error)
    return <p className="p-4 text-center text-red-600">{error}</p>
  if (!book)
    return <p className="p-4 text-center">책을 찾을 수 없습니다.</p>

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <img
          src={book.thumbnailUrl}
          alt={book.title}
          className="h-40 w-auto object-cover mb-4"
        />
        <h1 className="text-2xl font-bold">{book.title}</h1>
        <p className="text-gray-600">{book.author}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">읽은 날짜</label>
          <input
            type="date"
            value={book.review.endDate}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">독후감</label>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">
              평점 (0–5)
            </label>
            <input
              type="number"
              min={0}
              max={5}
              className="w-full border p-2 rounded"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">
              태그 (콤마로 구분)
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onSave}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            저장
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  )
}
