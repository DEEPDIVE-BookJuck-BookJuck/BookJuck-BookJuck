'use client'

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  children: React.ReactNode
}

export default function Button({
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const className = `
    w-full h-10 px-3 py-2 mt-4 mb-4 rounded-md text-white bg-slate-950 hover:bg-gray-800 hover:cursor-pointer
    disabled:bg-gray-400
    disabled:cursor-not-allowed
  `

  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className={className}
      {...props}
    >
      {isLoading ? `${children} 중...` : children}
    </button>
  )
}
