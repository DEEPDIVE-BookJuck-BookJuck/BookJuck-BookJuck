'use client'

import Image from 'next/image'
import { BookType, AddBookResponse } from '@/app/_types/index'
import { FC, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { fetchWithAuth } from '@/lib/fetch-with-auth'
import Modal from '@/common/modal'

export interface BookCardPropsType {
  book: BookType
}

function isErrorWithStatus(error: unknown): error is { status?: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

const BookCard: FC<BookCardPropsType> = ({ book }) => {
  const [isAdded, setIsAdded] = useState(false)
  const [modalMessage, setModalMessage] = useState<string | null>(null)
  const [shouldRedirectAfterModal, setShouldRedirectAfterModal] = useState(false)
  const router = useRouter()

  const handleAddToLibrary = async () => {
    try {
    
      const cookies = document.cookie
      const accessToken = cookies
        .split('; ')
        .find(row => row.startsWith('accessToken='))
        ?.split('=')[1]
      if (!accessToken) {
        setModalMessage('로그인 후 이용해주세요.')
        setShouldRedirectAfterModal(true)
        return
      }

      await fetchWithAuth<AddBookResponse>('/api/library', {
        method: 'POST',
        auth: true,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: book.title,
          author: book.author,
          thumbnailUrl: book.cover,
          isbn: book.isbn,
        }),
      })

      setModalMessage('내 서재에 추가되었습니다!')
      setIsAdded(true)
      setShouldRedirectAfterModal(false)
    } catch (error: unknown) {
      let status: number | undefined = undefined
      if (isErrorWithStatus(error)) {
        status = error.status
      }

      if (status === 401) {
        setModalMessage('로그인 후 이용해주세요.')
        setShouldRedirectAfterModal(true)
      } else if (status === 409) {
        setModalMessage('이미 내 서재에 있는 책입니다.')
        setIsAdded(true)
        setShouldRedirectAfterModal(false)
      } else {
        console.error('서재 추가 실패:', error)
        setModalMessage('서재 추가에 실패했습니다.')
        setShouldRedirectAfterModal(false)
      }
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow w-full h-[300px] flex flex-col overflow-hidden">
        <div className="relative bg-gray-100 border-b border-gray-300 flex justify-center items-center h-[60%] p-4 rounded-t-lg">
          <Image
            src={book.cover || '/images/placeholder-book.svg'}
            alt={book.title}
            width={96}
            height={144}
            className="object-contain rounded max-h-full"
          />

          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={handleAddToLibrary}
              className="w-8 h-8 flex items-center justify-center bg-white text-black border border-gray-300 rounded-full hover:bg-gray-100 transition"
              aria-label="내 서재 추가"
            >
              <BookOpen
                className="w-4 h-4"
                stroke={isAdded ? '#22C55E' : 'black'}
                fill={isAdded ? '#22C55E' : 'none'}
              />
            </button>
          </div>

          {isAdded && (
            <div
              className="absolute bottom-2 left-2 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md select-none"
              style={{ backgroundColor: '#22C55E' }}
            >
              추가됨
            </div>
          )}
        </div>

        <div className="h-[40%] px-3 py-2 flex flex-col justify-center items-center text-center">
          <h3 className="text-sm font-semibold w-full truncate" title={book.title}>
            {book.title}
          </h3>
          <p className="text-xs text-gray-500 w-full truncate" title={book.author}>
            {book.author}
          </p>
        </div>
      </div>

      {modalMessage && (
        <Modal>
          <div className="text-center">
            <p className="mb-4">{modalMessage}</p>
            <button
              onClick={() => {
                setModalMessage(null)
                if (shouldRedirectAfterModal) {
                  router.push('/auth/log-in')
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              확인
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default BookCard
