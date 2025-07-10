'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState, useRef, FormEvent } from 'react'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import BookThumbnail from '../../_components/_detail/book-thumbnail'
import ReviewForm from '../../_components/review-form'
import ConfirmModal from '../../_components/_detail/confirm-modal'
import ResultModal from '../../_components/_detail/result-modal'
import DetailPageSkeleton from '../../_components/skeleton/detail-page-skeleton'
import { BookType } from '../../../_types'
import { useDirty } from './layout'

export default function BookDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const setDirty = useDirty()

  const [book, setBook] = useState<BookType | null>(null)
  const [memo, setMemo] = useState('')
  const [rating, setRating] = useState(0)
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [showResultModal, setShowResultModal] = useState(false)
  const [shouldGoBack, setShouldGoBack] = useState(false)

  const isFirstLoad = useRef(true)
  const originalMemo = useRef<string>('')
  const originalRating = useRef<number>(0)
  const originalTags = useRef<string[]>([])

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
        setDirty(false)
        originalMemo.current = data.review?.memo ?? ''
        originalRating.current = data.review?.rating ?? 0
        originalTags.current = data.review?.tags ?? []
      } catch (e) {
        console.error('상세 조회 실패:', e)
        setModalMessage('상세 조회에 실패했습니다.')
        setShouldGoBack(false)
        setShowResultModal(true)
      } finally {
        setLoading(false)
        isFirstLoad.current = false
      }
    }
    if (id) load()
  }, [id, setDirty])

  useEffect(() => {
    if (isFirstLoad.current) return

    const changed =
      memo !== originalMemo.current ||
      rating !== originalRating.current ||
      tags.length !== originalTags.current.length ||
      tags.some((t, i) => t !== originalTags.current[i])

    setDirty(changed)
  }, [memo, rating, tags, setDirty])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!book) return
    if (
      !book?.review ||
      (memo === '' && rating === 0 && tags.length === 0)
    ) {
      setModalMessage('독후감을 작성해주세요')
      setShouldGoBack(false)
      setShowResultModal(true)
      return
    }
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
      setModalMessage(
        isNew
          ? '독후감이 저장되었습니다.'
          : '독후감이 수정되었습니다.',
      )
      setShouldGoBack(true)
      setShowResultModal(true)
    } catch (e) {
      console.error('저장 실패:', e)
      const errorMsg =
        e instanceof Error
          ? e.message
          : isNew
          ? '독후감 저장에 실패하였습니다.'
          : '독후감 수정에 실패하였습니다.'
      setModalMessage(errorMsg)
      setShouldGoBack(false)
      setShowResultModal(true)
    }
  }

  const handleDeleteClick = () => {
    if (
      !book?.review ||
      (memo === '' && rating === 0 && tags.length === 0)
    ) {
      setModalMessage('독후감을 작성해주세요')
      setShouldGoBack(false)
      setShowResultModal(true)
    } else {
      setShowDeleteConfirm(true)
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
      setModalMessage('독후감이 삭제되었습니다.')
      setShouldGoBack(true)
      setShowResultModal(true)
    } catch (e) {
      console.error('삭제 실패:', e)
      const errorMsg =
        e instanceof Error ? e.message : '독후감 삭제에 실패했습니다.'
      setModalMessage(errorMsg)

      setShouldGoBack(false)
      setShowResultModal(true)
    }
  }

  const handleResultClose = () => {
    setShowResultModal(false)
    if (shouldGoBack) router.back()
  }

  if (loading) {
    return <DetailPageSkeleton />
  }
  if (!book) return <p>책을 찾을 수 없습니다.</p>

  return (
    <>
      <BookThumbnail book={book} />
      <div className="lg:col-span-2">
        {/* <div className="rounded-lg border border-gray-300 text-gray-900 bg-white shadow-sm mb-8">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold">독후감</h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-6 pt-0 space-y-6"
          >
            <RatingInput
              rating={rating}
              setRating={setRating}
            />

            <hr className="border-gray-300" />

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
            <TagInput
              tags={tags}
              addTag={(t) => {
                const v = t.trim()
                if (v && !tags.includes(v)) setTags([...tags, v])
              }}
              removeTag={(t) => setTags(tags.filter((x) => x !== t))}
            />
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={handleDeleteClick}
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md text-sm font-medium bg-red-400 text-white hover:bg-red-300 cursor-pointer"
              >
                <Trash2 size={16} /> 삭제
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md text-sm font-medium bg-slate-950 text-white hover:bg-slate-800 cursor-pointer"
              >
                <Save size={16} /> 저장
              </button>
            </div>
          </form>
        </div> */}
        <ReviewForm
          mode="edit"
          rating={rating}
          setRating={setRating}
          memo={memo}
          onChangeMemo={setMemo}
          tags={tags}
          onAddTag={(t) => setTags((prev) => [...prev, t])}
          onRemoveTag={(t) =>
            setTags((prev) => prev.filter((x) => x !== t))
          }
          onSubmit={handleSubmit}
          onDelete={() => setShowDeleteConfirm(true)}
        />
      </div>

      <ConfirmModal
        open={showDeleteConfirm}
        message="정말 삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      <ResultModal
        open={showResultModal}
        message={modalMessage}
        onClose={handleResultClose}
      />
    </>
  )
}
