'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/auth-store'
import Modal from '@/common/modal'

interface ProtectedLayoutProps {
  children: ReactNode
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const { user } = useAuthStore((state) => state)
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [countdown, setCountdown] = useState(3) // 시작 초 설정 : 3초

  // API 연동 완료 후 수정 예정
  const pathname = usePathname()
  const protectedPaths = ['/my-library', '/my-page', '/profile']
  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path),
  )

  useEffect(() => {
    if (!isProtected && !user) {
      setShowModal(true)

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            router.replace('/auth/log-in')
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [user, router, isProtected])

  if (!isProtected && !user && !showModal) return null

  if (!isProtected && !user && showModal) {
    return (
      <Modal>
        <p className="text-center text-lg font-semibold mb-2">
          로그인이 필요합니다
        </p>
        <p className="text-center text-sm text-gray-600">
          {countdown}초 후 로그인 페이지로 이동합니다.
        </p>
      </Modal>
    )
  }

  return <>{children}</>
}
