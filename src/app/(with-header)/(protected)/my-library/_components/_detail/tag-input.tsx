'use client'
import {
  useState,
  KeyboardEvent,
  ChangeEvent,
  CompositionEvent,
} from 'react'
import { Plus, X } from 'lucide-react'
import Modal from '@/common/modal'

export default function TagInput({
  tags,
  addTag,
  removeTag,
}: {
  tags: string[]
  addTag: (t: string) => void
  removeTag: (t: string) => void
}) {
  const [newTag, setNewTag] = useState('')
  const [isComposing, setIsComposing] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showErrorModal, setShowErrorModal] = useState(false)

  const recommended = [
    '감동',
    '유익',
    '재미있음',
    '어려움',
    '추천',
    '실망',
    '깊이있음',
    '가벼움',
  ]

  const tryAdd = (raw: string) => {
    const trimmed = raw.trim()
    if (!trimmed) {
      return
    }
    if (!/^[ㄱ-ㅎ가-힣0-9A-Za-z]+$/.test(trimmed)) {
      setErrorMessage('태그는 한글 또는 영숫자만 가능합니다.')
      setShowErrorModal(true)
      return
    }
    if (!tags.includes(trimmed)) {
      addTag(trimmed)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault()
      tryAdd(newTag)
      setNewTag('')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value)
  }

  const handleComposition = (
    e: CompositionEvent<HTMLInputElement>,
  ) => {
    if (e.type === 'compositionstart') setIsComposing(true)
    if (e.type === 'compositionend') setIsComposing(false)
  }

  return (
    <div>
      <label className="text-base font-medium mb-3 block">태그</label>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((t, i) => (
          <div
            key={i}
            className="rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-semibold bg-slate-100 flex items-center gap-1"
          >
            {t}
            <button
              type="button"
              onClick={() => removeTag(t)}
              className="ml-1 hover:text-red-500 cursor-pointer"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTag}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleComposition}
          onCompositionEnd={handleComposition}
          placeholder="새 태그 입력"
          className="flex-1 h-10 border rounded-md px-3 text-sm"
        />
        <button
          type="button"
          onClick={() => {
            tryAdd(newTag)
            setNewTag('')
          }}
          className="bg-slate-950 text-white h-10 px-3 rounded-md"
        >
          <Plus size={16} />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-2">추천 태그:</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {recommended.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => tryAdd(t)}
            className="inline-flex items-center justify-center gap-1 font-medium border border-gray-300 bg-transparent hover:bg-gray-200 h-9 rounded-md px-3 text-xs cursor-pointer"
          >
            #{t}
          </button>
        ))}
      </div>
      {showErrorModal && (
        <Modal>
          <p className="text-center text-lg font-semibold mb-2">
            {errorMessage}
          </p>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowErrorModal(false)}
              className="bg-slate-950 text-white py-2 px-4 rounded"
            >
              닫기
            </button>
          </div>
        </Modal>
      )}
    </div>
  )
}
