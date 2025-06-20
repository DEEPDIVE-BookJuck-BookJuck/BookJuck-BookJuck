import Link from 'next/link'
import React from 'react'

export default function BookDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link
        href="/mylibrary"
        className="text-blue-600 underline"
      >
        ← 내 서재로 돌아가기
      </Link>
      <div className="mt-4">{children}</div>
    </div>
  )
}
