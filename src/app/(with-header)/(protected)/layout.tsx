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
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuthStore((state) => state)
  const [showModal, setShowModal] = useState(false)
  const [countdown, setCountdown] = useState(3) // 시작 초 설정 : 3초

  useEffect(() => {
    if (!user) {
      sessionStorage.setItem('redirectAfterLogin', pathname)

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
  }, [user, pathname, router])

  if (!user && !showModal) return null

  if (!user && showModal) {
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
