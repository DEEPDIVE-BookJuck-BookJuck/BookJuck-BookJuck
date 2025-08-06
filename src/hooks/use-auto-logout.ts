import { useEffect, useRef } from 'react'
import { logout } from '@/lib/auth'
import { useAuthStore } from '@/store/auth-store'

const AUTO_LOGOUT_TIME = 1000 * 60 * 60 // 60분

export function useAutoLogout() {
  const isLoggedIn = useAuthStore((state) => !!state.user)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(logout, AUTO_LOGOUT_TIME)
  }

  useEffect(() => {
    if (!isLoggedIn) return

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
  }, [isLoggedIn])
}
