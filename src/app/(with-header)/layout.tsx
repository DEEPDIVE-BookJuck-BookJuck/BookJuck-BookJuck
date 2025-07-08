import { ReactNode } from 'react'
import Header from '@/common/common-header'

interface WithHeaderLayoutProps {
  children: ReactNode
  modal: ReactNode
}

export default function WithHeaderLayout({
  children,
  modal,
}: WithHeaderLayoutProps) {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        {children}
      </div>
      {modal ? modal : null}
    </>
  )
}
