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
      <body className="bg-white text-gray-900">
        <Header />
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
