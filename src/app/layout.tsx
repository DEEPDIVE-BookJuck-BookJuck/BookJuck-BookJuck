import './globals.css'
import { ReactNode } from 'react'
import Header from '@/components/Header'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Header />
          <main className="max-w-7xl mx-auto px-6 pt-24">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
