'use client'
import Modal from '@/common/modal'

export default function ResultModal({
  open,
  message,
  onClose,
}: {
  open: boolean
  message: string
  onClose: () => void
}) {
  if (!open) return null
  return (
    <Modal>
      <p className="text-center text-lg font-semibold mb-2">
        {message}
      </p>
      <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="bg-slate-950 text-white py-2 px-4 rounded cursor-pointer"
        >
          닫기
        </button>
      </div>
    </Modal>
  )
}
