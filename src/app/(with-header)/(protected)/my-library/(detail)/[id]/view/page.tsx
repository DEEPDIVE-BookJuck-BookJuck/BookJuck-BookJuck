'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { fetchWithAuth } from '@/lib/fetch-with-auth'

import BookThumbnail from '../../../_components/_detail/book-thumbnail'
import RatingInput from '../../../_components/_detail/rating-input'
import TagList from '@/app/(with-header)/(protected)/_components/tag-list'
import ReviewForm from '../../../_components/review-form'
import ResultModal from '../../../_components/_detail/result-modal'
import DetailPageSkeleton from '../../../_components/skeleton/detail-page-skeleton'
import { BookType } from '@/app/(with-header)/(protected)/_types'

export default function ReviewViewPage() {
  const { id } = useParams()
  const router = useRouter()

  const [book, setBook] = useState<BookType | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalMessage, setModalMessage] = useState('')
  const [showResultModal, setShowResultModal] = useState(false)
  const [shouldGoBack, setShouldGoBack] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchWithAuth<BookType>(
          `/api/library/review/${id}`,
          { auth: true },
        )
        setBook(data)
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

  const handleResultClose = () => {
    setShowResultModal(false)
    if (shouldGoBack) router.back()
  }

  if (loading) return <DetailPageSkeleton />
  if (!book) return <p>책을 찾을 수 없습니다.</p>

  const { review } = book
  const rating = review?.rating ?? 0
  const memo = review?.memo ?? ''
  const tags = review?.tags ?? []

  return (
    <>
      <BookThumbnail book={book} />
      <div className="lg:col-span-2">
        <ReviewForm
          mode="view"
          rating={rating}
          setRating={() => {}}
          memo={memo}
          tags={tags}
          onEdit={() => router.push(`/my-library/${id}`)}
        />
      </div>
      <ResultModal
        open={showResultModal}
        message={modalMessage}
        onClose={handleResultClose}
      />
    </>
  )
}
