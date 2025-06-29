import React from 'react'

export default function MyLibraryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Library
        </h1>
        <p className="text-gray-600">
          읽은 책들과 독후감을 관리하세요
        </p>
      </section>
      {children}
    </>
  )
}
