'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Trash2, Save, X, Plus, Star } from 'lucide-react'
import { BookType } from '@/app/(with-header)/my-library/_types'
import Image from 'next/image'

export default function BookDetailPage() {
  const { id } = useParams()

  const [book, setBook] = useState<BookType | null>(null)
  const [memo, setMemo] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState<string>('')

  const recommendedTags: string[] = ['감동', '유익', '재미있음']

  useEffect(() => {
    const sample: BookType = {
      id: id as string,
      title: '클린 코드',
      author: '로버트 C. 마틴',
      thumbnailUrl:
        'https://kzmofp7ao28a6ox52yiz.lite.vusercontent.net/placeholder.svg?height=200&width=150',
      review: {
        endDate: '2025-06-23',
        memo: '이 책은 정말 개발자라면 꼭 읽어야 할 필독서라고 생각합니다.',
        rating: 2,
        tags: ['개발', '프로그래밍', '유익'],
      },
    }

    setBook(sample)
    setMemo(sample.review.memo)
    setRating(sample.review.rating)
    setTags(sample.review.tags)
  }, [id])

  const addTag = (tagToAdd: string) => {
    const trimmed = tagToAdd.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const onSave = async () => {
    console.log('저장할 태그:', tags)
    console.log('저장할 평점:', rating)
    // TODO: API 연동 예정
  }

  const onDelete = async () => {
    console.log('삭제')
    // TODO: API 연동 예정
  }

  if (!book) return <p>책을 찾을 수 없습니다.</p>

  return (
    <>
      {/* 책 썸네일 */}
      <div className="lg:col-span-1">
        <div className="rounded-lg border border-gray-300 bg-white shadow-sm p-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src={book.thumbnailUrl}
              width={150}
              height={200}
              alt={book.title}
              className="w-32 h-40 object-cover rounded mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg mb-1">
              {book.title}
            </h3>
            <p className="text-gray-600 text-base mb-2">
              {book.author}
            </p>
            <p className="text-sm text-gray-400">
              읽은 날짜 : {book.review.endDate}
            </p>
          </div>
        </div>
      </div>

      {/* 정보 입력 영역 */}
      <div className="lg:col-span-2">
        <div className="rounded-lg border border-gray-300 text-gray-900 bg-white shadow-sm mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold">독후감</h3>
          </div>

          <div className="p-6 pt-0 space-y-6">
            {/* 평점 */}
            <div>
              <label className="text-base font-medium mb-3 block">
                평점
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    size={24}
                    fill={value <= rating ? '#FBBF24' : '#D1D5DB'}
                    stroke="none"
                    className="cursor-pointer"
                    onClick={() =>
                      setRating((prev) =>
                        prev === value ? 0 : value,
                      )
                    }
                    aria-label={`${value}점 별`}
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  ({rating}/5)
                </span>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* 리뷰 */}
            <div>
              <label className="text-base font-medium mb-3 block">
                리뷰
              </label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="flex w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[200px] resize-none"
              />
            </div>

            <hr className="border-gray-300" />

            {/* 태그 */}
            <div>
              <label className="text-base font-medium mb-3 block">
                태그
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-semibold bg-slate-100 flex items-center gap-1"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>

              {/* 새 태그 입력 */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTag}
                  placeholder="새 태그 입력"
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
                <button
                  onClick={() => {
                    addTag(newTag)
                    setNewTag('')
                  }}
                  className="inline-flex items-center justify-center gap-2 text-sm font-medium bg-slate-950 text-white hover:bg-slate-800 h-9 rounded-md px-3"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* 추천 태그 */}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">추천 태그:</p>
                <div className="flex flex-wrap gap-2">
                  {recommendedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="inline-flex items-center justify-center gap-2 font-medium border border-gray-300 bg-transparent hover:bg-gray-200 h-9 rounded-md px-3 text-xs cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 삭제/저장 버튼 */}
            <div className="flex justify-between pt-4">
              <button
                onClick={onDelete}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-red-400 text-white hover:bg-red-300 h-10 px-4"
              >
                <Trash2 size={16} />
                삭제
              </button>
              <button
                onClick={onSave}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-slate-950 text-white hover:bg-slate-800 h-10 px-4"
              >
                <Save size={16} />
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
