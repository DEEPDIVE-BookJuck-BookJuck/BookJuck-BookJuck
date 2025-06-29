import { MouseEventHandler } from 'react'

interface ButtonPropsType {
  text: string
  handler?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ text, handler }: ButtonPropsType) {
  const buttonStyle =
    text === '취소'
      ? 'border-gray-200 hover:bg-gray-100'
      : 'bg-slate-950 text-white hover:bg-gray-800'
  return (
    <>
      <button
        onClick={handler}
        className={`px-4 py-2 border rounded  hover: cursor-pointer ${buttonStyle}`}
      >
        {text}
      </button>
    </>
  )
}
