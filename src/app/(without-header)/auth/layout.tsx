import type { ReactNode } from 'react'

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white md:bg-gray-100">
      <div className="py-8 px-6 border-gray-300 rounded-lg w-full max-w-md bg-white md:shadow-md">
        {children}
      </div>
    </div>
  )
}
