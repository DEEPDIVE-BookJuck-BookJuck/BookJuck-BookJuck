import '../globals.css'
import { ReactNode } from 'react'
import Header from '@/common/common-header'

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
          href="https://fastly.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css"
        />
      </head>
      <body>
        <div className="font-sans min-h-screen bg-gray-100 text-gray-900">
          <Header />
          <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
