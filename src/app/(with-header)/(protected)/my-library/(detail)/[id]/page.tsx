'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, FormEvent } from 'react'
import { Save, Trash2 } from 'lucide-react'
import { BookType } from '@/app/(with-header)/(protected)/my-library/_types'
import { fetchWithAuth } from '@/lib/fetch-with-auth'

import BookThumbnail from '../../_components/_detail/book-thumbnail'
import RatingInput from '../../_components/_detail/rating-input'
import TagInput from '../../_components/_detail/tag-input'
import ConfirmModal from '../../_components/_detail/confirm-modal'
import ResultModal from '../../_components/_detail/result-modal'
import DetailPageSkeleton from '../../_components/skeleton/detail-page-skeleton'

export default function BookDetailPage() {
  const { id } = useParams()
  const router = useRouter()

  const [book, setBook] = useState<BookType | null>(null)
  const [memo, setMemo] = useState('')
  const [rating, setRating] = useState(0)
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [showResultModal, setShowResultModal] = useState(false)
  const [shouldGoBack, setShouldGoBack] = useState(false)

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const data = await fetchWithAuth<BookType>(
          `/api/library/review/${id}`,
          { auth: true },
        )
        setBook(data)
        setMemo(data.review?.memo ?? '')
        setRating(data.review?.rating ?? 0)
        setTags(data.review?.tags ?? [])
      } catch (e) {
        console.error('상세 조회 실패:', e)
        setModalMessage('상세 조회에 실패했습니다.')
        setShouldGoBack(false)
        setShowResultModal(true)
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!book) return
    const isNew =
      !book.review || Object.keys(book.review).length === 0
    const method = isNew ? 'POST' : 'PATCH'
    try {
      const res = await fetchWithAuth<BookType>(
        `/api/library/review/${book.id}`,
        {
          auth: true,
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endDate:
              book.review?.endDate ??
              new Date().toISOString().slice(0, 10),
            memo,
            rating,
            tags,
          }),
        },
      )
      setBook(res)
      setModalMessage(isNew ? '리뷰 작성 완료' : '리뷰 수정 완료')
      setShouldGoBack(true)
      setShowResultModal(true)
    } catch (e) {
      console.error('저장 실패:', e)
      setModalMessage(isNew ? '작성 실패' : '수정 실패')
      setShouldGoBack(false)
      setShowResultModal(true)
    }
  }

  const confirmDelete = async () => {
    if (!book) return
    setShowDeleteConfirm(false)
    try {
      await fetchWithAuth(`/api/library/review/${book.id}`, {
        auth: true,
        method: 'DELETE',
      })
      setModalMessage('리뷰 삭제 완료')
      setShouldGoBack(true)
      setShowResultModal(true)
    } catch (e) {
      console.error('삭제 실패:', e)
      setModalMessage('삭제 실패')
      setShouldGoBack(false)
      setShowResultModal(true)
    }
  }

  const handleResultClose = () => {
    setShowResultModal(false)
    if (shouldGoBack) router.back()
  }

  // 스켈레톤 노출
  if (loading) {
    return <DetailPageSkeleton />
  }

  if (!book) return <p>책을 찾을 수 없습니다.</p>

  return (
    <>
      {/* 책 썸네일 */}
      <BookThumbnail book={book} />

      {/* 정보 입력 영역 */}
      <div className="lg:col-span-2">
        <div className="rounded-lg border border-gray-300 text-gray-900 bg-white shadow-sm mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold">독후감</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-6 pt-0 space-y-6"
          >
            {/* 평점 */}
            <RatingInput
              rating={rating}
              setRating={setRating}
            />

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
            <TagInput
              tags={tags}
              addTag={(t) => {
                const v = t.trim()
                if (v && !tags.includes(v)) setTags([...tags, v])
              }}
              removeTag={(t) => setTags(tags.filter((x) => x !== t))}
            />

            {/* 삭제/저장 버튼 */}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-red-400 text-white hover:bg-red-300 h-10 px-4 cursor-pointer"
              >
                <Trash2 size={16} /> 삭제
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-slate-950 text-white hover:bg-slate-800 h-10 px-4 cursor-pointer"
              >
                <Save size={16} /> 저장
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <ConfirmModal
        open={showDeleteConfirm}
        message="정말 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* 결과 모달 */}
      <ResultModal
        open={showResultModal}
        message={modalMessage}
        onClose={handleResultClose}
      />
    </>
  )
}
