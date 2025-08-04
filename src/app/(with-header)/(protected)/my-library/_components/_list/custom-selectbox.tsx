'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface CustomSelectBoxProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function CustomSelectBox({
  options,
  value,
  onChange,
  placeholder = '선택',
}: CustomSelectBoxProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder

  return (
    <div
      ref={containerRef}
      className="relative w-40"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full h-10 px-3 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-gray-400 cursor-pointer"
      >
        {selectedLabel}
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </button>

      {open && (
        <ul className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className={`cursor-pointer px-3 py-2 text-sm ${
                opt.value === value
                  ? 'font-semibold bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
