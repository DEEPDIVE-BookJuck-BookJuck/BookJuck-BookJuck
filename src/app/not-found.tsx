import { OctagonAlert } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center gap-4 bg-gray-100">
      <OctagonAlert className="w-28 h-28 text-red-600" />
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">404</h1>
        <h2 className="font-bold text-xl">
          요청하신 페이지를 찾을 수 없습니다
        </h2>
      </div>
      <Link
        href="/"
        className="px-2 py-2 bg-gray-900 text-white rounded"
      >
        홈으로 가기
      </Link>
    </div>
  )
}
