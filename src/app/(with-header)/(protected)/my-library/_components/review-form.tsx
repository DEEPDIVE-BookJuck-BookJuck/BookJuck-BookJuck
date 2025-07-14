'use client'

import React, { FormEvent, Dispatch, SetStateAction } from 'react'
import RatingInput from './_detail/rating-input'
import TagInput from './_detail/tag-input'
import TagList from '../../_components/tag-list'
import { Save, Trash2, PenLine } from 'lucide-react'

interface ReviewFormProps {
  mode: 'view' | 'edit'
  memo: string
  rating: number
  tags: string[]
  onChangeMemo?: (v: string) => void
  setRating: Dispatch<SetStateAction<number>>
  onAddTag?: (t: string) => void
  onRemoveTag?: (t: string) => void
  onSubmit?: (e: FormEvent) => void
  onDelete?: () => void
  onEdit?: () => void
}

export default function ReviewForm({
  mode,
  memo,
  rating,
  tags,
  onChangeMemo,
  setRating,
  onAddTag,
  onRemoveTag,
  onSubmit,
  onDelete,
  onEdit,
}: ReviewFormProps) {
  return (
    <div className="rounded-lg border border-gray-300 bg-white shadow-sm p-6 space-y-6">
      <h3 className="text-2xl font-semibold">독후감</h3>
      {mode === 'view' ? (
        <>
          <RatingInput
            rating={rating}
            setRating={() => {}}
          />
          <label className="block text-base font-medium mb-2">
            리뷰
          </label>
          <p className="whitespace-pre-wrap border p-4 rounded-md min-h-[200px]">
            {memo}
          </p>
          <label className="block text-base font-medium mb-2">
            태그
          </label>
          <TagList tags={tags} />
          <div className="flex justify-end">
            <button
              onClick={onEdit}
              className="inline-flex items-center justify-center gap-2 h-10 px-4 rounded-md text-sm font-medium bg-red-400 text-white hover:bg-red-300 cursor-pointer"
            >
              <PenLine size={16} /> 수정
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={onSubmit}
          className="space-y-6"
        >
          <RatingInput
            rating={rating}
            setRating={setRating}
          />
          <textarea
            value={memo}
            onChange={(e) => onChangeMemo?.(e.target.value)}
            className="w-full border rounded-md px-3 py-2 min-h-[200px]"
          />
          <TagInput
            tags={tags}
            addTag={onAddTag!}
            removeTag={onRemoveTag!}
          />
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onDelete}
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
      )}
    </div>
  )
}
