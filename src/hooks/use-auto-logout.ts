import { useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/auth-store'

const AUTO_LOGOUT_TIME = 1000 * 60 * 30 // 30분

export function useAutoLogout() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(logout, AUTO_LOGOUT_TIME)
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('자동 로그아웃 실패:', error)
    }

    useAuthStore.getState().clearAuth()
  }

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll']

    events.forEach((event) =>
      window.addEventListener(event, resetTimer),
    )

    resetTimer()

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer),
      )
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])
}
