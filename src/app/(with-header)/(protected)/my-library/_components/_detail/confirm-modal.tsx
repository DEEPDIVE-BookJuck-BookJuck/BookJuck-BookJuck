'use client'
import Modal from '@/common/modal'

export default function ConfirmModal({
  open,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}) {
  if (!open) return null
  return (
    <Modal>
      <p className="text-center text-lg font-semibold mb-4">
        {message}
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="rounded-md text-sm font-medium bg-red-400 text-white hover:bg-red-300 h-10 px-4 cursor-pointer"
        >
          삭제
        </button>
        <button
          onClick={onCancel}
          className="rounded-md text-sm font-medium bg-slate-950 text-white hover:bg-slate-800 h-10 px-4 cursor-pointer"
        >
          취소
        </button>
      </div>
    </Modal>
  )
}
