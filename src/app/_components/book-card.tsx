'use client'

import Image from 'next/image'
import { BookType } from '@/app/_types/index'
import { FC } from 'react'

export interface BookCardPropsType {
  book: BookType
}

const BookCard: FC<BookCardPropsType> = ({ book }) => {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <Image
        src={book.cover}
        alt={book.title}
        width={96}
        height={144}
        className="object-cover mb-2"
      />
      <h3 className="font-bold text-lg">{book.title}</h3>
      <p className="text-gray-600">{book.author}</p>
      <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
        읽음
      </button>
    </div>
  )
}

export default BookCard
