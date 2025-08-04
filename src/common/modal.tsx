import { useEffect } from 'react'
import { ReactNode } from 'react'

function Modal({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 모달이 열리면 body 스크롤 막기
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      // 모달 닫힐 때 스크롤 원복
      document.body.style.overflow = originalOverflow
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full px-6 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export default Modal
