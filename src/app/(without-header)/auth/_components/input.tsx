'use client'

import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export default function Input({
  hasError = false,
  ...props
}: InputProps) {
  const baseStyle =
    'w-full h-10 px-3 py-2 mb-1 border rounded-lg focus:ring-1 focus:outline-none text-sm'
  const errorStyle = hasError
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:ring-gray-500'

  return (
    <input
      className={`${baseStyle} ${errorStyle}`}
      {...props}
    />
  )
}
