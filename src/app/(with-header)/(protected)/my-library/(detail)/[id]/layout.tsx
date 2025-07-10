'use client'

import React, { createContext, useContext, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ConfirmModal from '../../_components/_detail/confirm-modal'

const DirtyContext = createContext<{
  setDirty: (d: boolean) => void
}>({
  setDirty: () => {},
})
export function useDirty() {
  return useContext(DirtyContext).setDirty
}

export default function BookDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isDirty, setIsDirty] = useState(false)
  const [showBackConfirm, setShowBackConfirm] = useState(false)

  const handleBack = () => {
    if (isDirty) setShowBackConfirm(true)
    else router.back()
  }

  const confirmBack = () => {
    setShowBackConfirm(false)
    router.back()
  }

  return (
    <DirtyContext.Provider value={{ setDirty: setIsDirty }}>
      <section className="max-w-4xl mx-auto">
        <nav className="flex items-center gap-4 mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium hover:bg-gray-200 h-10 px-4 py-2 cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="gray-800"
            />
            돌아가기
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              독후감 작성
            </h1>
            <p className="text-gray-600">
              읽은 책에 대한 생각을 기록해보세요
            </p>
          </div>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {children}
        </div>
        <ConfirmModal
          open={showBackConfirm}
          message="저장하지 않았습니다. 정말 돌아가시겠습니까?"
          onConfirm={confirmBack}
          onCancel={() => setShowBackConfirm(false)}
        />
      </section>
    </DirtyContext.Provider>
  )
}
