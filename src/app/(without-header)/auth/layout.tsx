import '../../globals.css'
import type { ReactNode } from 'react'

export default function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fastly.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
      </head>
      <body>
        <div className="flex items-center justify-center font-sans min-h-screen bg-gray-100 text-gray-900">
          <div className="py-8 px-6 border-gray-300 rounded-lg shadow-md w-full max-w-md bg-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
